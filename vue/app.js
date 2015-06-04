var app = new Vue({
  el: '#app',
  data: {
    databases: []
  }
})

function loadSamples() {
  app.databases = ENV.generateData().toArray();
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples()