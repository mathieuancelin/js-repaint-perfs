

var Database = Backbone.Model.extend({
    idAttribute: 'dbname',
    defaults: {
        countClassName: "",
        length: 0
    },

    constructor: function(attrs, options) {
        this.queries = new Queries();
        Backbone.Model.call(this, attrs, options);
    },

    parse: function(data) {
        var sample  = data.lastSample;
        var queries = sample.topFiveQueries;
        this.queries.set(queries, { parse: true });
        return {
            dbname: data.dbname,
            countClassName: sample.countClassName,
            length: sample.nbQueries
        };
    }
});

var Databases = Backbone.Collection.extend({
    model: Database
});

var Query = Backbone.Model.extend({
    defaults: {
        query: "",
        formatElapsed: "",
        elapsedClassName: ""
    },
    parse: function(data) {
        if (!data.query) {
            data.formatElapsed = '';
            data.elapsedClassName = '';
        }
        return data;
    }
});

var Queries = Backbone.Collection.extend({
    model: Query,
    parse: function(queries) {
        for (var i = 0; i < queries.length; i++) {
            queries[i].id = i;
        }
        return queries;
    }
});

var QueryView = Mn.ItemView.extend({
    clsNm: "QueryView",
    tagName: 'td',
    template: _.template(
        '<%= q.formatElapsed || "&nbsp;" %>' +
        '<div class="popover left">' +
            '<div class="popover-content">' +
                '<%= q.query || "&nbsp;" %>' +
            '</div>' +
            '<div class="arrow"></div>' +
        '</div>',
        { variable: 'q' }),

    ui: {
        query: ".popover-content"
    },

    modelEvents: {
        "change:elapsedClassName": "updateClassName",
        "change:query":            "updateQuery",
        "change:formatElapsed":    "updateElapsed"
    },

    onRender: function() {
        this.updateClassName(this.model, this.model.get('elapsedClassName'));
    },

    updateElapsed: function(model, elapsed) {
        this.el.firstChild.textContent = elapsed;
    },

    updateClassName: function(model, className) {
        this.$el.attr('class', className);
    },

    updateQuery: function(model, query) {
        this.ui.query.text(query);
    }
});

var DatabaseView = Mn.CompositeView.extend({
    clsNm: "DatabaseView",
    tagName: 'tr',
    template: _.template(
        '<td class="dbname">' +
            '<%= db.dbname %>' +
        '</td>' +
        '<td class="query-count">' + 
            '<span class="<%= db.countClassName %>">' +
                '<%= db.length %>' +
            '</span>' + 
        '</td>', 
        { variable: 'db' }),

    ui: {
        count: "span"
    },

    //childViewContainer: null,
    childView: QueryView,

    modelEvents: {
        "change:countClassName": "updateCountClassName",
        "change:length":         "updateLength"
    },

    initialize: function() {
        this.collection = this.model.queries;
    },

    updateCountClassName: function(model, name) {
        this.ui.count.attr("class", name);
    },

    updateLength: function(model, length) {
        this.ui.count.text(length);
    }
});

var DatabasesView = Mn.CollectionView.extend({
    tagName:   'table',
    className: 'table table-striped latest-data',
    childView: DatabaseView
});


var databases = new Databases();
var databasesView = new DatabasesView({
    collection: databases
});

var update = function () {
    var dbs, i;
    if( !window.pause) {
        dbs = ENV.generateData().toArray();
        databases.set(dbs, {parse: true});
        Monitoring.renderRate.ping();
    }
    setTimeout(update, ENV.timeout);
};

$('#app').append(databasesView.render().el);
update();
