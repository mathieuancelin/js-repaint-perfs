# Most Subject [![Build Status](https://travis-ci.org/TylorS/most-subject.svg?branch=master)](https://travis-ci.org/TylorS/most-subject) [![npm version](https://badge.fury.io/js/most-subject.svg)](https://badge.fury.io/js/most-subject)

Subject and Subject-like interface to Most.js

# API

## holdSubject(bufferSize = 1[, initialValue])

[src/index.js:25-31](https://github.com/tylors/most-subject/tree/master/src/index.js#L25-L31 "Source code on GitHub")

Creates a subject that replays past events that a new observer may have missed.

**Parameters**

-   `bufferSize` **integer** [= 1] - how many values to keep buffered.
    Must be an integer 1 or greater.
-   `initialValue` **any** an initialValue to start with

**Examples**

```javascript
import {holdSubject} from 'most-subject'

// will keep 4 items buffered with an initialValue of 1
const {observer, stream} = holdSubject(4, 1)

observer.next(2)
observer.next(3)
observer.next(4)

stream.observe(x => console.log(x)) // 1 , 2 , 3, 4 , 5

observer.next(5)
observer.complete()
```

Returns [**Subject**](#subject-1)

## subject()

[src/index.js:21-23](https://github.com/tylors/most-subject/tree/master/src/index.js#L21-L23 "Source code on GitHub")

Creates a basic Subject

**Examples**

```javascript
import {subject} from 'most-subject'

const {observer, stream} = subject()

stream.observe(x => console.log(x)) // 1 , 2 , 3

observer.next(1)
observer.next(2)
observer.next(3)
observer.complete()
```

Returns [**Subject**](#subject-1)

## Subject

A Subject is simply an object with the following properties

**Properties**

-   `observer` [**Observer**](#observer)
-   `stream` **most.Stream** A most.js Stream instance

## Observer

An Observer

**Properties**

-   `next` **Function&lt;any&gt;** pushes a new value to the underlying Stream
-   `error` **Function&lt;Error&gt;** pushes a new Error to and ends
    the underlying Stream
-   `complete` **Function&lt;Any&gt;** ends the underlying Stream
