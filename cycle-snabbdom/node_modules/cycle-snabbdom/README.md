# cycle-snabbdom [![Build Status](https://travis-ci.org/TylorS/cycle-snabbdom.svg?branch=master)](https://travis-ci.org/TylorS/cycle-snabbdom)
Alternative DOM driver utilizing the [snabbdom](https://github.com/paldepind/snabbdom) library

# Install
```js
$ npm install cycle-snabbdom
```
## API

##### makeDOMDriver(container: string|Element, {modules?: Array<SnabbdomModules>})

```js
import {makeDOMDriver} from 'cycle-snabbdom'
```

##### makeHTMLDriver()
```js
import {makeHTMLDriver} from 'cycle-snabbdom'
```
##### h - thunk - hyperscript-helpers
Shorcuts to `snabbdom/h`, `snabbdom/thunk` and `hyperscript-helpers`
```js
import {h, thunk, div, span, h4} from 'cycle-snabbdom'
```

##### modules : Array<SnabbdomModules>

Shortcut to snabbdom modules.

```js
import Cycle from '@cycle/core'
import {modules, makeDOMDriver} from 'cycle-snabbdom'
const {
  StyleModule, PropsModule,
  AttrsModule, ClassModule,
  HeroModule, EventsModule,
} = modules
...

Cycle.run(main, {
  DOM: makeDOMDriver('#app', {modules: [
    StyleModule, PropsModule,
    AttrsModule, ClassModule,
    HeroModule, EventsModule
  ]})
})

```

##### mockDOMSource()
A testing utility which aids in creating a queryable collection of Observables. Call mockDOMSource giving it an object specifying selectors, eventTypes and their Observables, and get as output an object following the same format as the DOM Driver's source.

Example:
```js
const userEvents = mockDOMSource({
 '.foo': {
   'click': Rx.Observable.just({target: {}}),
   'mouseover': Rx.Observable.just({target: {}})
 },
 '.bar': {
   'scroll': Rx.Observable.just({target: {}})
 }
});

// Usage
const click$ = userEvents.select('.foo').events('click');
```
Arguments:

mockedSelectors :: Object an object where keys are selector strings and values are objects. Those nested objects have eventType strings as keys and values are Observables you created.
Return:

(Object) fake DOM source object, containing a function select() which can be used just like the DOM Driver's source. Call select(selector).events(eventType) on the source object to get the Observable you defined in the input of mockDOMSource.
