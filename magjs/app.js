var DB = {}

DB.view = function(state, props) {

  state.databases = props.databases.map(function(database) {

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
var props = {databases: []};
var instance = mag.module("dbmon", DB, props);

function loadSamples() {
  props.databases = ENV.generateData().toArray();
  Monitoring.renderRate.ping();
  instance.draw(1); //clear cache
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples();
