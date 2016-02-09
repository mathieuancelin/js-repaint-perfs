"use strict";

var _preact = preact;
var h = _preact.h;
var render = _preact.render;

/** @jsx h */

// a simple render loop.
var root = document.getElementById('dbmon'),
    base = undefined;
function frame() {
	Monitoring.renderRate.ping();
	base = render(h(DBMon, { databases: ENV.generateData().toArray() }), root, base);
	setTimeout(frame, ENV.timeout);
}
setTimeout(frame, 1);

var DBMon = function DBMon(_ref) {
	var databases = _ref.databases;
	return h(
		"div",
		null,
		h(
			"table",
			{ "class": "table table-striped latest-data" },
			h(
				"tbody",
				null,
				databases.map(Database)
			)
		)
	);
};

var Database = function Database(_ref2) {
	var dbname = _ref2.dbname;
	var lastSample = _ref2.lastSample;
	return h(
		"tr",
		{ key: dbname },
		h(
			"td",
			{ "class": "dbname" },
			dbname
		),
		h(
			"td",
			{ "class": "query-count" },
			h(
				"span",
				{ "class": lastSample.countClassName },
				lastSample.nbQueries
			)
		),
		lastSample.topFiveQueries.map(Query)
	);
};

var Query = function Query(_ref3) {
	var elapsedClassName = _ref3.elapsedClassName;
	var formatElapsed = _ref3.formatElapsed;
	var query = _ref3.query;
	return h(
		"td",
		{ "class": "Query " + elapsedClassName },
		formatElapsed,
		h(
			"div",
			{ "class": "popover left" },
			h(
				"div",
				{ "class": "popover-content" },
				query
			),
			h("div", { "class": "arrow" })
		)
	);
};

