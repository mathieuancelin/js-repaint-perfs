$(function() {
  domvm.view.config({useRaf: false});

  function DBMonView() {
    return function(vm, data) {
      return ["div",
        ["table", { class: "table table-striped latest-data" },
          ["tbody",
            data.map(function(db) {
              return ["tr",
                ["td", { class: "dbname" }, db.dbname],
                ["td", { class: "query-count" },
                  ["span", { class: db.lastSample.countClassName }, db.lastSample.nbQueries]
                ],
                db.lastSample.topFiveQueries.map(function(query) {
                  return ["td", { class: "Query " + query.elapsedClassName },
                    ["span", query.formatElapsed],
                    ["div", { class: "popover left" },
                      ["div", { class: "popover-content" }, query.query],
                      ["div", { class: "arrow" }]
                    ]
                  ];
                })
              ];
            })
          ]
        ]
      ];
    }
  }

  function getData() {
    return ENV.generateData().toArray();
  }

  function update() {
    Monitoring.renderRate.ping();
    view.update(getData());
    setTimeout(update, ENV.timeout);
  };

  var view = domvm.view(DBMonView, getData(), false).mount(document.getElementById("app"));

  update();
});