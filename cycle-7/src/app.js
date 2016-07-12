/* global Monitoring, ENV */
import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver, h} from '@cycle/dom';

function dbMap(q) {
  return h('td.' + q.elapsedClassName, [
    h('span.foo', [q.formatElapsed]),
    h('div.popover.left', [
      h('div.popover-content', [
        q.query
      ]),
      h('div.arrow')
    ])
  ]);
}

function databasesMap(db) {
  return h('tr', [
    h('td.dbname', [db.dbname]),
    h('td.query-count', [
      h('span.' + db.lastSample.countClassName, [
        db.lastSample.nbQueries
      ])
    ])
  ].concat(db.lastSample.topFiveQueries.map(dbMap)));
}

function main(sources) {
  return {
    DOM: sources.databases.map(function(databases) {
      return h ('div', {static: true}, [
        h('table.table.table-striped.latest-data', {}, [
          h('tbody', databases.map(databasesMap))
        ])
      ]);
    })
  };
}


function DBMONDriver(){
  return xs.create({
    start: listener => {
      function load() {
        listener.next(ENV.generateData().toArray());
        Monitoring.renderRate.ping();
        setTimeout(load, ENV.timeout);
      }
      load();
    },
    stop: () => {}
  });
}

run(main, {
  DOM: makeDOMDriver('#app-container'),
  databases: DBMONDriver
});
