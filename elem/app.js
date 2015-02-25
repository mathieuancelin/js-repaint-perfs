var renderRate = new RenderRate();
document.body.appendChild( renderRate.domElement );

var start = Date.now();
var loadCount = 0;

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
    var info = data.databases[dbname];

    var r = Math.floor((Math.random() * 10) + 1);
    for (var i = 0; i < r; i++) {
      var q = {
        canvas_action: null,
        canvas_context_id: null,
        canvas_controller: null,
        canvas_hostname: null,
        canvas_job_tag: null,
        canvas_pid: null,
        elapsed: Math.random() * 15,
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

    info.queries = info.queries.sort(function(a, b) {
      return b.elapsed - a.elapsed;
    });
  });

  return data;
}

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

function Query(props) {
  var className = "elapsed short";
  if (props.elapsed >= 10.0) {
    className = "elapsed warn_long";
  }
  else if (props.elapsed >= 1.0) {
    className = "elapsed warn";
  }
  return (
    Elem.el('td', { className: "Query " + className }, [
      Elem.el('span', props.elapsed ? formatElapsed(props.elapsed) : ''),
      Elem.el('div', { className: "popover left" }, [
        Elem.el('div', { className: "popover-content" }, props.query),
        Elem.el('div', { className: "arrow" }, '')
      ])
    ])
  );
}


function sample(queries, time) {
  var topFiveQueries = queries.slice(0, 5);
  while (topFiveQueries.length < 5) {
    topFiveQueries.push({ query: "" });
  }

  var _queries = [];
  topFiveQueries.forEach(function(query, index) {
    _queries.push(
      Query({
        key: index,
        query: query.query,
        elapsed: query.elapsed
      })
    );
  });

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

  return [
    Elem.el('td', { className: "query-count" }, Elem.el('span', { className: countClassName }, queries.length))
  ].concat(_queries);
};

function Database(props) {
  var lastSample = props.samples[props.samples.length - 1];
  return Elem.el('tr', { key: props.dbname }, [
    Elem.el('td', { className: "dbname" }, props.dbname)
    ].concat(sample(lastSample.queries, lastSample.time))
  );
}

var DBMon = Elem.component({
  init: function(state, props) {
    state.set({
      databases: {}
    }, true);
    this.loadSamples(state);
  },

  loadSamples: function (state) {
    loadCount++;
    var newData = getData();
    
    Object.keys(newData.databases).forEach(function(dbname) {
      var sampleInfo = newData.databases[dbname];

      if (!state().databases[dbname]) {
        state().databases[dbname] = {
          name: dbname,
          samples: []
        }
      }

      var samples = state().databases[dbname].samples;
      samples.push({
        time: newData.start_at,
        queries: sampleInfo.queries
      });
      if (samples.length > 5) {
        samples.splice(0, samples.length - 5);
      }
    }.bind(this));

    state.set(state());
    renderRate.ping();
    setTimeout(function() { this.loadSamples(state); }.bind(this), ENV.timeout);
  },

  render: function(state) {
    var databases = [];
    Object.keys(state().databases).forEach(function(dbname) {
      databases.push(
        Database({
          key: dbname,
          dbname: dbname,
          samples: state().databases[dbname].samples
        })
      );
    }.bind(this));

    return (
      Elem.el('div', [
        Elem.el('table', { className: "table table-striped latest-data" }, [
          Elem.el('tbody', databases)
        ])
      ])
    );
  }
});

DBMon({}).renderTo('#dbmon');
