import most from 'most'
import {run} from '@motorcycle/core'
import {makeDOMDriver, h} from '@motorcycle/dom'

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
      return h ('div', {static: true}, [
        h('table.table.table-striped.latest-data', {}, [
          h('tbody', databases.map(databasesMap))
        ])
      ])
    })
  }
}


function DBMONDriver(){
  return most.create(function(add){
    function load() {
      add(ENV.generateData().toArray())
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
