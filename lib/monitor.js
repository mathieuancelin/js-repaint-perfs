var Monitoring =
  Monitoring ||
  (function() {
    var stats = new MemoryStats();
    stats.domElement.style.position = "fixed";
    stats.domElement.style.right = "0px";
    stats.domElement.style.bottom = "0px";
    document.body.appendChild(stats.domElement);
    requestAnimationFrame(function rAFloop() {
      stats.update();
      requestAnimationFrame(rAFloop);
    });

    var RenderRate = function() {
      var container = document.createElement("div");
      container.id = "stats";
      container.style.cssText =
        "width:150px;opacity:0.9;cursor:pointer;position:fixed;right:80px;bottom:0px;";

      var msDiv = document.createElement("div");
      msDiv.id = "ms";
      msDiv.style.cssText =
        "padding:0 0 3px 3px;text-align:left;background-color:#020;";
      container.appendChild(msDiv);

      var msText = document.createElement("div");
      msText.id = "msText";
      msText.style.cssText =
        "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
      msText.innerHTML = "Repaint rate: 0/sec";
      msDiv.appendChild(msText);

      var self = this;
      var rate = 0;
      var bucketSize = 200;
      var bucket = [];
      var lastTime = performance ? performance.now() : Date.now();
      return {
        domElement: container,
        ping: function() {
          var start = lastTime;
          var stop = performance ? performance.now() : Date.now();
          var rate = 1000 / (stop - start);
          if (rate == Infinity) {
            return;
          }
          bucket.push(rate);
          if (bucket.length > bucketSize) {
            bucket.shift();
          }
          var sum = 0;
          const tmp = sma(bucket, Math.floor(bucketSize / 10), Number);
          for (var i = 0; i < tmp.length; i++) {
            sum = sum + tmp[i];
          }
          self.rate = sum / tmp.length;
          if (isNaN(self.rate) === false) {
            msText.textContent =
              "Repaint rate: " + self.rate.toFixed(2) + "/sec";
          }
          lastTime = stop;
        },
        rate: function() {
          return self.rate;
        }
      };
    };

    var renderRate = new RenderRate();
    document.body.appendChild(renderRate.domElement);

    return {
      memoryStats: stats,
      renderRate: renderRate
    };
  })();

//The MIT License (MIT)
// Copyright (c) 2017 Brian Woodward
// https://github.com/doowb/sma/blob/master/LICENSE

// simple moving average
function sma(arr, range, format) {
  if (!Array.isArray(arr)) {
    throw TypeError("expected first argument to be an array");
  }

  var num = range || arr.length;
  var res = [];
  var len = arr.length + 1;
  var idx = num - 1;
  while (++idx < len) {
    res.push(avg(arr, idx, num));
  }
  return res;
}

function avg(arr, idx, range) {
  return sum(arr.slice(idx - range, idx)) / range;
}

function sum(arr) {
  var len = arr.length;
  var num = 0;
  while (len--) num += Number(arr[len]);
  return num;
}
