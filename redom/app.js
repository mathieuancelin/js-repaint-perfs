/* global ENV, redom, Monitoring */
'use strict'

;(function () {
  var el = redom.el
  var mount = redom.mount
  var List = redom.List

  function Cell (initData, data, index) {
    if (index === 0) {
      this.el = el('td.dbname')
    } else if (index === 1) {
      this.el = el('td.queryCount',
        this.count = el('span')
      )
    } else {
      this.el = el('td',
        this.span = el('span'),
        el('div.popover.left',
          this.popover = el('div.popover-content'),
          el('div.arrow')
        )
      )
    }
  }

  Cell.prototype.update = function (data, index) {
    if (index === 0) {
      this.el.textContent = data
    } else if (index === 1) {
      this.count.textContent = data[0]
      this.count.className = data[1]
    } else {
      this.el.className = data.elapsedClassName
      this.span.textContent = data.formatElapsed
      this.popover.textContent = data.query
    }
  }

  function Row () {
    this.list = new List('tr', Cell)
    this.el = this.list.el
  }

  Row.prototype.update = function (db) {
    this.list.update(
      [
        db.dbname,
        [ db.lastSample.nbQueries, db.lastSample.countClassName ]
      ].concat(db.lastSample.topFiveQueries)
    )
  }

  function Table () {
    this.el = el('div',
      el('table.table.table-striped.latest-data',
        this.rows = new List('tbody', Row)
      )
    )
  }

  Table.prototype.update = function (data) {
    this.rows.update(data)
  }

  function update () {
    var data = ENV.generateData().toArray()

    Monitoring.renderRate.ping()
    table.update(data)

    setTimeout(function () {
      update()
    }, ENV.timeout)
  }

  var table = new Table()

  update()
  mount(document.getElementById('app'), table)
})()
