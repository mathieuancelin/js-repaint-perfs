"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('js-repaint-perfs-ember/app', ['exports', 'ember', 'js-repaint-perfs-ember/resolver', 'ember-load-initializers', 'js-repaint-perfs-ember/config/environment'], function (exports, _ember, _jsRepaintPerfsEmberResolver, _emberLoadInitializers, _jsRepaintPerfsEmberConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _jsRepaintPerfsEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _jsRepaintPerfsEmberConfigEnvironment['default'].podModulePrefix,
    Resolver: _jsRepaintPerfsEmberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _jsRepaintPerfsEmberConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('js-repaint-perfs-ember/helpers/app-version', ['exports', 'ember', 'js-repaint-perfs-ember/config/environment'], function (exports, _ember, _jsRepaintPerfsEmberConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _jsRepaintPerfsEmberConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('js-repaint-perfs-ember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('js-repaint-perfs-ember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('js-repaint-perfs-ember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'js-repaint-perfs-ember/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _jsRepaintPerfsEmberConfigEnvironment) {
  var _config$APP = _jsRepaintPerfsEmberConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('js-repaint-perfs-ember/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('js-repaint-perfs-ember/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('js-repaint-perfs-ember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('js-repaint-perfs-ember/initializers/export-application-global', ['exports', 'ember', 'js-repaint-perfs-ember/config/environment'], function (exports, _ember, _jsRepaintPerfsEmberConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_jsRepaintPerfsEmberConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _jsRepaintPerfsEmberConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_jsRepaintPerfsEmberConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('js-repaint-perfs-ember/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('js-repaint-perfs-ember/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('js-repaint-perfs-ember/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("js-repaint-perfs-ember/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('js-repaint-perfs-ember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('js-repaint-perfs-ember/router', ['exports', 'ember', 'js-repaint-perfs-ember/config/environment'], function (exports, _ember, _jsRepaintPerfsEmberConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _jsRepaintPerfsEmberConfigEnvironment['default'].locationType,
    rootURL: _jsRepaintPerfsEmberConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('js-repaint-perfs-ember/routes/application', ['exports', 'ember', 'js-repaint-perfs-ember/utils/get-data'], function (exports, _ember, _jsRepaintPerfsEmberUtilsGetData) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return {
        databases: []
      };
    },

    afterModel: function afterModel() {
      this.loadSamples();
    },

    loadSamples: function loadSamples() {
      var model = this.modelFor('application');
      _ember['default'].set(model, 'databaseArray', (0, _jsRepaintPerfsEmberUtilsGetData['default'])());
      Monitoring.renderRate.ping(); // jshint ignore:line
      requestAnimationFrame(_ember['default'].run.bind(this, this.loadSamples));
    }
  });
});
define('js-repaint-perfs-ember/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("js-repaint-perfs-ember/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "f0eNU8fP", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-striped latest-data\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"databaseArray\"]]],[[\"key\"],[\"dbname\"]],1],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                    \"],[\"open-element\",\"td\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"Query \",[\"unknown\",[\"query\",\"className\"]]]]],[\"flush-element\"],[\"text\",\"\\n                        \"],[\"append\",[\"unknown\",[\"query\",\"formatElapsed\"]],false],[\"text\",\"\\n                        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"popover left\"],[\"flush-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"popover-content\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"query\",\"query\"]],false],[\"close-element\"],[\"text\",\"\\n                            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"arrow\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                        \"],[\"close-element\"],[\"text\",\"\\n                    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"query\"]},{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"dbname\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"append\",[\"unknown\",[\"db\",\"dbname\"]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"query-count\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"unknown\",[\"db\",\"lastSample\",\"countClassName\"]]]]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"unknown\",[\"db\",\"lastSample\",\"nbQueries\"]],false],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"db\",\"lastSample\",\"topFiveQueries\"]]],[[\"key\"],[\"@index\"]],0],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"db\"]}],\"hasPartials\":false}", "meta": { "moduleName": "js-repaint-perfs-ember/templates/application.hbs" } });
});
define("js-repaint-perfs-ember/utils/get-data", ["exports"], function (exports) {
  exports["default"] = getData;
  var ENV = window.ENV; // jshint ignore:line

  function getData() {
    return ENV.generateData().toArray();
  }
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('js-repaint-perfs-ember/config/environment', ['ember'], function(Ember) {
  var prefix = 'js-repaint-perfs-ember';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("js-repaint-perfs-ember/app")["default"].create({"name":"js-repaint-perfs-ember","version":"0.0.0+b36a2a3a"});
}

/* jshint ignore:end */
