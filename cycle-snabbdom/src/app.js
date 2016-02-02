import Rx from 'rx'
import {run} from '@cycle/core'
import {makeDOMDriver, h} from 'cycle-snabbdom'

function dbMap(q) {
  return h('td.' + q.elapsedClassName, [
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
      h('span.' + db.lastSample.countClassName, [
        db.lastSample.nbQueries
      ])
    ]),
  ].concat(db.lastSample.topFiveQueries.map(dbMap)))
}

function main(sources) {
  return {
    DOM: sources.databases.map(function(databases) {
      return h ('div', {static: true}, [
        h('table.table.table-striped.latest-data', {}, [
          h('tbody', databases.map(databasesMap))
        ])
      ])
    })
  }
}


function DBMONDriver(){
  return Rx.Observable.create(function(observer){
    function load() {
      observer.onNext(ENV.generateData().toArray())
      Monitoring.renderRate.ping()
      setTimeout(load, ENV.timeout)
    }
    load()
  })
}

run(main, {
  DOM: makeDOMDriver('#app-container'),
  databases: DBMONDriver
})
