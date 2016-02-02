import {makeEventsSelector} from './events'
import {isolateSource, isolateSink} from './isolate'

function makeIsStrictlyInRootScope(namespace) {
  const classIsForeign = (c) => {
    const matched = c.match(/cycle-scope-(\S+)/)
    return matched && namespace.indexOf(`.${c}`) === -1
  }
  const classIsDomestic = (c) => {
    const matched = c.match(/cycle-scope-(\S+)/)
    return matched && namespace.indexOf(`.${c}`) !== -1
  }
  return function isStrictlyInRootScope(leaf) {
    for (let el = leaf; el; el = el.parentElement) {
      const split = String.prototype.split
      const classList = el.classList || split.call(el.className, ` `)
      if (Array.prototype.some.call(classList, classIsDomestic)) {
        return true
      }
      if (Array.prototype.some.call(classList, classIsForeign)) {
        return false
      }
    }
    return true
  }
}

function makeElementSelector(rootElement$) {
  return function elementSelector(selector) {
    if (typeof selector !== `string`) {
      throw new Error(`DOM driver's select() expects the argument to be a ` +
        `string as a CSS selector`)
    }

    const namespace = this.namespace
    const trimmedSelector = selector.trim()
    const childNamespace = trimmedSelector === `:root` ?
      namespace :
      namespace.concat(trimmedSelector)
    const element$ = rootElement$.map(rootEl => {
      if (childNamespace.join(``) === ``) {
        return rootEl
      }
      let nodeList = rootEl.querySelectorAll(childNamespace.join(` `))
      if (nodeList.length === 0) {
        nodeList = rootEl.querySelectorAll(childNamespace.join(``))
      }
      const array = Array.prototype.slice.call(nodeList)
      return array.filter(makeIsStrictlyInRootScope(childNamespace))
    })
    return {
      observable: element$,
      namespace: childNamespace,
      select: makeElementSelector(rootElement$),
      events: makeEventsSelector(rootElement$, childNamespace),
      isolateSource,
      isolateSink,
    }
  }
}

export {makeElementSelector, makeIsStrictlyInRootScope}
