var app = Vue.createApp({
  data() {
    return {
      databases: []
    }
  }
}).mount('#app')

function loadSamples() {
  app.databases = ENV.generateData().toArray()
  Monitoring.renderRate.ping()
  setTimeout(loadSamples, ENV.timeout)
}

loadSamples()