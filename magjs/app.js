var DB = {}

DB.view = function(state) {
  
  state.databases = DB.databases.map(function(database) {
    
    return {
      dbname: database.dbname,
      samples: database.lastSample.topFiveQueries.map(function(query, index) {
        return {
          _class: "Query " + query.elapsedClassName,
          _text: query.formatElapsed,
          'popover-content': query.query
        }
      }),
      span: {
        _text: database.lastSample.nbQueries,
        _class: database.lastSample.countClassName
      }
    }

  });

}

function loadSamples() {
  DB.databases = ENV.generateData().toArray();
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples();
mag.module("dbmon", DB);
