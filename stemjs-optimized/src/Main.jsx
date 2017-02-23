import {UI} from "UIBase";
import {NOOP_FUNCTION} from "base/Utils";

UI.Element.prototype.addListenersFromOptions = NOOP_FUNCTION;
UI.Element.prototype.applyNodeAttributes = function () {
    if (this.options.className) {
        this.node.className = this.options.className;
    } else if (this.node.className) {
        this.node.removeAttribute("class");
    }
};

class BenchmarkElement extends UI.Element {
    renderDatabase(database) {
        let databaseTopFiveQueries = [];

        for (let queryIndex = 0; queryIndex < database.lastSample.topFiveQueries.length; ++queryIndex) {
            let query = database.lastSample.topFiveQueries[queryIndex];
            databaseTopFiveQueries.push(
                <td className={query.elapsedClassName}>
                    {query.formatElapsed}
                    {new UI.Element({className:"popover left", children: [query.query]})}
                    {new UI.Element({className:"arrow"})}
                </td>
            );
        }

        return [
            <tr>
                <td className="dbname">{database.dbname}</td>
                <td>
                    <span className={database.lastSample.countClassName}>{database.lastSample.nbQueries}</span>
                </td>
                {databaseTopFiveQueries}
            </tr>
        ];
    }

    renderDatabases(databases) {
        let renderedDatabases = [];
        for (let index = 0; index < databases.length; ++index) {
            renderedDatabases.push(this.renderDatabase(databases[index]));
        }

        return renderedDatabases;
    }

    render() {
        let databases = ENV.generateData().toArray();

        return [
            <table className="table table-striped latest-data">
                <tbody>
                    {this.renderDatabases(databases)}
                </tbody>
            </table>
        ];
    }

    redraw() {
        super.redraw();
        Monitoring.renderRate.ping();
        setTimeout(() => this.redraw(), ENV.timeout);
    }
}

let node = document.getElementById("dbmon");
let benchmarkElement = new BenchmarkElement();
benchmarkElement.bindToNode(node, true);

