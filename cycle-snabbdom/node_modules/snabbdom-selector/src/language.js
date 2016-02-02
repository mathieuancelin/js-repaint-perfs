import cssauron from 'cssauron'
import selectorParser from './selectorParser'
import classNameFromVNode from './classNameFromVNode'

function LanguageSpecification() {}

LanguageSpecification.prototype.tag = function tag(vNode) {
  return selectorParser(vNode.sel).tagName
}

LanguageSpecification.prototype.class = function klass(vNode) {
  return classNameFromVNode(vNode)
}

LanguageSpecification.prototype.id = function id(vNode) {
  if (vNode.data && vNode.data.props && vNode.data.props.id) {
    return vNode.data.props.id
  }
  return selectorParser(vNode.sel).id
}

LanguageSpecification.prototype.children = function children(vNode) {
  return vNode.children || []
}

LanguageSpecification.prototype.parent = function parent(vNode) {
  return vNode.parent || vNode
}

LanguageSpecification.prototype.contents = function contents(vNode) {
  return vNode.text
}

LanguageSpecification.prototype.attr = function attributes(vNode, attr) {
  if (vNode.data) {
    const {attrs = {}, props = {}} = vNode.data
    if (attrs[attr]) {
      return attrs[attr]
    }
    if (props[attr]) {
      return props[attr]
    }
  }
}

const language = cssauron(new LanguageSpecification())

export default language
