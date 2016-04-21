# @most/multicast

Efficient source sharing of an underlying stream to multiple observers.

## API

### multicast :: Stream a &rarr; Stream a
Returns a stream equivalent to the original, but which can be shared more efficiently among multiple consumers.

```
stream:             -a-b-c-d->
multicast(stream):  -a-b-c-d->
```

Using multicast allows you to build up a stream of maps, filters, and other transformations, and then share it efficiently with multiple observers.
