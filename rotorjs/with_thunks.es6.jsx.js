/** @jsx spreadH */
'use strict';

/* RotorJS (with using VnodeImmutableThunk) Implementation
   Written by Alexander Kurakin
   For RotorJS, see https://github.com/kuraga/rotorjs
*/

let middleware = {
  Cursor: rotorjsMiddlewares.Cursor_FreezerJs,
  Loop: rotorjsMiddlewares.Loop_VirtualDom,
  Trie: rotorjsMiddlewares.Trie_RouteTrie
};

let {
  Application,
  Component,
  RouterComponent
} = rotorjs.getRotorJsClasses(middleware);

class DbmonApplication extends Application {

  constructor() {
    super();
  }

  start() {
    let dbmon = new DbmonComponent(this, null, 'dbmon');

    super.start(dbmon);
  }

  stop() {
    super.stop();
  }
}

function queryRenderer(query) {
  return (
    <td className={"Query " + query.elapsedClassName}>
      {query.formatElapsed}
      <div className="popover left">
        <div className="popover-content">{query.query}</div>
        <div className="arrow"/>
      </div>
    </td>
  );
}

function databaseRenderer(database) {
  return (
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
            vnodeImmutableThunk(queryRenderer.bind(this, query), [query.elapsedClassName, query.formatElapsed, query.query], null, null, true)
          ))
        }
    </tr>
  );
}

class DbmonComponent extends Component {

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
                vnodeImmutableThunk(databaseRenderer.bind(this, database), [database.lastMutationId], null, null, true)
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
  application = new DbmonApplication();
  application.start();

  rootElement = document.getElementById('dbmon');
  rootElement.appendChild(application.target);
};

window.onunload = () => {
  application.stop();

  rootElement.removeChild(application.target);
};

// Dirty fix, see https://github.com/Matt-Esch/virtual-dom/pull/297/files
var spreadH = function spreadH(tagName, properties, ...children) {
  return Object.prototype.toString.call(children[0]) === '[object Array]'
    ? virtualDom.h(tagName, properties, children[0])
    : virtualDom.h(tagName, properties, children);
}
