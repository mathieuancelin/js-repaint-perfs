$(function() {
  function DBMonView() {
    return function(vm, dbs) {
      return ["div",
        ["table.table.table-striped.latest-data",
          ["tbody",
            dbs.map(function(db) {
              return ["tr",
                ["td.dbname", db.dbname],
                ["td.query-count",
                  ["span", { class: db.lastSample.countClassName }, db.lastSample.nbQueries]
                ],
                db.lastSample.topFiveQueries.map(function(query) {
                  return ["td.Query", { class: query.elapsedClassName },
                    ["span", query.formatElapsed],
                    [".popover.left",
                      [".popover-content", query.query],
                      [".arrow"],
                    ]
                  ];
                })
              ];
            })
          ]
        ]
      ];
    };
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