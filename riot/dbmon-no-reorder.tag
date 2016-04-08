<dbmon>
  <div>
    <table class="table table-striped latest-data">
      <tbody>
        <!-- Database -->
        <tr each={ db in databasesArray } no-reorder>
          <td class="dbname">
            { db.dbname }
          </td>
          <!-- Sample -->
          <td class="query-count">
            <span class={ db.lastSample.countClassName }>
              { db.lastSample.nbQueries }
            </span>
          </td>
          <!-- Query -->
          <td each={ query in db.lastSample.topFiveQueries } no-reorder class={ query.elapsedClassName }>
            { query.formatElapsed }
            <div class="popover left">
              <div class="popover-content">
                { query.query }
              </div>
              <div class="arrow"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <script>

    this.databasesArray = []

    loadSamples() {
      this.databasesArray = ENV.generateData().toArray()
      this.update()
      Monitoring.renderRate.ping()
      setTimeout(this.loadSamples, ENV.timeout)
    }

    this.loadSamples()

  </script>
</dbmon>
