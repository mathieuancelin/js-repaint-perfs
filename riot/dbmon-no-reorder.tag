<dbmon>
  <div>
    <table class="table table-striped latest-data">
      <tbody>
        <!-- Database -->
        <tr each={ databasesArray } no-reorder>
          <td class="dbname">
            { dbname }
          </td>
          <!-- Sample -->
          <td class="query-count">
            <span class={ lastSample.countClassName }>
              { lastSample.nbQueries }
            </span>
          </td>
          <!-- Query -->
          <td each={ lastSample.topFiveQueries } no-reorder class={ elapsedClassName }>
            { formatElapsed }
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

    this.databasesArray = [];

    loadSamples() {
      Monitoring.renderRate.ping();
      this.update({ databasesArray: ENV.generateData().toArray() });
      setTimeout(function() { this.loadSamples(); }.bind(this), ENV.timeout);
    }

    this.loadSamples();

  </script>
</dbmon>