var h = CycleDOM.h

function dbMap(q) {
  return h('td', {className: q.elapsedClassName}, [
    h('span.foo', [q.formatElapsed]),
    h('div.popover.left', [
      h('div.popover-content', [
        q.query
      ]),
      h('div.arrow')
    ])
  ])
}

function databasesMap(db) {
  return h('tr', [
    h('td.dbname', [db.dbname]),
    h('td.query-count', [
      h('span', {className: db.lastSample.countClassName}, [
        db.lastSample.nbQueries
      ])
    ]),
  ].concat(db.lastSample.topFiveQueries.map(dbMap)))
}

function main(sources) {
  return {
    DOM: sources.databases.map(function(databases) {
      return h ('div', [
        h('table.table.table-striped.latest-data', {}, [
          h('tbody', databases.map(databasesMap))
        ])
      ])
    })
  }
}


function DBMONDriver(){
  return Rx.Observable.timer(1, 1, Rx.Scheduler.requestAnimationFrame)
    .map(function() {
      var databases = ENV.generateData(true).toArray()
      Monitoring.renderRate.ping()
      return databases
    })
}

Cycle.run(main, {
  DOM: CycleDOM.makeDOMDriver('#app-container'),
  databases: DBMONDriver
})
