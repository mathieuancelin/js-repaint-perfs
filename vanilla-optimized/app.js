var lastDatabases = [];

var render = function () {

    function renderTable() {
        var html = '<table class="table table-striped latest-data"><tbody id="table">';
        html += renderRows();
        html +='</tbody></table>';

        return html;
    }

    function renderRows() {
        var html = '';
        for (var index = 0; index < databases.length; index++) {
            var db = databases[index];
            html += '<tr>' + renderRow(db) + '</tr>';
        }
        return html;
    }

    function renderRow(db) {
        var html = '<td class="dbname">' + db.dbname + '</td>';
        html += '<td class="query-count">';
        html += '<span class="' + db.lastSample.countClassName + '">' + db.lastSample.nbQueries + '</span></td>';

        for (var indexQ = 0; indexQ < db.lastSample.topFiveQueries.length; indexQ++) {
            var q = db.lastSample.topFiveQueries[indexQ];
            html += '<td class="' + q.elapsedClassName + '">';
            html +=     q.formatElapsed || '';
            html +=     '<div class="popover left">';
            html +=         '<div class="popover-content">';
            html +=             q.query || '';
            html +=         '</div>';
            html +=         '<div class="arrow"></div>';
            html +=     '</div>';
            html += '</td>';
        }
        return html;
    }

    var databases = ENV.generateData().toArray();

    if (lastDatabases.length !== databases.length) {
        document.getElementById("app").innerHTML = renderTable();
    } else {
        var table = document.getElementById("table");

        for (var index = 0; index < databases.length; index++) {
            var db = databases[index];
            var lastDb = lastDatabases[index];
            if (renderRow(db) !== renderRow(lastDb)) {
                table.children.item(index).innerHTML = renderRow(db);
            }
        }
    }


    lastDatabases = databases;

    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
};

render();
