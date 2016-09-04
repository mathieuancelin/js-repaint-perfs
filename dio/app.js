"use strict"

var data = [];

var DBMon = dio.createComponent({
	render: function() {
		return {
			type: 'div',
			props: {},
			children: [
				{
					type: 'table',
					props: {className: 'table table-striped latest-data'},
					children: [
						{
							type: 'tbody',
							props: {},
							children: data.map(function (db) {
								var 
								children = new Array(7);

								children[0] = {
									type: 'td',
									props: {className: 'dbname'},
									children:
									[
										{
											type: 'text',
											props: undefined,
											children: [db.dbname]
										}
									]
								}

								children[1] = {
									type: 'td',
									props: {className: 'query-count'},
									children: [
										{
											type: 'span',
											props: {className: db.lastSample.countClassName},
											children:
											[
												{
													type: 'text',
													props: undefined,
													children: [db.lastSample.nbQueries]
												}
											]
										}
									]
								}

								var length = db.lastSample.topFiveQueries.length;

								for (var i = 0; i < length; i++) {
									var query = db.lastSample.topFiveQueries[i];

									children[i+2] = {
										type: 'td',
										props: {key: i, className: query.elapsedClassName},
										children: [
											{
												type: 'text',
												props: undefined,
												children: [query.formatElapsed]
											},
											{
												type: 'div',
												props: {className: 'popover left'},
												children: [
													{
														type: 'div',
														props: {className: 'popover-content'},
														children: [
															{
																type: 'text',
																props: undefined,
																children: [query.query]
															}
														]
													},
													{
														type: 'div',
														props: {className: 'arrow'},
														children: []
													}
												]
											}
										]
									};
								}

								return {
									type: 'tr',
									props: {key: db.dbname},
									children: children
								}
							})
						}	
					]
				}
			]
		}
	}
})

var render = dio.createRender(DBMon, '#app');

function update() {
	data = ENV.generateData().toArray();
	
	Monitoring.renderRate.ping();
	render();

	setTimeout(update, ENV.timeout)
}

update();
