'use strict';

/* RotorJS Implementation
   Written by Alexander Kurakin
   For RotorJS, see https://github.com/kuraga/rotorjs
*/

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DbmonApplication = (function (_rotorjs$Application) {
  _inherits(DbmonApplication, _rotorjs$Application);

  function DbmonApplication(rootElement) {
    _classCallCheck(this, DbmonApplication);

    _get(Object.getPrototypeOf(DbmonApplication.prototype), 'constructor', this).call(this, rootElement);
  }

  _createClass(DbmonApplication, [{
    key: 'start',
    value: function start() {
      var dbmon = new DbmonComponent(this, null, 'dbmon');
      _get(Object.getPrototypeOf(DbmonApplication.prototype), 'start', this).call(this, dbmon, 'dbmon');
    }
  }, {
    key: 'stop',
    value: function stop() {
      _get(Object.getPrototypeOf(DbmonApplication.prototype), 'stop', this).call(this);
    }
  }]);

  return DbmonApplication;
})(rotorjs.Application);

var DbmonComponent = (function (_rotorjs$Component) {
  _inherits(DbmonComponent, _rotorjs$Component);

  function DbmonComponent(application, parent, name) {
    _classCallCheck(this, DbmonComponent);

    var initialState = {
      databases: []
    };
    _get(Object.getPrototypeOf(DbmonComponent.prototype), 'constructor', this).call(this, application, parent, name, initialState);
  }

  _createClass(DbmonComponent, [{
    key: 'activate',
    value: function activate() {
      _get(Object.getPrototypeOf(DbmonComponent.prototype), 'activate', this).call(this);

      this.loadSamples();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      _get(Object.getPrototypeOf(DbmonComponent.prototype), 'deactivate', this).call(this);
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

  return DbmonComponent;
})(rotorjs.Component);

var application = undefined,
    rootElement = undefined;

window.onload = function () {
  rootElement = document.getElementById('dbmon');
  application = new DbmonApplication(rootElement);
  application.start();
};

window.onunload = function () {
  application.stop();
};

// Dirty fix, see https://github.com/Matt-Esch/virtual-dom/pull/297/files
var spreadH = function spreadH(tagName, properties) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return Object.prototype.toString.call(children[0]) === '[object Array]' ? virtualDom.h(tagName, properties, children[0]) : virtualDom.h(tagName, properties, children);
};
