var DBMon = Elem.createComponent({

  name: 'DBMon',

  init: function() {
    function update() {
      var db = ENV.generateData().toArray();
      this.setState({ databases: db });
      Monitoring.renderRate.ping(); 
      setTimeout(update.bind(this), ENV.timeout);
    }
    setTimeout(update.bind(this), ENV.timeout);
  },

  getInitialState: function() {
    return {
      databases: []
    };
  },

  render: function() {
    var rows = this.state.databases.map(function(database) {
      var base = [
        Elem.el('td', { className: "dbname" }, [database.dbname]),
        Elem.el('td', { className: "query-count" }, [
          Elem.el('span', { className: database.lastSample.countClassName }, [database.lastSample.nbQueries])
        ])
      ];
      base = base.concat(
        database.lastSample.topFiveQueries.map(function(query, index) {
          return Elem.el('td', { className: "Query " + query.elapsedClassName }, [
            Elem.el('span', {}, [query.formatElapsed]),
            Elem.el('div', { className: "popover left" }, [
              Elem.el('div', { className: "popover-content" }, [query.query]),
              Elem.el('div', { className: "arrow" }, [''])
            ])
          ]);
        })
      );
      return Elem.el('tr', { key: database.dbname }, base);
    });
    var finalElem = Elem.el('div', [
      Elem.el('table', { className: "table table-striped latest-data" }, [
        Elem.el('tbody', rows)
      ])
    ]);
    return finalElem;
  }
});

Elem.render(DBMon, '#dbmon');