<dbmon>
  <div>
    <table class="table table-striped latest-data">
      <tbody>
        <!-- Database -->
        <tr each={ databasesArray }>
          <td class="dbname">
            { name }
          </td>
          <!-- Sample -->
          <td class="query-count">
            <span class={ lastSample.countClassName }>
              { lastSample.queries.length }
            </span>
          </td>
          <!-- Query -->
          <td each={ lastSample.topFiveQueries } class={ elapsedClassName }>
            { elapsed }
            <div class="popover left">
              <div class="popover-content">
                { query }
              </div>
              <div class="arrow"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <script>

    this.databases = {};
    this.databasesArray = [];
    this.loadCount = 0;
    getData() {
      // generate some dummy data
      var data = {
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

      function formatElapsed(value) {
        if (!value) return '';
        var str = parseFloat(value).toFixed(2);
        if (value > 60) {
          var minutes = Math.floor(value / 60);
          var comps = (value % 60).toFixed(2).split('.');
          var seconds = comps[0].lpad('0', 2);
          var ms = comps[1];
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
            elapsed: formatElapsed(Math.random() * 15),
            elapsedClassName: getElapsedClassName(this.elapsed),
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

    loadSamples() {
      this.loadCount++;
      var newData = this.getData();
      
      Object.keys(newData.databases).forEach(function(dbname) {

        var sampleInfo = newData.databases[dbname];

        if (!this.databases[dbname]) {
          this.databases[dbname] = {
            name: dbname,
            samples: []
          }
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

        function topFiveQueries(queries) {
          var tfq = queries.slice(0, 5);
          while (tfq.length < 5) {
            tfq.push({ query: "" });
          }
          return tfq;
        }

        var samples = this.databases[dbname].samples;
        samples.push({
          time: newData.start_at,
          queries: sampleInfo.queries,
          topFiveQueries: topFiveQueries(sampleInfo.queries),
          countClassName: countClassName(sampleInfo.queries) 
        });
        if (samples.length > 5) {
          samples.splice(0, samples.length - 5);
        }
        this.databases[dbname].lastSample = this.databases[dbname].samples[this.databases[dbname].samples.length - 1];
      }.bind(this));
      renderRate.ping();
      this.update({ databasesArray: Object.keys(this.databases).map(function(k) { return this.databases[k]; }.bind(this)) });
      setTimeout(function() { this.loadSamples(); }.bind(this), ENV.timeout);
    }

    if (!String.prototype.lpad) {
      String.prototype.lpad = function (padding, toLength) {
        return padding.repeat((toLength - this.length) / padding.length).concat(this);
      };
    }

    this.loadSamples();
  </script>

</dbmon>