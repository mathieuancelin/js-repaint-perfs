"use strict"

var data = [];

var propsDbname = {className: 'dbname'},
	propsQueryCount = {className: 'query-count'},
	propsPopoverLeft = {className: 'popover left'},
	propsPopoverContent = {className: 'popover-content'},
	propsArrow = {className: 'arrow'},
	propsTable = {className: 'table table-striped latest-data'},
	emptyObj = {};

var arrowDiv = {
	nodeType: 1,
	type: 'div',
	props: {className: 'arrow'},
	children: []
}

var DBMon = dio.createClass({
	render: function() {

		var length = data.length;
		var $children = new Array(length);

		for (var i = 0; i < length; i = i + 1) {
			var db = data[i];
			var children = new Array(7);

			children[0] = {
				nodeType: 1,
				type: 'td',
				props: propsDbname,
				children:
				[
					{
						nodeType: 3,
						type: 'text',
						props: emptyObj,
						children: [db.dbname]
					}
				]
			}

			children[1] = {
				nodeType: 1,
				type: 'td',
				props: propsQueryCount,
				children: [
					{
						nodeType: 1,
						type: 'span',
						props: {className: db.lastSample.countClassName},
						children:
						[
							{
								nodeType: 3,
								type: 'text',
								props: emptyObj,
								children: [db.lastSample.nbQueries]
							}
						]
					}
				]
			}

			var topFiveQueries = db.lastSample.topFiveQueries;

			for (var j = 0, len = topFiveQueries.length; j < len; j = j + 1) {
				var query = topFiveQueries[j];

				children[j+2] = {
					nodeType: 1,
					type: 'td',
					props: {key: j, className: query.elapsedClassName},
					children: [
						{
							nodeType: 3,
							type: 'text',
							props: emptyObj,
							children: [query.formatElapsed]
						},
						{
							nodeType: 1,
							type: 'div',
							props: propsPopoverLeft,
							children: [
								{
									nodeType: 1,
									type: 'div',
									props: propsPopoverContent,
									children: [
										{
											nodeType: 3,
											type: 'text',
											props: emptyObj,
											children: [query.query]
										}
									]
								},
								arrowDiv
							]
						}
					]
				};
			}

			$children[i] = {
				nodeType: 1,
				type: 'tr',
				props: {key: db.dbname},
				children: children
			}
		}

		return {
			nodeType: 1,
			type: 'div',
			props: emptyObj,
			children: [
				{
					nodeType: 1,
					type: 'table',
					props: propsTable,
					children: [
						{
							nodeType: 1,
							type: 'tbody',
							props: emptyObj,
							children: $children
						}	
					]
				}
			]
		}
	}
});

var render = dio.render({
	nodeType: 1,
	type: DBMon,
	props: {},
	children: []
}, '#app');

function update() {
	data = ENV.generateData().toArray();
	
	Monitoring.renderRate.ping();
	render();

	setTimeout(update, ENV.timeout);
}

update();
