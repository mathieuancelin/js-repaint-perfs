

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

var SampleView = Mn.ItemView.extend({
    template: _.template(
        '<span class="<%= data.countClassName %>"><%= data.length %></span>',
        { variable: 'data' }
    ),

    ui: {
        count: "span"
    },

    initialize: function() {
        this.listenTo(this.model, 'change:countClassName', RenderScheduler.createTask(this, "updateCountClassName"));
        this.listenTo(this.model, 'change:length',         RenderScheduler.createTask(this, "updateLength"));
    },

    updateCountClassName: function(model, name) {
        this.ui.count.attr("class", name);
    },

    updateLength: function(model, length) {
        this.ui.count.text(length);
    }
});

var QueryView = Mn.ItemView.extend({
    tagName: 'td',
    template: _.template([
        '<%= q.formatElapsed || "" %>',
        '<div class="popover left">',
            '<div class="popover-content">',
                '<%= q.query || "" %>',
            '</div>',
            '<div class="arrow"></div>',
        '</div>',
    ].join(''), { variable: 'q' }),

    initialize: function() {
        this.listenTo(this.model, 'change:elapsedClassName', RenderScheduler.createTask(this,"updateClassName"));
        this.listenTo(this.model, 'change:formatElapsed',    RenderScheduler.createTask(this,"updateElapsed"));
        this.listenTo(this.model, 'change:query',            RenderScheduler.createTask(this,"updateQuery"));
    },

    ui: {
        query: ".popover-content"
    },

    onRender: function() {
        this.$el.attr('class', this.model.get('elapsedClassName'));
    },

    updateClassName: function(model, className) {
        this.$el.attr('class', className);
    },

    updateElapsed: function(model, elapsed) {
        var node = this.el.firstChild;
        if (node.nodeType === 3) {
            node.textContent = elapsed;
        } else {
            var elapsedNode = document.createTextNode(elapsed);
            this.el.insertBefore(elapsedNode, node);
        }
    },

    updateQuery: function(model, query) {
        this.ui.query.text(query);
    }
});

var DatabaseView = Mn.CompositeView.extend({
    tagName: 'tr',
    template: _.template(
        '<td class="dbname"><%= db.dbname %></td>' +
        '<td class="query-count"></td>', 
        { variable: 'db' }),

    initialize: function() {
        this.collection = this.model.queries;
    },

    //childViewContainer: null,
    childView: QueryView,

    onRender: function() {
        this.sample = new SampleView({
            el:    this.$(".query-count"),
            model: this.model
        });
        this.sample.render();
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
