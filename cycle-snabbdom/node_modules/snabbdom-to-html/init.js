
var parseSelector = require('./parse-selector')
var VOID_ELEMENTS = require('./void-elements')
var CONTAINER_ELEMENTS = require('./container-elements')

module.exports = function init (modules) {
  function parse (data) {
    return modules
      .reduce(function (arr, fn) {
        arr.push(fn(data))
        return arr
      }, [])
      .filter(function (result) {
        return result !== ''
      })
  }

  return function renderToString (vnode) {
    if (!vnode.sel && vnode.text) {
      return vnode.text
    }

    vnode.data = vnode.data || {}

    var tagName = parseSelector(vnode.sel).tagName
    var attributes = parse(vnode)
    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg'
    var tag = []

    // Open tag
    tag.push('<' + tagName)
    if (attributes.length) {
      tag.push(' ' + attributes.join(' '))
    }
    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /')
    }
    tag.push('>')

    // Close tag, if needed
    if ((VOID_ELEMENTS[tagName] !== true && !svg) ||
        (svg && CONTAINER_ELEMENTS[tagName] === true)) {
      if (vnode.text) {
        tag.push(vnode.text)
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child))
        })
      }
      tag.push(`</${tagName}>`)
    }

    return tag.join('')
  }
}
