import most from 'most'
import {run} from '@motorcycle/core'
import {makeDOMDriver, h} from '@motorcycle/dom'
import map from 'fast.js/array/map'

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
  ].concat(map(db.lastSample.topFiveQueries, dbMap)))
}

function mainMap(databases) {
  return h ('div', {static: true}, [
    h('table.table.table-striped.latest-data', {}, [
      h('tbody', map(databases, databasesMap))
    ])
  ])
}

function main(sources) {
  return {
    DOM: sources.databases.map(mainMap)
  }
}

function load(add) {
  add(ENV.generateData().toArray())
  Monitoring.renderRate.ping()
  setTimeout(function () {load(add)}, ENV.timeout)
}

run(main, {
  DOM: makeDOMDriver('#app-container'),
  databases: function() {return most.create(load)}
})
