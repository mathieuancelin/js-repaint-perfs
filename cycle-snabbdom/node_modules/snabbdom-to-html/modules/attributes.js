
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')
var union = require('lodash.union')

var parseSelector = require('../parse-selector')

// data.attrs, data.props, data.class

module.exports = function attributes (vnode) {
  var selector = parseSelector(vnode.sel)
  var parsedClasses = selector.className.split(' ')

  var attributes = []
  var classes = []
  var values = {}

  if (selector.id) {
    values.id = selector.id
  }

  setAttributes(vnode.data.props, values)
  setAttributes(vnode.data.attrs, values) // `attrs` override `props`, not sure if this is good so

  if (vnode.data.class) {
    // Omit `className` attribute if `class` is set on vnode
    values.class = undefined
  }
  forOwn(vnode.data.class, function (value, key) {
    if (value === true) {
      classes.push(key)
    }
  })
  classes = union(classes, values.class, parsedClasses).filter(x => x !== '')

  if (classes.length) {
    values.class = classes.join(' ')
  }

  forOwn(values, function (value, key) {
    attributes.push(value === true ? key : `${key}="${escape(value)}"`)
  })

  return attributes.length ? attributes.join(' ') : ''
}

function setAttributes (values, target) {
  forOwn(values, function (value, key) {
    if (key === 'htmlFor') {
      target['for'] = value
      return
    }
    if (key === 'className') {
      target['class'] = value.split(' ')
      return
    }
    target[key] = value
  })
}
