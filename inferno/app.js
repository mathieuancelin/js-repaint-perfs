(function() {
	"use strict";
	var elem = document.getElementById('app');

	//allows support in < IE9
	function map(func, array) {
		var newArray = new Array(array.length);
		for (var i = 0; i < array.length; i++) {
			newArray[i] = func(array[i]);
		}
		return newArray;
	}

	var queryTpl = InfernoDOM.template(function (elapsedClassName, formatElapsed, query) {
		return {
			tag: 'td',
			props: { className: elapsedClassName },
			children: [
				{tag: 'span', props: { className: 'foo' }, text: formatElapsed},
				{
					tag: 'div',
					props: { className: 'popover left' },
					children: [
						{tag: 'div', props: { className: 'popover-content' }, text: query},
						{tag: 'div', props: { className: 'arrow' }}
					]
				}
			]
		};
	});

	function query(query) {
		return queryTpl(query.elapsedClassName, query.formatElapsed, query.query);
	}

	var databaseTpl = InfernoDOM.template(function (dbname, countClassName, nbQueries, topFiveQueries) {
		return {
			tag: 'tr',
			children: [
				{tag: 'td', props: { className: 'dbname' }, text: dbname},
				{
					tag: 'td',
					props: { className: 'query-count'},
					children: {
						tag: 'span',
						props: { className: countClassName },
						text: nbQueries
					}
				},
				topFiveQueries
			]
		};
	});

	function database(db) {
		var lastSample = db.lastSample;

		return databaseTpl(
			db.dbname,
			lastSample.countClassName,
			lastSample.nbQueries,
			map(query, lastSample.topFiveQueries)
		);
	}

	var tableTpl = InfernoDOM.template(function (dbs) {
		return {
			tag: 'table',
			props: { className: 'table table-striped latest-data' },
			children: { tag: 'tbody', children: dbs }
		};
	});

	function render() {
		var dbs = ENV.generateData().toArray();
		InfernoDOM.render(tableTpl(map(database,dbs)), elem);
		Monitoring.renderRate.ping();
		setTimeout(render, ENV.timeout);
	}
	render();
})();
