function Query(props) {
  return (
    Elem.el('td', { className: "Query " + props.elapsedClassName }, [
      Elem.el('span', props.formatElapsed),
      Elem.el('div', { className: "popover left" }, [
        Elem.el('div', { className: "popover-content" }, props.query),
        Elem.el('div', { className: "arrow" }, '')
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
    Elem.el('td', { className: "query-count" }, Elem.el('span', { className: database.lastSample.countClassName }, database.lastSample.nbQueries))
  ].concat(_queries);
};

function Database(props) {
  var lastSample = props.lastSample;
  return Elem.el('tr', { key: props.dbname }, [
    Elem.el('td', { className: "dbname" }, props.dbname)
    ].concat(sample(props))
  );
}

var DBMon = Elem.component({
  init: function(state, props) {
    state.set({
      databases: []
    }, true);
    this.loadSamples(state);
  },

  loadSamples: function (state) {
    state.set({
      databases: ENV.generateData().toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(function() { this.loadSamples(state); }.bind(this), ENV.timeout);
  },

  render: function(state) {
    var databases = state.get('databases').map(function(database) {
      return Database({
        dbname: database.dbname,
        samples: database.samples,
        lastSample: database.lastSample
      });
    });
    return (
      Elem.el('div', [
        Elem.el('table', { className: "table table-striped latest-data" }, [
          Elem.el('tbody', databases)
        ])
      ])
    );
  }
});

DBMon({}).renderTo('#dbmon');
