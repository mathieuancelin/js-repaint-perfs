app({
    root: document.getElementById("app"),
    model: [],
    view: model =>
        h("div", {}, [
            h("table", { class: "table table-striped latest-data" }, [
                h("tbody", {}, model.map(db => h("tr", { key: db.dbname }, [
                    h("td", { class: "dbname" }, [db.dbname]),
                    h("td", { class: "query-count" }, [
                        h("span", { class: db.lastSample.countClassName }, [db.lastSample.nbQueries])
                    ]),
                    db.lastSample.topFiveQueries.map(query =>
                        h("td", { class: query.elapsedClassName }, [
                            query.formatElapsed,
                            h("div", { class: "popover left" }, [
                                h("div", { class: "popover-content" }, [query.query]),
                                h("div", { class: "arrow" })
                            ])
                        ]))
                ])))
            ])
        ]),
    update: {
        generate: _ => ENV.generateData().toArray(Monitoring.renderRate.ping())
    },
    subs: [
        (_, msg) => setInterval(msg.generate, ENV.timeout)
    ]
})
