import { html, Component } from "https://unpkg.com/@aaronshaf/totes@1/index.js";
import "./popover.js"; // <dbmon-popover>

const styles = html`
  <style>
    :host {
      display: table-cell;
      border-top: 1px solid #ddd;
      line-height: 1.42857143;
      padding: 8px;
      vertical-align: top;
      position: relative;
    }
  
    dbmon-popover {
      display: none;
    }
  
    :host(:hover) dbmon-popover {
      display: block;
    }
  </style>
`;

class Query extends Component {
  static get observedProperties() {
    return ["query", "elapsed", "formatElapsed", "elapsedClassName"];
  }
  constructor() {
    super();
    this.shadow = true;
  }
  render() {
    this.className = "Query " + this.props.elapsedClassName;
    return html`
       ${styles} ${this.props.formatElapsed || " "}
      <dbmon-popover .query=${this.props.query}></dbmon-popover>`;
  }
}

customElements.define("dbmon-query", Query);
