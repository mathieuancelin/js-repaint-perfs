/** @jsx spreadH */
'use strict';

/* RotorJS Implementation
   Written by Alexander Kurakin
   For RotorJS, see https://github.com/kuraga/rotorjs
*/

var _temporalUndefined = {};

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var middleware = _temporalUndefined;

var DbmonApplication = _temporalUndefined;
var DbmonComponent = _temporalUndefined;

var application = _temporalUndefined,
    rootElement = _temporalUndefined;

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

middleware = {
  Cursor: rotorjsMiddlewares.Cursor_FreezerJs,
  Loop: rotorjsMiddlewares.Loop_VirtualDom,
  Trie: rotorjsMiddlewares.Trie_RouteTrie
};

var _rotorjs$getRotorJsClasses = rotorjs.getRotorJsClasses(_temporalAssertDefined(middleware, 'middleware', _temporalUndefined) && middleware);

var Application = _rotorjs$getRotorJsClasses.Application;
var Component = _rotorjs$getRotorJsClasses.Component;
var RouterComponent = _rotorjs$getRotorJsClasses.RouterComponent;

DbmonApplication = (function (_Application) {
  _inherits(_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication, _Application);

  function DbmonApplication() {
    _classCallCheck(this, _temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication);

    _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication).prototype), 'constructor', this).call(this);
  }

  _createClass(_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication, [{
    key: 'start',
    value: function start() {
      var dbmon = _temporalUndefined;

      dbmon = new (_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent)(this, null, 'dbmon');
      _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication).prototype), 'start', this).call(this, _temporalAssertDefined(dbmon, 'dbmon', _temporalUndefined) && dbmon);
    }
  }, {
    key: 'stop',
    value: function stop() {
      _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication).prototype), 'stop', this).call(this);
    }
  }]);

  return _temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication;
})(_temporalAssertDefined(Application, 'Application', _temporalUndefined) && Application);

DbmonComponent = (function (_Component) {
  _inherits(_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent, _Component);

  function DbmonComponent(application, parent, name) {
    var initialState = _temporalUndefined;

    _classCallCheck(this, _temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent);

    initialState = {
      databases: []
    };
    _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent).prototype), 'constructor', this).call(this, application, parent, name, _temporalAssertDefined(initialState, 'initialState', _temporalUndefined) && initialState);
  }

  _createClass(_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent, [{
    key: 'activate',
    value: function activate() {
      _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent).prototype), 'activate', this).call(this);

      this.loadSamples();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      _get(Object.getPrototypeOf((_temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent).prototype), 'deactivate', this).call(this);
    }
  }, {
    key: 'loadSamples',
    value: function loadSamples() {
      this.state.set('databases', ENV.generateData().toArray());
      Monitoring.renderRate.ping();
      setTimeout(this.loadSamples.bind(this), ENV.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      return spreadH(
        'div',
        null,
        spreadH(
          'table',
          { className: 'table table-striped latest-data' },
          spreadH(
            'tbody',
            null,
            this.state.databases.map(function (database) {
              return spreadH(
                'tr',
                { key: database.dbname },
                spreadH(
                  'td',
                  { className: 'dbname' },
                  database.dbname
                ),
                spreadH(
                  'td',
                  { className: 'query-count' },
                  spreadH(
                    'span',
                    { className: database.lastSample.countClassName },
                    database.lastSample.nbQueries
                  )
                ),
                database.lastSample.topFiveQueries.map(function (query) {
                  return spreadH(
                    'td',
                    { className: "Query " + query.elapsedClassName },
                    query.formatElapsed,
                    spreadH(
                      'div',
                      { className: 'popover left' },
                      spreadH(
                        'div',
                        { className: 'popover-content' },
                        query.query
                      ),
                      spreadH('div', { className: 'arrow' })
                    )
                  );
                })
              );
            })
          )
        )
      );
    }
  }]);

  return _temporalAssertDefined(DbmonComponent, 'DbmonComponent', _temporalUndefined) && DbmonComponent;
})(_temporalAssertDefined(Component, 'Component', _temporalUndefined) && Component);

application = undefined;
rootElement = undefined;
window.onload = function () {
  _temporalAssertDefined(_temporalAssertDefined(application, 'application', _temporalUndefined) && application, 'application', _temporalUndefined);

  application = new (_temporalAssertDefined(_temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication, 'DbmonApplication', _temporalUndefined) && _temporalAssertDefined(DbmonApplication, 'DbmonApplication', _temporalUndefined) && DbmonApplication)();

  (_temporalAssertDefined(application, 'application', _temporalUndefined) && application).start();

  _temporalAssertDefined(_temporalAssertDefined(rootElement, 'rootElement', _temporalUndefined) && rootElement, 'rootElement', _temporalUndefined);

  rootElement = document.getElementById('dbmon');

  (_temporalAssertDefined(rootElement, 'rootElement', _temporalUndefined) && rootElement).appendChild((_temporalAssertDefined(application, 'application', _temporalUndefined) && application).target);
};

window.onunload = function () {
  (_temporalAssertDefined(application, 'application', _temporalUndefined) && application).stop();

  (_temporalAssertDefined(rootElement, 'rootElement', _temporalUndefined) && rootElement).removeChild((_temporalAssertDefined(application, 'application', _temporalUndefined) && application).target);
};

// Dirty fix, see https://github.com/Matt-Esch/virtual-dom/pull/297/files
var spreadH = function spreadH(tagName, properties) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return Object.prototype.toString.call(children[0]) === '[object Array]' ? virtualDom.h(tagName, properties, children[0]) : virtualDom.h(tagName, properties, children);
};
