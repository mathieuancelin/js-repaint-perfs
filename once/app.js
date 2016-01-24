function dbmon(state){
  var o = once(this)
    ('table.table.table-striped.latest-data', 1)
      ('tbody', 1)
        ('tr', state.databases)
  
  o('td.dbname', 1)
    .text(d => d.dbname)
  
  o('td.query-count', d => d.lastSample)
    ('span', 1)
      .attr('class', d => d.countClassName)
      .text(d => d.nbQueries)
  
  o('td.Query', d => d.lastSample.topFiveQueries)
    .attr('class', d => d.elapsedClassName + ' Query')
    .text(d => d.formatElapsed)
      ('.popover.left', 1)
        ('.popover-content', 1)
          .text(d => d.query)
            ('.arrow', 1)
}

ix = setInterval(function main(){
  Monitoring.renderRate.ping()
  dbmon.call(app, { databases: ENV.generateData().toArray() })
}, ENV.timeout)