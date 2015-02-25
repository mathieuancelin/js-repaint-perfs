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

var ractive = new Ractive({
  el: '#app',
  template: '#template2',
  data: {
    databases: []
  }
});

function loadSamples() {
  loadCount++;
  var newData = getData();
  
  var databases = [];
  Object.keys(newData.databases).forEach(function(dbname) {
    var sampleInfo = newData.databases[dbname];
    var samples = sampleInfo.queries;
    samples.forEach(function(item) {
      item.formatElapsed = formatElapsed(item.elapsed);
      var className = "elapsed short";
      if (item.elapsed >= 10.0) {
        className = "elapsed warn_long";
      }
      else if (item.elapsed >= 1.0) {
        className = "elapsed warn";
      }
      item.elapsedClass = className;
    });
    function labelClass() {
      var count;
      count = samples.length;
      if (count >= 20) {
        return "label-important";
      }
      if (count >= 10) {
        return "label-warning";
      }
      return "label-success";
    }
    var classlabel = labelClass();
    if (samples.length > 5) {
      samples.splice(0, samples.length - 5);
    }
    while (samples.length < 5) {
      samples.push({ query: "" });
    }
    databases.push({
      name: dbname,
      queriesCountLabelClass: classlabel,
      queries: samples
    })
  });

  ractive.set('databases', databases);
  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
}

loadSamples();
