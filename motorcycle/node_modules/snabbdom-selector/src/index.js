import language from './language'

function traverse(vNode, fn) {
  fn(vNode)
  if (vNode.children) {
    vNode.children.forEach(child => {
      traverse(child, fn)
    })
  }
}

function wrapVNode(vNode, parent) {
  let {children} = vNode
  if (children && typeof children.map === `function`) {
    children = children.map(k => wrapVNode(k, vNode))
  }
  vNode.parent = parent
  return vNode
}

function match(sel, vNode) {
  const selector = language(sel)
  let matched = []

  let wrappedVNode = wrapVNode(vNode)

  traverse(wrappedVNode, node => {
    let result
    if (node.data && node.data.vnode) {
      result = selector(node.data.vnode)
    } else if (node.data && node.data.fn) {
      result = selector(node.data.fn(...node.data.args))
    } else {
      result = selector(node)
    }
    if (result) {
      if (!Array.isArray(result)) {
        result = [result]
      }
      matched.push.apply(matched, result)
    }
  })
  return matched
}

export default match
