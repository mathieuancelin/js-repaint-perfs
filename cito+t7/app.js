var rootNode = null;

function queries(query) {
  return t7`
    <td class="${ 'Query ' + query.elapsedClassName }">
      <span class="foo">${ query.formatElapsed }</span>
      <div class="popover left">
        <div class="popover-content">${ query.query }</div>
        <div class="arrow"></div>
      </div>
    </td>
  `
};

function database(db) {
  return t7`
    <tr key="${ db.dbname }">

      <td class="dbname">
        ${ db.dbname }
      </td>

      <td class="query-count">
        <span class="${ db.lastSample.countClassName }">
          ${ db.lastSample.nbQueries }
        </span>
      </td>

      ${ db.lastSample.topFiveQueries.map( queries) }

    </tr>
  `;
};

function loadSamples() {
  var dbs = ENV.generateData().toArray();

  var table = t7`
    <table class="table table-striped latest-data">
      <tbody>
        ${ dbs.map( database )}
      </tbody>
    </table>
  `;

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
