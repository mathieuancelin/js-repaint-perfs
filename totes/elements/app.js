import { html, Component } from "https://unpkg.com/@aaronshaf/totes@1/index.js";
import "./database.js"; // <dbmon-database>

const styles = html`
  <style>
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
    }
  
    tbody>dbmon-database:nth-child(odd),
    tbody>dbmon-database:nth-child(odd) {
      background: #f9f9f9;
    }
  </style>
`;

class App extends Component {
  constructor() {
    super();
    this.shadow = true;
    this.state = {
      samples: []
    };
    this.loadDatabases();
  }

  loadDatabases() {
    this.setState({
      databases: ENV.generateData().toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(this.loadDatabases.bind(this), ENV.timeout);
  }

  render() {
    const databases = this.state.databases.map(database => {
      return html`<dbmon-database
        role="row"
        .lastMutationId=${database.lastMutationId}
        .dbname=${database.dbname}
        .samples=${database.samples}
        .lastSample=${database.lastSample}></dbmon-database>`;
    });
    return html`
       ${styles}
      <div>
        <table class="table table-striped latest-data">
          <tbody>
            ${databases}
          </tbody>
        </table>
      </div>`;
  }
}

customElements.define("dbmon-app", App);
