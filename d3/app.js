
(function () {
  var raf = requestAnimationFrame
    || msRequestAnimationFrame
    || mozRequestAnimationFrame
    || webkitRequestAnimationFrame
    || oRequestAnimationFrame
    || setTimeout;

  var table = d3.select('#dbmon table tbody');

  function row(selection, data) {
    var update = selection.selectAll('tr').data(data);
    var enter = update.enter();

    enter.append('tr')
      .html([
        '<td class="dbname"></td>',
        '<td class="query-count"><span></span></td>',
        '<td class="query"></td>',
        '<td class="query"></td>',
        '<td class="query"></td>',
        '<td class="query"></td>',
        '<td class="query"></td>'
      ].join(''));

    update.select('.dbname')
      .text(function (datum) {
        return datum.dbname;
      });

    update.select('.query-count span')
      .attr('class', function (datum) {
        return datum.lastSample.countClassName;
      })
      .text(function (datum) {
        return datum.lastSample.nbQueries;
      });

    update
      .each(function top5(data) {
        var update = d3.select(this).selectAll('.query').data(data.lastSample.topFiveQueries);
        var enter = update.enter();

        enter.append('td')
          .attr('class', 'query')

        update.text(function (datum) {
          return datum.formatElapsed;
        });
      });
  }

  raf(function frame() {
    table.call(row, ENV.generateData().toArray());

    Monitoring.renderRate.ping();

    raf(frame);
  })
})();
