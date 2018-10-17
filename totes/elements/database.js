import { html, Component } from "https://unpkg.com/@aaronshaf/totes@1/index.js";
import "./query.js"; // <dbmon-query>

const styles = html`
  <style>
    :host {
      display: table-row;
    }
  
    td {
      border-top: 1px solid #ddd;
      line-height: 1.42857143;
      padding: 8px;
      vertical-align: top;
    }
  
    .label {
      border-radius: .25em;
      color: #fff;
      display: inline;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      padding: .2em .6em .3em;
      text-align: center;
      vertical-align: baseline;
      white-space: nowrap;
    }
  
    .label-success {
      background-color: #5cb85c;
    }
  
    .label-warning {
      background-color: #f0ad4e;
    }
  </style>
`;

class Database extends Component {
  static get observedProperties() {
    return ["lastMutationId", "dbname", "samples", "lastSample"];
  }
  constructor() {
    super();
    this.shadow = true;
  }
  render() {
    const queries = this.props.lastSample.topFiveQueries.map(query => {
      return html`<dbmon-query
        role="cell"
        .query=${query.query}
        .elapsed=${query.elapsed}
        .formatElapsed=${query.formatElapsed}
        .elapsedClassName=${query.elapsedClassName}></dbmon-query>`;
    });
    return html`
       ${styles}
      <td class="dbname">
        ${this.props.dbname}
      </td>
      <td class="query-count">
        <span class=${this.props.lastSample.countClassName}>
          ${this.props.lastSample.nbQueries}
        </span>
      </td>
      ${queries}`;
  }
}

customElements.define("dbmon-database", Database);
