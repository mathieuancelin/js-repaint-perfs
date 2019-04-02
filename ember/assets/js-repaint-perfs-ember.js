"use strict"
define("js-repaint-perfs-ember/app",["exports","js-repaint-perfs-ember/resolver","ember-load-initializers","js-repaint-perfs-ember/config/environment"],function(e,t,r,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,r.default)(a,n.default.modulePrefix)
var o=a
e.default=o}),define("js-repaint-perfs-ember/helpers/app-version",["exports","js-repaint-perfs-ember/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,r){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,o=n.versionOnly||n.hideSha,i=n.shaOnly||n.hideVersion,l=null
return o&&(n.showExtended&&(l=a.match(r.versionExtendedRegExp)),l||(l=a.match(r.versionRegExp))),i&&(l=a.match(r.shaRegExp)),l?l[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var a=Ember.Helper.helper(n)
e.default=a}),define("js-repaint-perfs-ember/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","js-repaint-perfs-ember/config/environment"],function(e,t,r){var n,a
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(n=r.default.APP.name,a=r.default.APP.version)
var o={name:"App Version",initialize:(0,t.default)(n,a)}
e.default=o}),define("js-repaint-perfs-ember/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r}),define("js-repaint-perfs-ember/initializers/export-application-global",["exports","js-repaint-perfs-ember/config/environment"],function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var n,a=t.default.exportApplicationGlobal
n="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),r[n]||(r[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var n={name:"export-application-global",initialize:r}
e.default=n}),define("js-repaint-perfs-ember/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r}),define("js-repaint-perfs-ember/router",["exports","js-repaint-perfs-ember/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map(function(){})
var n=r
e.default=n}),define("js-repaint-perfs-ember/routes/application",["exports","js-repaint-perfs-ember/utils/get-data"],function(e,t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function o(e,t,r){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=i(e)););return e}(e,t)
if(n){var a=Object.getOwnPropertyDescriptor(n,t)
return a.get?a.get.call(r):a.value}})(e,t,r||e)}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s=function(e){function r(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),a(this,i(r).apply(this,arguments))}var s,f,p
return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(r,Ember.Route),s=r,(f=[{key:"model",value:function(){return{databaseArray:[]}}},{key:"afterModel",value:function(){o(i(r.prototype),"afterModel",this).apply(this,arguments),this.loadSamples()}},{key:"loadSamples",value:function(){var e=this.modelFor("application")
Ember.set(e,"databaseArray",(0,t.default)()),window.Monitoring&&window.Monitoring.renderRate.ping(),requestAnimationFrame(Ember.run.bind(this,this.loadSamples))}}])&&n(s.prototype,f),p&&n(s,p),r}()
e.default=s}),define("js-repaint-perfs-ember/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"QsavmfFE",block:'{"symbols":["db","query"],"statements":[[7,"div"],[11,"class","ember-view"],[9],[0,"\\n  "],[7,"div"],[9],[0,"\\n    "],[7,"table"],[11,"class","table table-striped latest-data"],[9],[0,"\\n      "],[7,"tbody"],[9],[0,"\\n"],[4,"each",[[23,["model","databaseArray"]]],[["key"],["dbname"]],{"statements":[[0,"          "],[7,"tr"],[9],[0,"\\n            "],[7,"td"],[11,"class","dbname"],[9],[0,"\\n              "],[1,[22,1,["dbname"]],false],[0,"\\n            "],[10],[0,"\\n            "],[7,"td"],[11,"class","query-count"],[9],[0,"\\n              "],[7,"span"],[12,"class",[22,1,["lastSample","countClassName"]]],[9],[0,"\\n                "],[1,[22,1,["lastSample","nbQueries"]],false],[0,"\\n              "],[10],[0,"\\n            "],[10],[0,"\\n"],[4,"each",[[22,1,["lastSample","topFiveQueries"]]],[["key"],["@index"]],{"statements":[[0,"              "],[7,"td"],[12,"class",[28,["Query ",[22,2,["className"]]]]],[9],[0,"\\n                "],[1,[22,2,["formatElapsed"]],false],[0,"\\n                "],[7,"div"],[11,"class","popover left"],[9],[0,"\\n                  "],[7,"div"],[11,"class","popover-content"],[9],[1,[22,2,["query"]],false],[10],[0,"\\n                  "],[7,"div"],[11,"class","arrow"],[9],[10],[0,"\\n                "],[10],[0,"\\n              "],[10],[0,"\\n"]],"parameters":[2]},null],[0,"          "],[10],[0,"\\n"]],"parameters":[1]},null],[0,"      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"js-repaint-perfs-ember/templates/application.hbs"}})
e.default=t}),define("js-repaint-perfs-ember/utils/get-data",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){return t.generateData().toArray()}
var t=window.ENV}),define("js-repaint-perfs-ember/config/environment",[],function(){try{var e="js-repaint-perfs-ember/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("js-repaint-perfs-ember/app").default.create({name:"js-repaint-perfs-ember",version:"0.0.0+51ca228b"})
