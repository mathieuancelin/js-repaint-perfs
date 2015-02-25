var ractive = new Ractive({
  el: '#app',
  template: '#template2',
  data: {
    databases: []
  }
});

function loadSamples() {
  var databases = ENV.generateData().toArray();
  ractive.set('databases', databases);
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples();
