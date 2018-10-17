import { html, Component } from "https://unpkg.com/@aaronshaf/totes@1/index.js";

const styles = html`
  <style>
    :host {
      position: relative;
      left: -100%;
      width: 100%;
    }
  
    .popover {
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ccc;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      right: 16px;
      max-width: 600px;
      padding: 1px;
      position: absolute;
      text-align: left;
      top: -32px;
      white-space: normal;
      z-index: 1010;
    }
  
    .popover>.arrow:after {
      border-width: 10px;
      content: "";
    }
  
    .popover.left {
      margin-left: -10px;
    }
  
    .popover.left>.arrow {
      border-right-width: 0;
      border-left-color: rgba(0, 0, 0, 0.25);
      margin-top: -11px;
      right: -11px;
      top: 50%;
    }
  
    .popover.left>.arrow:after {
      border-left-color: #fff;
      border-right-width: 0;
      bottom: -10px;
      content: " ";
      right: 1px;
    }
  
    .popover>.arrow {
      border-width: 11px;
    }
  
    .popover>.arrow,
    .popover>.arrow:after {
      border-color: transparent;
      border-style: solid;
      display: block;
      height: 0;
      position: absolute;
      width: 0;
    }
  
    .popover-content {
      padding: 9px 14px;
      white-space: nowrap;
    }
  </style>
`;

class Popover extends Component {
  static get observedProperties() {
    return ["query"];
  }
  constructor() {
    super();
    this.shadow = true;
  }
  render() {
    return html`
       ${styles}
      <div class="popover left">
        <div class="popover-content">${this.props.query}</div>
        <div class="arrow"></div>
      </div>`;
  }
}

customElements.define("dbmon-popover", Popover);
