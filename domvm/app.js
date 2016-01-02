$(function() {
  // no cheating
  domvm.useRaf = false;

  function DBMonView(vm, dbmon) {
    dbmon.vm = vm;

    return {
      render: function(data) {
        return ["div", [
          ["table", { class: "table table-striped latest-data" }, [
            ["tbody",
              dbmon.data.map(function(db) {
                return ["tr", { key : db.dbname }, [
                  ["td", { class: "dbname" }, db.dbname],
                  ["td", { class: "query-count" }, [
                    ["span", { class: db.lastSample.countClassName }, db.lastSample.nbQueries]
                  ]],
                  db.lastSample.topFiveQueries.map(function(query) {
                    return ["td", { class: "Query " + query.elapsedClassName }, [
                      ["span", query.formatElapsed],
                      ["div", { class: "popover left" }, [
                        ["div", { class: "popover-content" }, query.query],
                        ["div", { class: "arrow" }, ""]
                      ]]
                    ]];
                  })
                ]];
              })
            ]
          ]]
        ]];
      }
    }
  }

  function DBMon() {
    this.data = [];

    this.update = function() {
      this.data = ENV.generateData().toArray();

      Monitoring.renderRate.ping();

      this.vm.redraw();

      setTimeout(this.update.bind(this), ENV.timeout);
    };
  }

  var dbmon = new DBMon();

  domvm(DBMonView, dbmon).mount(document.getElementById("app"));

  dbmon.update();
});