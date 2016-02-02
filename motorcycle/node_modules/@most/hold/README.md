# @most hold()

Deliver the most recently seen event to each new observer the instant it begins observing.  A held stream is always multicast.

## Install

`npm install --save @most/hold`

## API

### hold :: Stream a &rarr; Stream a

Given an input stream:

```
stream:    -a---b---c---d->
```

observers which begin observing at different times will see:

```
observer1: -a---b---c---d->
observer2:    a-b---c---d->
observer3:           c--d->
```
