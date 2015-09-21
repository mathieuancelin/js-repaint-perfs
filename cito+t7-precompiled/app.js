var rootNode = null;

function queries(query) {
  return {tag:"td",attrs:{"class":'Query '+query.elapsedClassName},children:[{tag:"span",attrs:{"class":"foo"},children:query.formatElapsed},{tag:"div",attrs:{"class":"popover left"},children:[{tag:"div",attrs:{"class":"popover-content"},children:query.query},{tag:"div",attrs:{"class": "arrow"},children:null}]}]};
};

function database(db) {
  return {tag:"tr",key:db.dbname,children:[{tag:"td",attrs:{"class":"dbname"},children:db.dbname},{tag:"td",attrs:{"class":"query-count"},children:{tag:"span",attrs:{"class":db.lastSample.countClassName},children:db.lastSample.nbQueries+""}},].concat(db.lastSample.topFiveQueries.map(queries))};
};

function loadSamples() {
  var dbs = ENV.generateData().toArray();
  var table = {tag:"table",attrs:{"class":"table table-striped latest-data"},children:{tag:"tbody",children:dbs.map(database)}};

  if(rootNode === null) {
    rootNode = cito.vdom.append(document.getElementById("app"), table);
  } else {
    cito.vdom.update(rootNode, table);
  }

  Monitoring.renderRate.ping();
  setTimeout(loadSamples, ENV.timeout);
};

$(function() {
  loadSamples();
});
