var node = vidom.node;

var DBMon = vidom.createComponent({
  onInit: function() {
    this.loadSamples = this.loadSamples.bind(this);
  },

  onInitialStateRequest: function() {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({ databases: ENV.generateData().toArray() });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  onMount: function() {
    this.loadSamples();
  },

  onRender: function() {
    return (
      node('div').children([
        node('table').attrs({ className: 'table table-striped latest-data' }).children([
          node('tbody').children(this.getState().databases.map(function(database) {
            var children = [
              node('td').key('dbname').attrs({ className: 'dbname' }).children(database.dbname),
              node('td').key('query-count').attrs({ className: 'query-count' }).children([
                node('span')
                  .attrs({ className: database.lastSample.countClassName })
                  .children(database.lastSample.nbQueries)
              ])];

              database.lastSample.topFiveQueries.forEach(function(query, index) {
                children.push(
                  node('td')
                    .key('top' + index)
                    .attrs({ className: 'Query ' + query.elapsedClassName })
                    .children([
                      node('span').key('elapsed').children(query.formatElapsed),
                      node('div')
                        .key('content')
                        .attrs({ className : 'popover left' })
                        .children([
                          node('div').key('content').attrs({ className: 'popover-content' }).children(query.query),
                          node('div').key('arrow').attrs({ className: 'arrow' })
                        ])
                    ]));
              });

              return node('tr').key(database.dbname).children(children);
            }))
          ])
        ])
    );
  }
});

vidom.mountToDom(document.getElementById('dbmon'), node(DBMon));
