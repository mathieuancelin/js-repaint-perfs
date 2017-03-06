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
        var popoverDiv = document.createElement('div');
        var popoverContent = document.createElement('div');
        var popover = document.createTextNode(q.query || '');
        var arrow = document.createElement('div');

        query.className = q.elapsedClassName;
        popoverDiv.className = 'popover left';
        popoverContent.className = 'popover-content';
        arrow.className = 'arrow';

        row.appendChild(query);
        query.appendChild(elapsed);
        query.appendChild(popoverDiv);
        popoverDiv.appendChild(popoverContent);
        popoverContent.appendChild(popover);
        popoverDiv.appendChild(arrow);
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
        var dbrow = document.createElement('td');
        var dbname = document.createTextNode(db.dbname);
        var lastSampleRow = document.createElement('td');
        var lastSampleSpan = document.createElement('span');
        var lastSample = document.createTextNode(db.lastSample.nbQueries);
        var top5 = [];

        dbrow.className = 'dbname';
        lastSampleRow.className = 'query-count';
        lastSampleSpan.className = db.lastSample.countClassName;

        tbody.appendChild(row);
        row.appendChild(dbrow);
        dbrow.appendChild(dbname);
        row.appendChild(lastSampleRow);
        lastSampleRow.appendChild(lastSampleSpan);
        lastSampleSpan.appendChild(lastSample);
        
        for (var i = 0; i < db.lastSample.topFiveQueries.length; i++) {
            buildQuery(row, top5, db.lastSample.topFiveQueries[i]);
        }
        
        nodes.push({
            dbname: dbname,
            lastSample: lastSample,
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
            node.dbname.nodeValue = current.dbname;
        }

        if (last.lastSample.countClassName !== current.lastSample.countClassName) {
            node.lastSample.className = current.lastSample.countClassName;
        }

        if (last.lastSample.nbQueries !== current.lastSample.nbQueries) {
            node.lastSample.nodeValue = current.lastSample.nbQueries;
        }

        for (var i = 0; i < node.top5.length; i++) {
            var child = node.top5[i];
            var lastQ = last.lastSample.topFiveQueries[i];
            var currentQ = current.lastSample.topFiveQueries[i];

            if (lastQ.elapsedClassName !== currentQ.elapsedClassName) {
                child.query.className = currentQ.elapsedClassName;
            }

            if (lastQ.formatElapsed !== currentQ.formatElapsed) {
                child.elapsed.nodeValue = currentQ.formatElapsed || '';
            }

            if (lastQ.query !== currentQ.query) {
                child.popover.nodeValue = currentQ.query || '';
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
    }

    var frameRequested = false;
    var timeoutHit = false;

    function throttleAnimation() {
        if (timeoutHit) {
            timeoutHit = false;
            refresh();
        } else {
            frameRequested = true;
        }
        requestAnimationFrame(throttleAnimation);
    }

    function throttleTimeout() {
        if (frameRequested) {
            frameRequested = false;
            refresh();
        } else {
            timeoutHit = true;
        }
        setTimeout(throttleTimeout, ENV.timeout);
    }

    function simpleSchedule() {
        refresh();
        setTimeout(simpleSchedule, ENV.timeout);
    }

    Monitoring.renderRate.ping();

    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(throttleAnimation);
        setTimeout(throttleTimeout, ENV.timeout);
    } else {
        setTimeout(simpleSchedule, ENV.timeout);
    }
})();
