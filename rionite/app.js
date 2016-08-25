var databases = new cellx.Cell();

Rionite.Component.extend('db-table', {
  Static: {
    template: '<table class="table table-striped latest-data"><tbody>\
      <template is="rt-repeat" for="db of databases" track-by="dbname">\
        <tr>\
          <td class="dbname">{db.dbname}</td>\
          <td class="query-count">\
            <span class="{db.lastSample.countClassName}">{db.lastSample.nbQueries}</span>\
          </td>\
          <template is="rt-repeat" for="q of db.lastSample.topFiveQueries" track-by="$index">\
            <td class="{q.elapsedClassName}">\
              {q.formatElapsed}\
              <div class="popover left">\
                <div class="popover-content">{q.query}</div>\
                <div class="arrow"></div>\
              </div>\
            </td>\
          </template>\
        </tr>\
      </template>\
    </tbody></table>'
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
