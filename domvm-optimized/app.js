$(function() {
  var h = (tag, arg1, arg2) => domvm.defineElement(tag, arg1, arg2, domvm.FIXED_BODY),
      v = domvm.defineView;

  function DBMonView() {
    return (vm, dbs) =>
      h("div", [
        h("table.table.table-striped.latest-data", [
          h("tbody", dbs.map(db =>
            v(DB, db, false)
          ))
        ])
      ])
  }

  function DB(vm) {
    vm.diff(db => [db.lastMutationId]);

    return (vm, db) =>
      h("tr", [
        h("td.dbname", db.dbname),
        h("td.query-count", [
          h("span", { class: db.lastSample.countClassName }, db.lastSample.nbQueries)
        ]),
      ].concat(db.lastSample.topFiveQueries.map(query =>
        v(Query, query, false)
      )));
  }

  function Query(vm) {
    vm.diff(query => [query, query.elapsed]);

    return (vm, query) =>
      h("td", { class: query.elapsedClassName }, [
        h("span", query.formatElapsed),
        h(".popover.left", [
          h(".popover-content", query.query),
          h(".arrow"),
        ])
      ]);
  }

  function getData() {
    return ENV.generateData().toArray();
  }

  function update() {
    Monitoring.renderRate.ping();
    view.update(getData());
    setTimeout(update, ENV.timeout);
  };

  var view = domvm.createView(DBMonView, getData(), false).mount(document.getElementById("app"));

  update();
});