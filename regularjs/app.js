var Component = Regular.extend({
  template:'#tpl'
}).use('$timeout');


var component = new Component().$inject('#app');

function loadSamples() {
  component.data.databases = ENV.generateData().toArray()
  Monitoring.renderRate.ping();
  component.$timeout(loadSamples, ENV.timeout)
}

loadSamples();
