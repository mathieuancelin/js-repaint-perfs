import { Database, Query } from './types'
import { VNode, div, span, table, tbody, td, tr } from '@motorcycle/mostly-dom'

const tableClassName = { className: 'table table-striped latest-data' }

export function view(databases: ReadonlyArray<Database>): VNode {
  return div([table(tableClassName, [tbody(databases.map(databaseView))])])
}

const dbnameClassname = { className: 'dbname' }
const queryCountClassName = { className: 'query-count' }

function databaseView(database: Database): VNode {
  const { dbname, lastSample: { countClassName, nbQueries, topFiveQueries } } = database

  return tr([
    td(dbnameClassname, dbname),
    td(queryCountClassName, [span({ className: countClassName }, nbQueries)]),
    ...topFiveQueries.map(queryView),
  ])
}

const popoverLeftClassName = { className: 'popover left' }
const popoverContentClassname = { className: 'popover-content' }
const arrowClassname = { className: 'arrow' }

function queryView(q: Query): VNode {
  const { elapsedClassName, formatElapsed, query } = q

  return td({ className: elapsedClassName }, [
    span(formatElapsed),
    div(popoverLeftClassName, [div(popoverContentClassname, query), div(arrowClassname)]),
  ])
}
