# Snabbdom Selector

## Install
```
$ npm install snabbdom-selector
```

## Basic Usage
```js
import select from 'snabbdom-selector'
import h from 'snabbdom/h'

const vnode = h('div', {}, [
  h('div.test', {}, [
    h('p', {key: 1}, 'Foo')
  ])
])

const matches = select('.test p', vnode)

console.log(matches)
// => [{sel: 'p', text: 'Foo', elm: HTMLElement, key: 1, children: undefined, data: {...}}]
```
