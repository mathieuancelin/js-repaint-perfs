import split from 'browser-split'

const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/
const notClassId = /^\.|#/

export default function selectorParser(selector = ``) {
  let tagName
  let id = ``
  let classes = []

  let tagParts = split(selector, classIdSplit)

  if (notClassId.test(tagParts[1]) || selector === ``) {
    tagName = `div`
  }

  let part
  let type
  let i

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i]

    if (!part) {
      continue
    }

    type = part.charAt(0)

    if (!tagName) {
      tagName = part
    } else if (type === `.`) {
      classes.push(part.substring(1, part.length))
    } else if (type === `#`) {
      id = part.substring(1, part.length)
    }
  }

  return {
    tagName,
    id,
    className: classes.join(` `),
  }
}
