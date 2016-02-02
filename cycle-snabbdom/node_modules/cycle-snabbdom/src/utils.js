const SCOPE_PREFIX = `cycle-scope-`

const isElement =
  obj => typeof HTMLElement === `object` ?
    obj instanceof HTMLElement || obj instanceof DocumentFragment :
    obj && typeof obj === `object` && obj !== null &&
    (obj.nodeType === 1 || obj.nodeType === 11) &&
    typeof obj.nodeName === `string`

const domSelectorParser =
  selectors => {
    const domElement =
      typeof selectors === `string` ?
        document.querySelector(selectors) :
        selectors

    if (typeof domElement === `string` && domElement === null) {
      throw new Error(`Cannot render into unknown element \`${selectors}\``)
    } else if (!isElement(domElement)) {
      throw new Error(`Given container is not a DOM element neither a ` +
        `selector string.`)
    }
    return domElement
  }

export {domSelectorParser, SCOPE_PREFIX}
