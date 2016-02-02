# v1.0.3 (2015-12-30)


# v1.0.2 (2015-12-30)


## Bug Fixes

- polyfill raf for snabbom
  ([eb17a5db](https://github.com/motorcyclejs/dom/commits/eb17a5dbd07573f5c0ad849518c6c0588396a4dd))


# v1.0.1 (2015-12-30)


# v1.0.0 (2015-12-30)


## Bug Fixes

- fix makeDomDriver import
    ([1f6347c4](https://github.com/motorcyclejs/dom/commits/1f6347c4e0a98fb2f9c11bbd3a1a167b0c4ffae6))
- remove unneeded test
    ([aef055dd](https://github.com/motorcyclejs/dom/commits/aef055ddc7217db30f1ab8675fa3110e39975689))
- rename `sink.type` to `sink.event`
    ([34d9705e](https://github.com/motorcyclejs/dom/commits/34d9705e7a85684c830223d5f0fe4d5e82b425ea))
- **events:** use standard event.target
  ([5c8b2313](https://github.com/motorcyclejs/dom/commits/5c8b231356389a11f002bef08f17e2026d60cf78))
- **isolate:** update isolation semantics
  ([08b69f0f](https://github.com/motorcyclejs/dom/commits/08b69f0f7ff174709fbe71f7acc6adc24cc7031d))
- **select:** fix isolateSource and isolateSink
  ([06bb35d2](https://github.com/motorcyclejs/dom/commits/06bb35d21a6808af0dbceb433057844282891ca7))
- **test:**
    - fix usage errors
    ([45372050](https://github.com/motorcyclejs/dom/commits/453720500f0de1854364a3b70bac209be9efe7b6))
    - remove unused sinon import
    ([7a349332](https://github.com/motorcyclejs/dom/commits/7a3493327fc9d3a5f88036207b165f9188bf3b7f))
- **thunks:** check for data.vnode
  ([21e5f572](https://github.com/motorcyclejs/dom/commits/21e5f5726182994f7bfb403dad423779f6ee6d93))
- **vTreeParser:** ignore previous child observable's value
  ([b788e889](https://github.com/motorcyclejs/dom/commits/b788e88913b76d4dff810cbcfbd2115f5d816dfd),
   [#46]([object Object]/46))


## Features

- **dom-driver:** reuse event listeners
  ([1a939735](https://github.com/motorcyclejs/dom/commits/1a9397357672d81fa7b295b3e2cf072ea9a534f8))
- **events:**
    - avoid recreating the same eventListener
    ([56cad782](https://github.com/motorcyclejs/dom/commits/56cad782233ca839f7a07bb6418efef73afcc6e9))
    - Switch to event delegation
    ([4c9ff0ff](https://github.com/motorcyclejs/dom/commits/4c9ff0ffdb32f688a1f74eab11c8267826d3b153))
- **fromEvent:** handle single DOM Nodes
  ([a8bd6fa4](https://github.com/motorcyclejs/dom/commits/a8bd6fa4faa79b5345f9a47882574f05d07d9bc9))
- **isolate:** add multicast
  ([db6c6f49](https://github.com/motorcyclejs/dom/commits/db6c6f49db39f27fc2fc041afed90fc76f82f830))
- **makeDOMDriver:**
    - throw error if modules is not an array
    ([11f2e35b](https://github.com/motorcyclejs/dom/commits/11f2e35bcbcdb0102fef28faeea4cae18d0004ae))
    - switch to options object
    ([33fc153f](https://github.com/motorcyclejs/dom/commits/33fc153faac90552b7e56ea3407d7278cd9000dd),
     [#57]([object Object]/57))
    - pass a stream of the rootElem to makeElementSelector
    ([17cb9d94](https://github.com/motorcyclejs/dom/commits/17cb9d943e1762ec56281af9c5127986c75a7519))
- **select:**
    - use event delegation
    ([770541ed](https://github.com/motorcyclejs/dom/commits/770541ed9a2c8085c003727bae62692cd635fad3))
    - rewrite DOM.select with snabbdom-selector
    ([8b231e41](https://github.com/motorcyclejs/dom/commits/8b231e4136a5a426d4741288c0a49bdd8d64a4bb))
- **thunk:** export thunk by default
  ([2e43834c](https://github.com/motorcyclejs/dom/commits/2e43834cfb0f20608de27d200a6f485872d5eb56))
- **vTreeParser:** Add support for a static vTree option
  ([89e2ba1c](https://github.com/motorcyclejs/dom/commits/89e2ba1cf059a48e6c3984b5de71f48a9e5bbfb9),
   [#59]([object Object]/59))
- **wrapVnode:** wrap top-evel vnode
  ([dbbca443](https://github.com/motorcyclejs/dom/commits/dbbca4435f0fd2867b5d5ea01e76b6d4e9894cbf),
   [#8]([object Object]/8))


## Breaking Changes

- due to [b30c209a](https://github.com/motorcyclejs/dom/commits/b30c209aef43e8fcc01e267990663034d571f69d),
 

  before:
    import {makeDomDriver} from '@motorcycle/dom'

  after:
    import {makeDOMDriver} from '@motorcyce/core'

- **select:** due to [8b231e41](https://github.com/motorcyclejs/dom/commits/8b231e4136a5a426d4741288c0a49bdd8d64a4bb),
 
  Before:
    DOM.select(selector) used document.querySelector() under the hood
    for ease of use and for it's substanstially more robust css selector
    engine.

  After:
    DOM.selector(selector) now uses snabbdom-selector to match css selectors
    from the virtual DOM tree for the speed of avoiding the baggage of the DOM.

References #4

- **wrapVnode:** due to [dbbca443](https://github.com/motorcyclejs/dom/commits/dbbca4435f0fd2867b5d5ea01e76b6d4e9894cbf),
 

  Before:
    Patching: h('h1', {}, 'Hello')
    to: <div id='example'></div>
    rendered: <h1>Hello</h1>

  After:
   Patching: h('h1', {}, 'Hello')
   to: <div id='example'></div>
   renders: <div id='example><h1>Hello</h1></div>

Closes #8



# v0.7.0 (2015-12-11)


## Bug Fixes

- **isolate:** fix adding of rendundant className
  ([e78e90f4](https://github.com/motorcyclejs/dom/commits/e78e90f482b13d4e038f0b4f38946a79d7faa837))
- **node:** Fix importing on node
  ([a843791b](https://github.com/motorcyclejs/dom/commits/a843791b6dcde4474ddb556b7944428e5706c5ec),
   [#21](https://github.com/motorcyclejs/dom/issues/21))
- **rootElem$:** revert rootElem$ to previous behavior
  ([09704ce3](https://github.com/motorcyclejs/dom/commits/09704ce31ee2fd6c38ebedfc61aa5a0fbd37f151))


## Features

- use new fromEvent() semantics
    ([99be9d2c](https://github.com/motorcyclejs/dom/commits/99be9d2cb628fd10baa67f9836ca7df0bbaecbc1),
     [#17](https://github.com/motorcyclejs/dom/issues/17))
- assume NodeList
    ([503652d7](https://github.com/motorcyclejs/dom/commits/503652d71d75d813da4be48e4a45cd64cd84cc9e),
     [#17](https://github.com/motorcyclejs/dom/issues/17))
- **fromEvent:** add check for NodeList
  ([08012333](https://github.com/motorcyclejs/dom/commits/08012333697f0479d2e8ad56d0ff94198ca011e7))


## Performance Improvements

- Remove Array.prototype.slice.call
  ([31ad84fc](https://github.com/motorcyclejs/dom/commits/31ad84fccb88ddb0c49b058360b3c3572f25935a))
- **isolate:** remove unneeded .trim()
  ([2f31c857](https://github.com/motorcyclejs/dom/commits/2f31c857c36d856fa94cdbb2b20e9756f7a1c585))


