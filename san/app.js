var App = san.defineComponent({
    template: `<table class="table table-striped lastest-data">
      <tbody>
        <tr s-for="db in databases">
          <td class="dbname">{{db.dbname}}</td>
          <td class="query-count">
            <span class="{{db.lastSample.countClassName}}">{{db.lastSample.nbQueries}}</span>
          </td>
          <td s-for="q in db.lastSample.topFiveQueries" class="Query {{q.elapsedClassName}}">
            {{q.formatElapsed}}
            <div class="popover left">
              <div class="popover-content">{{q.query}}</div>
              <div class="arrow"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>`,

    initData() {
        return {
            databases: []
        }
    }
})

var app = new App();
app.attach(document.getElementById('app'));

function loadSamples() {
  app.data.set('databases', ENV.generateData().toArray());
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples()