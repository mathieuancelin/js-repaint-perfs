import Rx from 'rx'
import toHTML from 'snabbdom-to-html'
import {transposeVTree} from './transposition'

function makeBogusSelect() {
  return function select() {
    return {
      observable: Rx.Observable.empty(),
      events() {
        return Rx.Observable.empty()
      },
    }
  }
}

function makeHTMLDriver() {
  return function htmlDriver(vtree$) {
    let output$ = vtree$.flatMapLatest(transposeVTree).last().map(toHTML)
    output$.select = makeBogusSelect()
    return output$
  }
}

export {makeHTMLDriver}
