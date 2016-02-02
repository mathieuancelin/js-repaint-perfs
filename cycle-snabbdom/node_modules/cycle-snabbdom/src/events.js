import {fromEvent} from './fromEvent'
import {makeIsStrictlyInRootScope} from './select'

let matchesSelector
try {
  matchesSelector = require(`matches-selector`)
} catch (e) {
  matchesSelector = () => {}
}

const eventTypesThatDontBubble = [
  `load`,
  `unload`,
  `focus`,
  `blur`,
  `mouseenter`,
  `mouseleave`,
  `submit`,
  `change`,
  `reset`,
]

function maybeMutateEventPropagationAttributes(event) {
  if (!event.hasOwnProperty(`propagationHasBeenStopped`)) {
    event.propagationHasBeenStopped = false
    const oldStopPropagation = event.stopPropagation
    event.stopPropagation = function stopPropagation() {
      oldStopPropagation.call(this)
      this.propagationHasBeenStopped = true
    }
  }
}

function mutateEventCurrentTarget(event, currentTargetElement) {
  try {
    Object.defineProperty(event, `currentTarget`, {
      value: currentTargetElement,
      configurable: true,
    })
  } catch (err) {
    console.log(`please use event.ownerTarget`)
  }
  event.ownerTarget = currentTargetElement
}

function makeSimulateBubbling(namespace, rootEl) {
  const isStrictlyInRootScope = makeIsStrictlyInRootScope(namespace)
  const descendantSel = namespace.join(` `)
  const topSel = namespace.join(``)
  const roof = rootEl.parentElement

  return function simulateBubbling(ev) {
    maybeMutateEventPropagationAttributes(ev)
    if (ev.propagationHasBeenStopped) {
      return false
    }
    for (let el = ev.target; el && el !== roof; el = el.parentElement) {
      if (!isStrictlyInRootScope(el)) {
        continue
      }
      if (matchesSelector(el, descendantSel) || matchesSelector(el, topSel)) {
        mutateEventCurrentTarget(ev, el)
        return true
      }
    }
    return false
  }
}

const defaults = {
  useCapture: false,
}

function makeEventsSelector(rootElement$, namespace) {
  return function eventsSelector(type, options = defaults) {
    if (typeof type !== `string`) {
      throw new Error(`DOM driver's events() expects argument to be a ` +
        `string representing the event type to listen for.`)
    }
    let useCapture = false
    if (eventTypesThatDontBubble.indexOf(type) !== -1) {
      useCapture = true
    }
    if (typeof options.useCapture === `boolean`) {
      useCapture = options.useCapture
    }

    return rootElement$
      .first()
      .flatMapLatest(rootElement => {
        if (!namespace || namespace.length === 0) {
          return fromEvent(rootElement, type, useCapture)
        }
        const simulateBubbling = makeSimulateBubbling(namespace, rootElement)
        return fromEvent(rootElement, type, useCapture)
          .filter(simulateBubbling)
      })
      .share()
  }
}

export {makeEventsSelector}
