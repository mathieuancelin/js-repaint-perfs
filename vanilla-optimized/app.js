;(function () {
    var lastDatabases = ENV.generateData().toArray();
    var nodes = [];
    var app = document.getElementById('app');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.className = 'table table-striped latest-data';
    tbody.id = 'table';
    while (app.firstChild) app.removeChild(app.firstChild);
    app.appendChild(table);
    table.appendChild(tbody);
    for (var i = 0; i < lastDatabases.length; i++) {
        renderRow(lastDatabases[i]);
    }
    
    function renderRow(db) {
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
        row.appendChild(lastSample);
        lastSample.appendChild(lastSampleSpan);
        dbname.textContent = db.dbname;
        lastSampleSpan.textContent = db.lastSample.nbQueries;
        
        for (var i = 0; i < db.lastSample.topFiveQueries.length; i++) {
            var q = db.lastSample.topFiveQueries[i];
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
        
        nodes.push({
            dbname: dbname,
            lastSample: lastSampleSpan,
            top5: top5
        });
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
                child.elapsed.textContent = currentQ.formatElapsed;
            }

            if (lastQ.query !== currentQ.query) {
                child.popoverContent.textContent = currentQ.query;
            }
        }
    }

    function render() {
        var databases = ENV.generateData().toArray();

        for (var i = 0; i < databases.length; i++) {
            patchRow(nodes[i], lastDatabases[i], databases[i]);
        }

        lastDatabases = databases;
        Monitoring.renderRate.ping();
        setTimeout(render, ENV.timeout);
    }
    
    Monitoring.renderRate.ping();
    setTimeout(render, ENV.timeout);
})();
