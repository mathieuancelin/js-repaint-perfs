# Most Subject [![Build Status](https://travis-ci.org/TylorS/most-subject.svg?branch=master)](https://travis-ci.org/TylorS/most-subject) [![npm version](https://badge.fury.io/js/most-subject.svg)](https://badge.fury.io/js/most-subject)

Subject and Subject-like interface to Most.js

# Usage

```js
import {subject} from 'most-subject'

const {sink, stream} = subject(1) // starts with initial value of 1

stream.forEach(x => console.log(x)) // 1, 2

sink.add(2) // Pushes 2 to stream
sink.error(new Error('Error Message')) // Send an error
sink.end() // End the stream
```

```js
import {holdSubject} from 'most-subject'

// create subject with buffersize of 4
// and an initial value of 1
const {observer, stream} = holdSubject(4, 1) // observer is an alias for sink

observer.next(2) // next is an alias for add()
observer.next(3)
observer.next(4)

stream.observe(x => console.log(x)) // 1, 2, 3, 4

observer.complete() // alias for end()
```


## API

#### **subject( [initialValue] )**

```js
import {subject} from 'most-subject'
```

**Arguments**

  - initialValue (optional) :: any - A value for the stream to start with

**Returns**

  - sink :: [Sink](#sink) - A sink to imperatively push to a stream
  - observer :: [Sink](#sink) - An alias to `sink` to more closely align with ES Observable specification.
  - stream :: most.Stream - The stream the sink/observer pushes to.

#### **holdSubject(bufferSize = 1 [, initialValue])**
```js
import {holdSubject} from 'most-subject'
```

**Arguments**

  - bufferSize (defaults to 1) :: Number - Size of the buffer which will store past values. These values will be replayed upon observation.

  - initialValue (optional) :: any - A value for the stream to start with

**Returns**

  - sink :: [Sink](#sink) - A sink to imperatively push to a stream
  - observer :: [Sink](#sink) - An alias to `sink` to more closely align with ES Observable specification.
  - stream :: most.Stream - The stream the sink/observer pushes to.


#### Sink

**Methods**

  - *add(value: any): void* - pushes a value to a sink's associated stream
  - *next(value: any): void* - alias for `add()`
  - *error(error: Error): void* - throws an error on a sink's associated stream and also ends the stream.
  - *end(value: any): void* - ends a sinks' associated stream with the specified end value
  - *complete(value: any): void* - alias for `end()`
