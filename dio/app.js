"use strict"
var data = [];
var VElement = dio.VElement;
var VText = dio.VText;
var DBMon = dio.createClass({
	render: function() {
		var length = data.length;
		var $children = new Array(length);
		for (var i = 0; i < length; i = i + 1) {
			var db = data[i];
			var children = new Array(7);
			children[0] = VElement('td', {className: 'dbname'}, [
				VText(db.dbname)
			]);
			children[1] = VElement('td', {className: 'query-count'}, [
				VElement('span', {className: db.lastSample.countClassName}, [
					VText(db.lastSample.nbQueries)
				])
			]);
			var topFiveQueries = db.lastSample.topFiveQueries;
			for (var j = 0, len = topFiveQueries.length; j < len; j = j + 1) {
				var query = topFiveQueries[j];
				children[j+2] = VElement('td', {className: query.elapsedClassName}, [
					VText(query.formatElapsed),
					VElement('div', {className: 'popover left'}, [
						VElement('div', {className: 'popover-content'}, [VText(query.query)]),
						VElement('div', {className: 'arrow'}, null)
					])
				])
			}
			$children[i] = VElement('tr', null, children);
		}
		return (
			VElement('div', null, [
				VElement('table', {className: 'table table-striped latest-data'}, [
					VElement('tbody', null, $children)
				])
			])
		);
	}
});

var render = dio.render(dio.VComponent(DBMon), '#app');
function update() {
	data = ENV.generateData().toArray();
	render();
	Monitoring.renderRate.ping();
	setTimeout(update, ENV.timeout);
}

update();