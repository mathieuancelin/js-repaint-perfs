var Query = Class({
	'extends': MK.Object,
	renderer: '<td><span></span><div class="popover left"><div class="popover-content"></div><div class="arrow"></div></div></td>',
	constructor: function(data) {
		this.jset(data);
	},
	onRender: function() {
		this
			.bindNode('elapsedClassName', ':sandbox'
				, MK.binders.property('className'))
			.bindNode('formatElapsed', ':sandbox span'
				, MK.binders.innerText())
			.bindNode('query', ':sandbox .popover-content'
				, MK.binders.innerText());
	}
});

var Queries = Class({
	'extends': MK.Array,
	Model: Query,
	trackBy: '$index',
	constructor: function(db) {
		db.on('render', function() {
			this.bindNode('sandbox', db.sandbox).rerender();
		}, this);
	}	
});

var Database = Class({
	'extends': MK.Object,
	renderer: '<tr><td class="dbname"></td><td class="query-count"><span></span></td></tr>',
	constructor: function(data) {
		this.queries = new Queries(this);
		this.jset(data);
		this.on('lastSample@change:topFiveQueries', function() {
			this.queries.recreate(this.lastSample.topFiveQueries);
		}, true);
	},
	onRender: function() {
		this
			.bindNode('dbname', ':sandbox .dbname'
				, MK.binders.innerText())
			.bindNode('lastSample.countClassName', ':sandbox .query-count span'
				, MK.binders.property('className') )
			.bindNode('lastSample.nbQueries', ':sandbox .query-count span'
				, MK.binders.innerText())
			
	}
});

var Databases = Class({
	'extends': MK.Array,
	trackBy: '$index',
	Model: Database,
	constructor: function() {
		this
			.bindNode({
				sandbox: '#app',
				table: '<table class="table table-striped latest-data"><tbody></tbody></table>',
				container: ':bound(table) tbody'
			});
		
		this.nodes.sandbox.appendChild(this.nodes.table);
	}
});


var databases = new Databases();

function update() {
	databases.recreate(ENV.generateData().toArray());
	Monitoring.renderRate.ping();
	setTimeout(update, ENV.timeout);
};

update();
