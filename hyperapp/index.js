'div,span,table,tbody,tr,td'.split(',').map(function(tag) {
  window[tag] = hyperapp.h.bind(null, tag);
});

hyperapp.app(
  {
    state: { rows: [] },
    view: state =>
      div(
        {},
        table(
          { class: 'table table-striped latest-data' },
          tbody(
            {},
            state.rows.map(row =>
              tr(
                { key: row.dbname },
                td({ class: 'dbname' }, [row.dbname]),
                td(
                  { class: 'query-count' },
                  span(
                    { class: row.lastSample.countClassName },
                    row.lastSample.nbQueries
                  )
                ),
                row.lastSample.topFiveQueries.map(query =>
                  td(
                    { class: query.elapsedClassName },
                    query.formatElapsed,
                    div(
                      { class: 'popover left' },
                      div(
                        { class: 'popover-content' },
                        query.query,
                        div({ class: 'arrow' })
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),
    actions: {
      generate: () => ({
        rows: ENV.generateData().toArray(Monitoring.renderRate.ping())
      })
    },
    init(state, actions) {
      setInterval(actions.generate, ENV.timeout);
    }
  },
  document.getElementById('app')
);
