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
    
    function patchRow(changes, node, last, current) {
        if (last.dbname !== current.dbname) {
            changes.push({text: true, node: node.dbname, value: current.dbname});
        }

        if (last.lastSample.countClassName !== current.lastSample.countClassName) {
            changes.push({text: false, node: node.lastSample, value: current.lastSample.countClassName});
        }

        if (last.lastSample.nbQueries !== current.lastSample.nbQueries) {
            changes.push({text: true, node: node.lastSample, value: current.lastSample.nbQueries});
        }

        for (var i = 0; i < node.top5.length; i++) {
            var lastQ = last.lastSample.topFiveQueries[i];
            var currentQ = current.lastSample.topFiveQueries[i];

            if (lastQ.elapsedClassName !== currentQ.elapsedClassName) {{
                changes.push({text: false, node: node.top5[i].query, value: currentQ.elapsedClassName});
            }

            if (lastQ.formatElapsed !== currentQ.formatElapsed) {
                changes.push({text: true, node: node.top5[i].elapsed, value: currentQ.formatElapsed});
            }

            if (lastQ.query !== currentQ.query) {
                changes.push({text: true, node: node.top5[i].popover, value: currentQ.query});
            }
        }
    }

    function refresh() {
        // Set now, to not delay patching
        setTimeout(refresh, ENV.timeout);
        var changes = [];
        var databases = ENV.generateData().toArray();

        for (var i = 0; i < databases.length; i++) {
            patchRow(changes, nodes[i], lastDatabases[i], databases[i]);
        }

        for (var i = 0; i < changes.length; i++) {
            if (changes[i].text) {
                changes[i].node.textContent = changes[i].value
            } else {
                changes[i].node.className = changes[i].value
            }
        }

        lastDatabases = databases;
        Monitoring.renderRate.ping();
    }
    
    Monitoring.renderRate.ping();
    setTimeout(refresh, ENV.timeout);
})();
