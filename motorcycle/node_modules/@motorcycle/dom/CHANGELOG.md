# v0.7.0 (2015-12-11)


## Bug Fixes

- **isolate:** fix adding of rendundant className
  ([e78e90f4](https://github.com/motorcyclejs/motorcycle-dom.git/commits/e78e90f482b13d4e038f0b4f38946a79d7faa837))
- **node:** Fix importing on node
  ([a843791b](https://github.com/motorcyclejs/motorcycle-dom.git/commits/a843791b6dcde4474ddb556b7944428e5706c5ec),
   [#21]([object Object]/21))
- **rootElem$:** revert rootElem$ to previous behavior
  ([09704ce3](https://github.com/motorcyclejs/motorcycle-dom.git/commits/09704ce31ee2fd6c38ebedfc61aa5a0fbd37f151))


## Features

- use new fromEvent() semantics
    ([99be9d2c](https://github.com/motorcyclejs/motorcycle-dom.git/commits/99be9d2cb628fd10baa67f9836ca7df0bbaecbc1),
     [#17]([object Object]/17))
- assume NodeList
    ([503652d7](https://github.com/motorcyclejs/motorcycle-dom.git/commits/503652d71d75d813da4be48e4a45cd64cd84cc9e),
     [#17]([object Object]/17))
- **fromEvent:** add check for NodeList
  ([08012333](https://github.com/motorcyclejs/motorcycle-dom.git/commits/08012333697f0479d2e8ad56d0ff94198ca011e7))


## Performance Improvements

- Remove Array.prototype.slice.call
  ([31ad84fc](https://github.com/motorcyclejs/motorcycle-dom.git/commits/31ad84fccb88ddb0c49b058360b3c3572f25935a))
- **isolate:** remove unneeded .trim()
  ([2f31c857](https://github.com/motorcyclejs/motorcycle-dom.git/commits/2f31c857c36d856fa94cdbb2b20e9756f7a1c585))


