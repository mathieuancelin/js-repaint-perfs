var DBMon = Elem.component({
  init: function(state, props) {
    state.set({
      databases: []
    }, true);
    this.loadSamples(state);
  },

  loadSamples: function (state) {
    state.set({ databases: ENV.generateData().toArray() });
    Monitoring.renderRate.ping();
    setTimeout(function() { this.loadSamples(state); }.bind(this), ENV.timeout);
  },

  render: function(state) {
    return (
      Elem.el('div', [
        Elem.el('table', { className: "table table-striped latest-data" }, [
          Elem.el('tbody', state.get('databases').map(function(database) {
            return Elem.el('tr', { key: database.dbname }, [
                Elem.el('td', { className: "dbname" }, database.dbname),
                Elem.el('td', { className: "query-count" }, 
                  Elem.el('span', { className: database.lastSample.countClassName }, database.lastSample.nbQueries)
                )
              ].concat(
                database.lastSample.topFiveQueries.map(function(query, index) {
                  return Elem.el('td', { className: "Query " + query.elapsedClassName }, [
                    Elem.el('span', query.formatElapsed),
                    Elem.el('div', { className: "popover left" }, [
                      Elem.el('div', { className: "popover-content" }, query.query),
                      Elem.el('div', { className: "arrow" }, '')
                    ])
                  ]);
                })
              )
            );
          }))
        ])
      ])
    );
  }
});

DBMon({}).renderTo('#dbmon');
