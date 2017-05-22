var databases = new cellx.Cell();

Rionite.Component.extend('db-table', {
  Static: {
    template: `
      table (class=table table-striped latest-data) { tbody {
        @repeat (for=db of databases, track-by=dbname) {
          tr {
            td (class=dbname) { '{db.dbname}' }
            td (class=query-count) {
              span (class={db.lastSample.countClassName}) { '{db.lastSample.nbQueries}' }
            }
            @repeat (for=q of db.lastSample.topFiveQueries, track-by=$index) {
              td (class={q.elapsedClassName}) {
                '{q.formatElapsed}'
                div (class=popover left) {
                  div (class=popover-content) { '{q.query}' }
                  div (class=arrow)
                }
              }
            }
          }
        }
      } }
    `
  },

  initialize: function() {
    cellx.define(this, {
      databases: databases
    });
  }
});

var render = function() {
  databases.set(ENV.generateData().toArray());

  Monitoring.renderRate.ping();
  setTimeout(render, ENV.timeout);
};

render();
