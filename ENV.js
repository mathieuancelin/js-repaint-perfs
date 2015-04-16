var ENV = ENV || (function() {

  var _base;

  (_base = String.prototype).lpad || (_base.lpad = function(padding, toLength) {
    return padding.repeat((toLength - this.length) / padding.length).concat(this);
  });

  function formatElapsed(value) {
    str = parseFloat(value).toFixed(2);
    if (value > 60) {
      minutes = Math.floor(value / 60);
      comps = (value % 60).toFixed(2).split('.');
      seconds = comps[0].lpad('0', 2);
      ms = comps[1];
      str = minutes + ":" + seconds + "." + ms;
    }
    return str;
  }

  function getElapsedClassName(elapsed) {
    var className = 'Query elapsed';
    if (elapsed >= 10.0) {
      className += ' warn_long';
    }
    else if (elapsed >= 1.0) {
      className += ' warn';
    }
    else {
      className += ' short';
    }
    return className;
  }

  var lastGeneratedDatabases = [];

  function getData() {
    // generate some dummy data
    data = {
      start_at: new Date().getTime() / 1000,
      databases: {}
    };

    for (var i = 1; i <= ENV.rows; i++) {
      data.databases["cluster" + i] = {
        queries: []
      };

      data.databases["cluster" + i + "slave"] = {
        queries: []
      };
    }

    Object.keys(data.databases).forEach(function(dbname) {

      if (lastGeneratedDatabases.length == 0 || Math.random() < ENV.mutations) {
        var info = data.databases[dbname];
        var r = Math.floor((Math.random() * 10) + 1);
        for (var i = 0; i < r; i++) {
          var elapsed = Math.random() * 15;
          var q = {
            canvas_action: null,
            canvas_context_id: null,
            canvas_controller: null,
            canvas_hostname: null,
            canvas_job_tag: null,
            canvas_pid: null,
            elapsed: elapsed,
            formatElapsed: formatElapsed(elapsed),
            elapsedClassName: getElapsedClassName(elapsed),
            query: "SELECT blah FROM something",
            waiting: Math.random() < 0.5
          };

          if (Math.random() < 0.2) {
            q.query = "<IDLE> in transaction";
          }

          if (Math.random() < 0.1) {
            q.query = "vacuum";
          }

          info.queries.push(q);
        }

        info.queries = info.queries.sort(function (a, b) {
          return b.elapsed - a.elapsed;
        });
      } else {
        data.databases[dbname] = lastGeneratedDatabases[dbname];
      }
    });

    lastGeneratedDatabases = data.databases;

    return data;
  }

  var lastDatabases = {
    toArray: function() {
      return Object.keys(this).filter(function(k) { return k !== 'toArray'; }).map(function(k) { return this[k]; }.bind(this))
    } 
  };

  function generateData() {
    var databases = [];
    var newData = getData();
    Object.keys(newData.databases).forEach(function(dbname) {
      var sampleInfo = newData.databases[dbname];
      var database = {
        dbname: dbname,
        samples: []
      };

      function countClassName(queries) {
        var countClassName = "label";
        if (queries.length >= 20) {
          countClassName += " label-important";
        }
        else if (queries.length >= 10) {
          countClassName += " label-warning";
        }
        else {
          countClassName += " label-success";
        }
        return countClassName;
      }

      function topFiveQueries(queries) {
        var tfq = queries.slice(0, 5);
        while (tfq.length < 5) {
          tfq.push({ query: "" });
        }
        return tfq;
      }

      var samples = database.samples;
      samples.push({
        time: newData.start_at,
        queries: sampleInfo.queries,
        topFiveQueries: topFiveQueries(sampleInfo.queries),
        countClassName: countClassName(sampleInfo.queries) 
      });
      if (samples.length > 5) {
        samples.splice(0, samples.length - 5);
      }
      var samples = database.samples;
      database.lastSample = database.samples[database.samples.length - 1];
      databases.push(database);
    });
    return {
      toArray: function() {
        return databases;
      }
    };
  }
  return  {
    generateData: generateData,
    rows: 50,
    timeout: 0,
    mutations: 0.5
  };
})();


