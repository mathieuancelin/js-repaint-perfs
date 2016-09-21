var data = {
  dbs: ENV.generateData().toArray().map(function (db) {
    if (!db.topFiveQueries)
      db.topFiveQueries = db.lastSample.topFiveQueries

    return db
  })
}

document.getElementById('app').appendChild(simulacra(data, [
  document.getElementById('table').content, {
    dbs: [ id('dbs'), {
      dbname: id('dbname'),
      lastSample: [ id('lastSample'), {
        countClassName: function (node, value) {
          node.className = value
        },
        nbQueries: function (node, value) {
          return value
        }
      } ],
      topFiveQueries: [ id('topFiveQueries'), {
        elapsedClassName: function (node, value) {
          node.className = value
        },
        formatElapsed: function (node, value) {
          node.firstChild.textContent = value
        },
        query: id('query')
      } ]
    } ]
  }
]))

function loadSamples () {
  ENV.generateData(true)
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout)
}

loadSamples()

function id (x) {
  return '[data-id="' + x + '"]'
}
