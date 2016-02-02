import selectorParser from './selectorParser'

export default function classNameFromVNode(vNode) {
  let {className: cn} = selectorParser(vNode.sel)

  if (!vNode.data) {
    return cn
  }

  const {class: dataClass, props} = vNode.data

  if (dataClass) {
    const c = Object.keys(vNode.data.class)
      .filter(cl => vNode.data.class[cl])
    cn += ` ${c.join(` `)}`
  }

  if (props && props.className) {
    cn += ` ${props.className}`
  }

  return cn.trim()
}
