var DB = {}
DB.databases=mag.prop([])

DB.view = function(state, props) {

  state.databases = props.databases().map(function(database) {

    return {
      dbname: database.dbname,
      samples: database.lastSample.topFiveQueries.map(function(query) {
        
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

var instance = mag.module("dbmon", DB, {databases:DB.databases});

function loadSamples() {
  DB.databases(ENV.generateData().toArray());
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
  instance.draw()
}

loadSamples();
