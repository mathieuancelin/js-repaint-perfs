var rootNode = null;

function queries(query) {
  return t7.precompile(['Query ' + query.elapsedClassName, query.formatElapsed, query.query, {template: __GHMJy,templateKey: 531865072, components: null}]);
};

function database(db) {
  return t7.precompile([db.dbname, db.dbname, db.lastSample.countClassName, db.lastSample.nbQueries, db.lastSample.topFiveQueries.map( queries), {template: __at0Ss,templateKey: -1593225952, components: null}]);
};

var appElem = document.getElementById("app");

function loadSamples() {
  var dbs = ENV.generateData().toArray();

  var table = t7.precompile([dbs.map( database ), {template: __plG5J,templateKey: 1075092587, components: null}]);

  Inferno.render(table, appElem);

  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
};

$(function() {
  loadSamples();
});

/*t7 precompiled templates*/
;function __GHMJy(__$props__, __$components__){return {tag: 'td',attrs: [{name:'class',value:Inferno.createValueNode(__$props__[0],0)}],children: [{tag: 'span',attrs: [{name:'class',value:'foo'}],children: Inferno.createValueNode(__$props__[1],1)},{tag: 'div',attrs: [{name:'class',value:'popover left'}],children: [{tag: 'div',attrs: [{name:'class',value:'popover-content'}],children: Inferno.createValueNode(__$props__[2],2)},{tag: 'div',attrs: [{name:'class',value:'arrow'}],children: []}]}]}};
;function __plG5J(__$props__, __$components__){return {tag: 'table',attrs: [{name:'class',value:'table table-striped latest-data'}],children: [{tag: 'tbody',attrs: [],children: Inferno.createValueNode(__$props__[0],0)}]}};
;function __at0Ss(__$props__, __$components__){return {tag: 'tr',attrs: [{name:'key',value:Inferno.createValueNode(__$props__[0],0)}],children: [{tag: 'td',attrs: [{name:'class',value:'dbname'}],children: Inferno.createValueNode(__$props__[1],1)},{tag: 'td',attrs: [{name:'class',value:'query-count'}],children: [{tag: 'span',attrs: [{name:'class',value:Inferno.createValueNode(__$props__[2],2)}],children: Inferno.createValueNode(__$props__[3],3)}]},Inferno.createValueNode(__$props__[4],4)]}};