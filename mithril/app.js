function Query(props) {
  return (
    m('td', { className: "Query " + props.elapsedClassName }, [
      m('span', props.formatElapsed),
      m('div', { className: "popover left" }, [
        m('div', { className: "popover-content" }, props.query),
        m('div', { className: "arrow" }, '')
      ])
    ])
  );
}

function sample(database) {
  var _queries = [];
  database.lastSample.topFiveQueries.forEach(function(query, index) {
    _queries.push(
      Query({
        key: index,
        query: query.query,
        elapsed: query.elapsed,
        formatElapsed: query.formatElapsed,
        elapsedClassName: query.elapsedClassName
      })
    );
  });
  return [
    m('td', { className: "query-count" }, m('span', { className: database.lastSample.countClassName }, database.lastSample.queries.length))
  ].concat(_queries);
};

function Database(props) {
  var lastSample = props.lastSample;
  return m('tr', { key: props.dbname }, [
    m('td', { className: "dbname" }, props.dbname)
    ].concat(sample(props))
  );
}

var DB = {}

DB.databases = [];

DB.controller = function() {};

DB.view = function(ctrl) {
  var databases = DB.databases.map(function(database) {
    return Database({
      dbname: database.dbname,
      samples: database.samples,
      lastSample: database.lastSample
    });
  });
  var fragment = m('div', [
    m('table', { className: "table table-striped latest-data" }, [
      m('tbody', databases)
    ])
  ]);
  return fragment;
}

function loadSamples() {
  m.endComputation();
  DB.databases = ENV.generateData().toArray();
  Monitoring.renderRate.ping();
  m.startComputation();
  setTimeout(loadSamples, ENV.timeout);
}

$(function() {
  m.module(document.getElementById("app"), {view: DB.view, controller: DB.controller});
  loadSamples();
});

