"use strict"

var data = []

m.mount(document.getElementById("app"), {
	view: function() {
		return m("div", [
			m("table", {className: "table table-striped latest-data"}, [
				m("tbody",
					data.map(function(db) {
						return m("tr", {key: db.dbname}, [
							m("td", {className: "dbname"}, db.dbname),
							m("td", {className: "query-count"},  [
								m("span", {className: db.lastSample.countClassName}, db.lastSample.nbQueries)
							]),
							db.lastSample.topFiveQueries.map(function(query) {
								return m("td", {className: query.elapsedClassName}, [
									query.formatElapsed,
									m("div", {className: "popover left"}, [
										m("div", {className: "popover-content"}, query.query),
										m("div", {className: "arrow"})
									])
								])
							})
						])
					})
				)
			])
		])
	}
})

function update() {
	data = ENV.generateData().toArray()
	
	Monitoring.renderRate.ping();
	m.redraw()
	
	setTimeout(update, ENV.timeout)
}

update()

