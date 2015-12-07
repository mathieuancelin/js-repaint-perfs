/** @jsx spreadH */
'use strict';

/* RotorJS Implementation
   Written by Alexander Kurakin
   For RotorJS, see https://github.com/kuraga/rotorjs
*/

class DbmonApplication extends rotorjs.Application {

  constructor(rootElement) {
    super(rootElement);
  }

  start() {
    let dbmon = new DbmonComponent(this, null, 'dbmon');
    super.start(dbmon, 'dbmon');
  }

  stop() {
    super.stop();
  }
}

class DbmonComponent extends rotorjs.Component {

  constructor(application, parent, name) {
    let initialState = {
      databases: []
    };
    super(application, parent, name, initialState);
  }

  activate() {
     super.activate();

     this.loadSamples();
  }

  deactivate() {
     super.deactivate();
  }

  loadSamples() {
     this.state.set('databases', ENV.generateData().toArray());
     Monitoring.renderRate.ping();
     setTimeout(this.loadSamples.bind(this), ENV.timeout);
  }

  render() {
    return (
      <div>
        <table className="table table-striped latest-data">
          <tbody>
            {
              this.state.databases.map((database) => (
                <tr key={database.dbname}>
                  <td className="dbname">
                    {database.dbname}
                  </td>
                  <td className="query-count">
                    <span className={database.lastSample.countClassName}>
                      {database.lastSample.nbQueries}
                    </span>
                  </td>
                  {
                    database.lastSample.topFiveQueries.map((query) => (
                      <td className={"Query " + query.elapsedClassName}>
                        {query.formatElapsed}
                        <div className="popover left">
                          <div className="popover-content">{query.query}</div>
                          <div className="arrow"/>
                        </div>
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }

}

let application, rootElement;

window.onload = () => {
  rootElement = document.getElementById('dbmon');
  application = new DbmonApplication(rootElement);
  application.start();
};

window.onunload = () => {
  application.stop();
};

// Dirty fix, see https://github.com/Matt-Esch/virtual-dom/pull/297/files
var spreadH = function spreadH(tagName, properties, ...children) {
  return Object.prototype.toString.call(children[0]) === '[object Array]'
    ? virtualDom.h(tagName, properties, children[0])
    : virtualDom.h(tagName, properties, children);
}
