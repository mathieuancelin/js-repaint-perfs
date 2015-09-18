var ENV = ENV || (function() {

  var data;
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

  function updateQuery(object) {
    if (!object) {
      object = {};
    }
    var elapsed = Math.random() * 15;
    object.elapsed = elapsed;
    object.formatElapsed = formatElapsed(elapsed);
    object.elapsedClassName = getElapsedClassName(elapsed);
    object.query = "SELECT blah FROM something";
    object.waiting = Math.random() < 0.5;
    if (Math.random() < 0.2) {
      object.query = "<IDLE> in transaction";
    }
    if (Math.random() < 0.1) {
      object.query = "vacuum";
    }
    return object;
  }

  function generateRow(object) {
    var nbQueries = Math.floor((Math.random() * 10) + 1);
    if (!object) {
      object = {};
    }
    if (!object.lastSample) {
      object.lastSample = {};
    }
    //if (!object.lastSample.queries) {
    object.lastSample.queries = [];
    //}

    for (var j = 0; j < nbQueries; j++) {
      var query = updateQuery();
      object.lastSample.queries.push(query);
    }
    if (!object.lastSample.topFiveQueries) {
      object.lastSample.topFiveQueries = [];
    }
    for (var i = 0; i < 5; i++) {
      var source = object.lastSample.queries[i];
      //console.log(source);
      if (!source) {
        source = {
          query: "",
          formatElapsed: "",
          elapsedClassName: ""
        };
      }
      object.lastSample.topFiveQueries[i] = source;
    }
    object.lastSample.countClassName = countClassName(object.lastSample.queries);
    return object;
  }

  function getData(keepIdentity) {
    if (!keepIdentity) {
      data = [];
      for (var i = 1; i <= ENV.rows; i++) {
        data.push({ dbname: 'cluster' + i, query: "", formatElapsed: "", elapsedClassName: "" });
        data.push({ dbname: 'cluster' + i + ' slave', query: "", formatElapsed: "", elapsedClassName: "" });
      }
    }
    if (!data) {
      data = [];
      for (var i = 1; i <= ENV.rows; i++) {
        data.push({ dbname: 'cluster' + i });
        data.push({ dbname: 'cluster' + i + ' slave' });
      }
    }
    for (var i in data) {
      var row = data[i];
      if (!row.lastSample || Math.random() < ENV.mutations()) {
        generateRow(row);
      }
    }
    return {
      toArray: function() {
        return data;
      }
    };
  }

  var mutationsValue = 0.5;

  function mutations(value) {
    if (value) {
      mutationsValue = value;
      return mutationsValue;
    } else {
      return mutationsValue;
    }
  }

  var body = document.querySelector('body');
  var theFirstChild = body.firstChild;

  var sliderContainer = document.createElement( 'div' );
  sliderContainer.style.cssText = "display: flex";
  var slider = document.createElement('input');
  var text = document.createElement('label');
  text.innerHTML = 'mutations : ' + (mutationsValue * 100).toFixed(0) + '%';
  text.id = "ratioval";
  slider.setAttribute("type", "range");
  slider.style.cssText = 'margin-bottom: 10px; margin-top: 5px';
  slider.addEventListener('change', function(e) {
    ENV.mutations(e.target.value / 100);
    document.querySelector('#ratioval').innerHTML = 'mutations : ' + (ENV.mutations() * 100).toFixed(0) + '%';
  });
  sliderContainer.appendChild( text );
  sliderContainer.appendChild( slider );
  body.insertBefore( sliderContainer, theFirstChild );

  return  {
    generateData: getData,
    rows: 50,
    timeout: 0,
    mutations: mutations
  };
})();
