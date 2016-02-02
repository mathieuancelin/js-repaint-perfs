import most from 'most'
import {run} from '@motorcycle/core'
import {makeDOMDriver, h} from '@motorcycle/dom'
import {map} from 'fast.js/array'

const dbMap = q =>  h(`td.${q.elapsedClassName}`, [
  h('span.foo', [q.formatElapsed]),
  h('div.popover.left', [
    h('div.popover-content', [
      q.query
    ]),
    h('div.arrow')
  ])
])

const databasesMap = db =>  h('tr', [
  h('td.dbname', [db.dbname]),
  h('td.query-count', [
    h(`span.${db.lastSample.countClassName}`, [
      db.lastSample.nbQueries
    ])
  ]),
  ...map(db.lastSample.topFiveQueries, dbMap)
])

const main = sources => ({
  DOM: sources.databases.map(databases => h('div', {static: true}, [
    h('table.table.table-striped.latest-data', [
      h('tbody', map(databases, databasesMap))
    ])
  ]))
})

const DBMONDriver = () => most.create(add => {
  const load = () => {
    add(ENV.generateData().toArray())
    Monitoring.renderRate.ping()
    setTimeout(load, ENV.timeout)
  }
  load()
})


run(main, {
  DOM: makeDOMDriver('#app-container', [], true),
  databases: DBMONDriver
})
