# Motorcycle.js DOM Driver [![Build Status](https://travis-ci.org/motorcyclejs/dom.svg?branch=develop)](https://travis-ci.org/motorcyclejs/dom)
[![Motorcycle.js](https://img.shields.io/badge/Motorcycle.js-compatible-brightgreen.svg)](https://github.com/motorcyclejs)[![isolate](https://img.shields.io/badge/isolate-compatible-brightgreen.svg)](https://github.com/cyclejs/isolate)

The Standard DOM Driver for Motorcycle. Built using [Snabbdom](https://github.com/paldepind/snabbdom) for it's modularity and it's faster *virtual-dom* implementation. This library exports the fantastic [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) library for ease-of-use.

## Installing
```
$ npm install @motorcycle/dom
```

## Want to Contribute?

If you found an issue or want to contribute code, please read
the [contributing guidelines](https://github.com/motorcyclejs/motorcycle/blob/master/CONTRIBUTING.md).

## Examples
Basic usage

```js

import most from 'most'
import {run} from '@motorcycle/core'
import {makeDOMDriver, h} from '@motorcycle/dom'

function main(sources) {
  ...
  return {
    DOM: view$,
  }
}

run(main, {
  DOM: makeDOMDriver('#app')
})
```

More examples can be found [here](https://github.com/motorcyclejs/examples).

## API

### makeDOMDriver(container, modules)

###### Arguments

**container** :: Element|CSS-Selector - A DOM node or a CSS-Selector which points to an existing DOM node that will be used as the initial place to patch the DOM.

**modules** :: Array - An array of [Snabbdom modules](https://github.com/paldepind/snabbdom#creating-modules) which will be used by Snabbdom to add/remove behaviors that are available to you from the `h()` or `hyperscript-helpers` functions.

```js
import {makeDOMDriver} from '@motorcycle/dom'

makeDOMDriver('#app')
// or
makeDOMDriver(document.querySelector('#app'))

/* with modules */
/* these are the default modules used */
makeDOMDriver('#app', [
  require(`snabbdom/modules/class`),
  require(`snabbdom/modules/props`),
  require(`snabbdom/modules/attributes`),
  require(`snabbdom/modules/style`),
])
```

### h(selector, data, children)

###### Importing
```js
import {h} from '@motorcycle/dom'
```

For more information on how to use `h()`, please refer to the [original documentation](https://github.com/paldepind/snabbdom#snabbdomh).

### hyperscript-helpers

###### Importing
```js
import {div, h1, p} from '@motorcycle/dom'
```

For more information on [how to use hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers#how-to-use).
