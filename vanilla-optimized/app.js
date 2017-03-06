;(function () {
    var nodes = [];
    var lastDatabases = generate();

    // <td class="{{elapsedClassName}}">
    //   {{formatElapsed}}
    //   <div class="popover left">
    //     <div class="popover-content">{{query}}</div>
    //     <div class="arrow"></div>
    //   </div>
    // </td>
    function buildQuery(row, top5, q) {
        var query = document.createElement('td');
        var elapsed = document.createTextNode(q.formatElapsed || '');
        var popover = document.createElement('div');
        var popoverContent = document.createElement('div');
        var arrow = document.createElement('div');

        query.className = q.elapsedClassName;
        popover.className = 'popover left';
        popoverContent.className = 'popover-content';
        arrow.className = 'arrow';

        row.appendChild(query);
        query.appendChild(elapsed);
        query.appendChild(popover);
        popover.appendChild(popoverContent);
        popoverContent.textContent = q.query || '';
        popover.appendChild(arrow);
        top5.push({
            query: query,
            elapsed: elapsed,
            popover: popoverContent
        });
    }

    // <tr>
    //   <td class="dbname">{{dbname}}</td>
    //   <td class="query-count">
    //     <span class="{{lastSample.countClassName}}">{{lastSample.nbQueries}}</span>
    //   </td>
    //   {{queries...}}
    // </table>
    function buildRow(tbody, db) {
        var row = document.createElement('tr');
        var dbname = document.createElement('td');
        var lastSample = document.createElement('td');
        var lastSampleSpan = document.createElement('span');
        var top5 = [];

        dbname.className = 'dbname';
        lastSample.className = 'query-count';
        lastSampleSpan.className = db.lastSample.countClassName;

        tbody.appendChild(row);
        row.appendChild(dbname);
        dbname.textContent = db.dbname;
        row.appendChild(lastSample);
        lastSample.appendChild(lastSampleSpan);
        lastSampleSpan.textContent = db.lastSample.nbQueries;
        
        for (var i = 0; i < db.lastSample.topFiveQueries.length; i++) {
            buildQuery(row, top5, db.lastSample.topFiveQueries[i]);
        }
        
        nodes.push({
            dbname: dbname,
            lastSample: lastSampleSpan,
            top5: top5
        });
    }

    // <table class="table table-striped latest-data">
    //   <tbody>
    //     {{rows...}}
    //   </tbody>
    // </table>
    function generate() {
        var databases = ENV.generateData().toArray();
        var app = document.getElementById('app');
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        table.className = 'table table-striped latest-data';

        while (app.firstChild) app.removeChild(app.firstChild);
        app.appendChild(table);
        table.appendChild(tbody);

        for (var i = 0; i < databases.length; i++) {
            buildRow(tbody, databases[i]);
        }

        return databases;
    }
    
    function patchRow(node, last, current) {
        if (last.dbname !== current.dbname) {
            node.dbname.textContext = current.dbname;
        }

        if (last.lastSample.countClassName !== current.lastSample.countClassName) {
            node.lastSample.className = current.lastSample.countClassName;
        }

        if (last.lastSample.nbQueries !== current.lastSample.nbQueries) {
            node.lastSample.textContent = current.lastSample.nbQueries
        }

        for (var i = 0; i < node.top5.length; i++) {
            var child = node.top5[i];
            var lastQ = last.lastSample.topFiveQueries[i];
            var currentQ = current.lastSample.topFiveQueries[i];

            if (lastQ.elapsedClassName !== currentQ.elapsedClassName) {
                child.query.className = currentQ.elapsedClassName;
            }

            if (lastQ.formatElapsed !== currentQ.formatElapsed) {
                child.elapsed.nodeValue = currentQ.formatElapsed;
            }

            if (lastQ.query !== currentQ.query) {
                child.popover.textContent = currentQ.query;
            }
        }
    }

    function refresh() {
        var databases = ENV.generateData().toArray();

        for (var i = 0; i < databases.length; i++) {
            patchRow(nodes[i], lastDatabases[i], databases[i]);
        }

        lastDatabases = databases;
        Monitoring.renderRate.ping();
        setTimeout(refresh, ENV.timeout);
    }
    
    Monitoring.renderRate.ping();
    setTimeout(refresh, ENV.timeout);
})();
