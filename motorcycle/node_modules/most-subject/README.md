# Most Subject

An Rx.Subject-like interface for Most.js

# Usage

```js
import subject from 'most-subject'

const {sink, stream} = subject()

stream.forEach(x => console.log(x))

sink.add(1) // Pushes 1 to stream
sink.error(new Error('Error Message')) // Send an error
sink.end() // End the stream
```
