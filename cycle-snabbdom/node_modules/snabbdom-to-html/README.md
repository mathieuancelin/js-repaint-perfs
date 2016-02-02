# Snabbdom to HTML

Render [Snabbdom](https://github.com/paldepind/snabbdom) Vnode’s to HTML strings

## Install

With [`npm`](https://www.npmjs.com/) do:

```bash
npm install snabbdom-to-html
```

## Usage

```js
var h = require('snabbdom/h')
var toHTML = require('snabbdom-to-html')

var output = toHTML(
  h('div', { style: { color: 'red' } }, 'The quick brown fox jumps')
)

console.log(output)
// => <div style="color: red">The quick brown fox jumps</div>
```

### Advanced usage

This library is built replicating the modular approach used in Snabbdom. So you can do the following if you need to implement any custom functionality.

```js
var h = require('snabbdom/h')

var init = require('snabbdom-to-html/init')
var toHTML = init([
  require('snabbdom-to-html/modules/attributes'),
  require('snabbdom-to-html/modules/style')
])

var output = toHTML(
  h('div', { style: { color: 'lime' } }, 'over the lazy fox')
)

console.log(output)
// => <div style="color: lime">over the lazy fox</div>
```

The `init` function accepts an array of functions (modules). Modules have the following signature: `(vnode) => String`. And this output string represents a part of the HTML opening tag, e.g. `class="foo" data-bar="baz"`.

The built-in modules are:

#### attributes (`snabbdom-to-html/modules/attributes`)

Takes care of attributes (and `props`), including classes.

#### styles (`snabbdom-to-html/modules/style`)

Yes, takes care of styles.

## License

MIT
