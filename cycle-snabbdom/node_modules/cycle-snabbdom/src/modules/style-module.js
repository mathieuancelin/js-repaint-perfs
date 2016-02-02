let raf
if (typeof window !== `undefined`) {
  raf = window && window.requestAnimationFrame || setTimeout
} else {
  raf = setTimeout
}

const nextFrame = fn => raf(() => raf(fn))

function setNextFrame(obj, prop, val) {
  nextFrame(() => {
    obj[prop] = val
  })
}
/* eslint-disable */
function updateStyle(oldVnode, vnode) {
  let cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style || {},
      style = vnode.data.style || {},
      oldHasDel = 'delayed' in oldStyle
  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = ''
    }
  }
  for (name in style) {
    cur = style[name]
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name]
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur)
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur
    }
  }
}

function applyDestroyStyle(vnode) {
  let style, name, elm = vnode.elm,
      s = vnode.data.style
  if (!s || !(style = s.destroy)) return
  for (name in style) {
    elm.style[name] = style[name]
  }
}

function applyRemoveStyle(vnode, rm) {
  let s = vnode.data.style
  if (!s || !s.remove) {
    rm()
    return
  }
  let name, elm = vnode.elm,
      idx, i = 0,
      maxDur = 0,
      compStyle, style = s.remove,
      amount = 0,
      applied = []
  for (name in style) {
    applied.push(name)
    elm.style[name] = style[name]
  }
  compStyle = getComputedStyle(elm)
  let props = compStyle['transition-property'].split(', ')
  for (; i < props.length; ++i) {
    if (applied.indexOf(props[i]) !== -1) amount++
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm)--amount
    if (amount === 0) rm()
  })
}
/* eslint-enable */

const StyleModule = {
  create: updateStyle,
  update: updateStyle,
  destroy: applyDestroyStyle,
  remove: applyRemoveStyle,
}

export {StyleModule}
