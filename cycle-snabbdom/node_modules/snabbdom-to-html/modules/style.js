
var forOwn = require('lodash.forown')
var escape = require('lodash.escape')
var kebabCase = require('lodash.kebabcase')

// data.style

module.exports = function style (vnode) {
  var styles = []

  forOwn(vnode.data.style, function (value, key) {
    styles.push(`${kebabCase(key)}: ${escape(value)}`)
  })

  return styles.length ? `style="${styles.join('; ')}"` : ''
}
