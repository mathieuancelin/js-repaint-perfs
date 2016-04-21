'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.holdSubject = exports.subject = undefined;

var _most = require('most');

var _multicast = require('@most/multicast');

var _Observer = require('./Observer');

var _Replay = require('./Replay');

function create(hold, bufferSize, initialValue) {
  var observer = new _Observer.Observer();
  var stream = hold ? (0, _Replay.replay)(bufferSize, new _most.Stream(observer)) : new _most.Stream(new _multicast.MulticastSource(observer));

  stream.drain();

  if (typeof initialValue !== 'undefined') {
    observer.next(initialValue);
  }

  return { stream: stream, observer: observer };
}

function subject() {
  return create(false, 0);
}

function holdSubject() {
  var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
  var initialValue = arguments[1];

  if (bufferSize < 1) {
    throw new Error('First argument to holdSubject is expected to be an ' + 'integer greater than or equal to 1');
  }
  return create(true, bufferSize, initialValue);
}

exports.subject = subject;
exports.holdSubject = holdSubject;