import most from 'most'
import {run} from '@motorcycle/core'
import {makeDOMDriver, h} from '@motorcycle/dom'
import {map, concat} from 'fast.js/array'

const dbMap = q =>  h(`td.${q.elapsedClassName}`, [
  h('span.foo', [q.formatElapsed]),
  h('div.popover.left', [
    h('div.popover-content', [
      q.query
    ]),
    h('div.arrow')
  ])
])

const databasesMap = db =>  h('tr', concat([
  h('td.dbname', [db.dbname]),
  h('td.query-count', [
    h('span', {className: db.lastSample.countClassName}, [
      db.lastSample.nbQueries
    ])
  ]),
], map(db.lastSample.topFiveQueries, dbMap)))

const main = sources => ({
  DOM: sources.databases.map(databases => h('div', [
    h('table.table.table-striped.latest-data', {}, [
      h('tbody', map(databases, databasesMap))
    ])
  ]))
})

const data = ENV.generateData()

const DBMONDriver = () => most.periodic(25, 1)
  .tap(Monitoring.renderRate.ping)
  .map(() => most.of(ENV.generateData(true).toArray()))
  .join()

run(main, {
  DOM: makeDOMDriver('#app-container'),
  databases: DBMONDriver
})
