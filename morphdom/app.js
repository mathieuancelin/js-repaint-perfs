var render = function () {

    var databases = ENV.generateData().toArray();

    var html = '<div><table class="table table-striped latest-data"><tbody>';
    for (var index = 0; index < databases.length; index++) {
        var db = databases[index];
        html += '<tr><td class="dbname">' + db.dbname + '</td>';
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
        html += '</tr>';
    }

    html += '</tbody></table></div>';

    var el = document.getElementById("app");
    morphdom(el, html, {childrenOnly: true});

    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
};

render();
