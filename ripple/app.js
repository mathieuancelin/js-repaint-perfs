function dbmon(state){
  var o = once(this)
    ('table.table.table-striped.latest-data', 1)
      ('tbody', 1)
        ('tr', state.databases)
  
  o('td.dbname', 1)
    .text(dbname)
  
  o('td.query-count', lastSample)
    ('span', 1)
      .attr('class', countClassName)
      .text(nbQueries)
  
  o('td.Query', topFiveQueries)
    .attr('class', elapsedClassName)
    .text(formatElapsed)
      ('.popover.left', 1)
        ('.popover-content', 1)
          .text(query)
            ('.arrow', 1)
}

ix = setInterval(function main(){
  Monitoring.renderRate.ping()
  ripple('databases', ENV.generateData().toArray())
}, ENV.timeout)

ripple('db-mon', dbmon)
app.innerHTML = '<db-mon data="databases">'

function dbname(d){
 return d.dbname 
}

function lastSample(d){
 return d.lastSample
}

function countClassName(d){
 return d.countClassName
}

function nbQueries(d){
 return d.nbQueries
}

function topFiveQueries(d){
 return d.lastSample.topFiveQueries
}

function elapsedClassName(d){
 return d.elapsedClassName + ' Query'
}

function formatElapsed(d){
 return d.formatElapsed
}

function query(d){
 return d.query
}
