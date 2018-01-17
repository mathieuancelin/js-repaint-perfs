export class DbMon {
    constructor() {
        this.databases = [];
    }
    loadSamples() {
        this.databases = ENV.generateData().toArray();
        Monitoring.renderRate.ping();
        setTimeout(() => {
            this.loadSamples();
        }, ENV.timeout);
    }
    componentDidLoad() {
        this.loadSamples();
    }
    render() {
        return (h("div", null,
            h("table", { class: "table table-striped latest-data" },
                h("tbody", null, this.databases.map(database => {
                    return (h("tr", null,
                        h("td", { class: "dbname" }, database.dbname),
                        h("td", { class: "query-count" },
                            h("span", { class: database.lastSample.countClassName }, database.lastSample.nbQueries)),
                        database.lastSample.topFiveQueries.map(query => {
                            return (h("td", { class: 'Query ' + query.elapsedClassName },
                                query.formatElapsed,
                                h("div", { class: "popover left" },
                                    h("div", { class: "popover-content" }, query.query),
                                    h("div", { class: "arrow" }))));
                        })));
                })))));
    }
    static get is() { return "db-mon"; }
    static get properties() { return { "databases": { "state": true } }; }
}
