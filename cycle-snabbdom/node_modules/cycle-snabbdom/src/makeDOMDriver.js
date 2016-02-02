import {init} from 'snabbdom'
import h from 'snabbdom/h'
import classNameFromVNode from 'snabbdom-selector/lib/classNameFromVNode'
import selectorParser from 'snabbdom-selector/lib/selectorParser'

import {domSelectorParser} from './utils'
import defaultModules from './modules'
import {transposeVTree} from './transposition'
import {isolateSink, isolateSource} from './isolate'
import {makeElementSelector} from './select'
import {makeEventsSelector} from './events'

function makeVNodeWrapper(rootElement) {
  return function vNodeWrapper(vNode) {
    const {tagName: selectorTagName, id: selectorId} = selectorParser(vNode.sel)
    const vNodeClassName = classNameFromVNode(vNode)
    const {data: vNodeData = {}} = vNode
    const {props: vNodeDataProps = {}} = vNodeData
    const {id: vNodeId = selectorId} = vNodeDataProps

    const isVNodeAndRootElementIdentical =
      vNodeId === rootElement.id &&
      selectorTagName === rootElement.tagName &&
      vNodeClassName === rootElement.className

    if (isVNodeAndRootElementIdentical) {
      return vNode
    }

    const {tagName, id, className} = rootElement
    const elementId = id ? `#${id}` : ``
    const elementClassName = className ?
      `.${className.split(` `).join(`.`)}` : ``
    return h(`${tagName}${elementId}${elementClassName}`, {}, [vNode])
  }
}

function DOMDriverInputGuard(view$) {
  if (!view$ || typeof view$.subscribe !== `function`) {
    throw new Error(`The DOM driver function expects as input an ` +
      `Observable of virtual DOM elements`)
  }
}

function defaultOnErrorFn(msg) {
  if (console && console.error) {
    console.error(msg)
  } else {
    console.log(msg)
  }
}

const defaults = {
  modules: defaultModules,
  onError: defaultOnErrorFn,
}

function makeDOMDriver(container, {
  modules = defaultModules,
  onError = defaultOnErrorFn,
} = defaults) {
  const patch = init(modules)
  const rootElement = domSelectorParser(container)

  if (!Array.isArray(modules)) {
    throw new Error(`Optional modules option must be ` +
     `an array for snabbdom modules`)
  }

  if (typeof onError !== `function`) {
    throw new Error(`You provided an \`onError\` to makeDOMDriver but it was ` +
      `not a function. It should be a callback function to handle errors.`)
  }

  function DOMDriver(view$) {
    DOMDriverInputGuard(view$)

    const rootElement$ = view$
      .flatMapLatest(transposeVTree)
      .map(makeVNodeWrapper(rootElement))
      .scan(patch, rootElement)
      .map(({elm}) => elm)
      .doOnError(onError)
      .replay(null, 1)

    const disposable = rootElement$.connect()

    return {
      observable: rootElement$,
      namespace: [],
      select: makeElementSelector(rootElement$),
      events: makeEventsSelector(rootElement$),
      dispose: () => disposable.dispose(),
      isolateSink,
      isolateSource,
    }
  }

  return DOMDriver
}

export {makeDOMDriver}
