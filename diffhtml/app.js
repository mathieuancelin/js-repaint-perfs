const element = document.querySelector('#dbmon tbody');
const cached = _.template(`
  <% databases.map(function(database) { %>
    <tr>
      <td class="dbname">
        <%= database.dbname %>
      </td>
      <td class="query-count">
        <span class="<%= database.lastSample.countClassName %>">
          <%= database.lastSample.nbQueries %>
        </span>
      </td>
      <% database.lastSample.topFiveQueries.map(function(sample) { %>
        <td class="Query <%= sample.elapsedClassName %>">
          <%= sample.formatElapsed %>
          <div class="popover left">
            <div class="popover-content"><%- sample.query %></div>
            <div class="arrow"></div>
          </div>
        </td>
      <% }); %>
    </tr>
  <% }); %>
`);

function template(databases) {
  return cached({ databases });
}

function render() {
  var databases = ENV.generateData().toArray();
  Monitoring.renderRate.ping();

  setTimeout(render, ENV.timeout);

  diff.innerHTML(element, template(databases));
}

render();
