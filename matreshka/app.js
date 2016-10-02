var text = Matreshka.binders.text;
var prop = Matreshka.binders.prop;

var Query = Matreshka.Class({
	'extends': Matreshka.Object,
	renderer: '<td><span></span><div class="popover left"><div class="popover-content"></div><div class="arrow"></div></div></td>',
	constructor: function(data) {
		this.setData(data);
	},
	onRender: function() {
		this
			.bindNode({
				elapsedClassName: {
					node: ':sandbox',
					binder: prop('className')
				},
				formatElapsed: {
					node: ':sandbox span',
					binder: text()
				},
				query: {
					node: ':sandbox .popover-content',
					binder: text()
				}
			});
	}
});

var Queries = Matreshka.Class({
	'extends': Matreshka.Array,
	Model: Query,
	trackBy: '$index',
	constructor: function(db) {
		db.on('render', function() {
			this.bindNode('sandbox', db.nodes.sandbox).rerender();
		}, this);
	}
});

var Database = Matreshka.Class({
	'extends': Matreshka.Object,
	renderer: '<tr><td class="dbname"></td><td class="query-count"><span></span></td></tr>',
	constructor: function(data) {
		this.queries = new Queries(this);
		this.setData(data);

		this.on('change:lastSample', function() {
			this.queries.recreate(this.lastSample.topFiveQueries);
		});
	},
	onRender: function() {
		this
			.bindNode({
				dbname: {
					node: ':sandbox .dbname',
					binder: text()
				},
				'lastSample.countClassName': {
					node: ':sandbox .query-count span',
					binder: prop('className')
				},
				'lastSample.nbQueries': {
					node: ':sandbox .query-count span',
					binder: text()
				}
			});
	}
});

var Databases = Matreshka.Class({
	'extends': Matreshka.Array,
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
