"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tryEvent(sink, scheduler, event) {
  try {
    sink.event(scheduler.now(), event);
  } catch (err) {
    sink.error(scheduler.now(), err);
  }
}

function tryEnd(sink, scheduler, event) {
  try {
    sink.end(scheduler.now(), event);
  } catch (err) {
    sink.error(scheduler.now(), err);
  }
}

var Observer = function () {
  function Observer() {
    var _this = this;

    _classCallCheck(this, Observer);

    this.run = function (sink, scheduler) {
      return _this._run(sink, scheduler);
    };
    this.next = function (x) {
      return _this._next(x);
    };
    this.error = function (err) {
      return _this._error(err);
    };
    this.complete = function (x) {
      return _this._complete(x);
    };
  }

  _createClass(Observer, [{
    key: "_run",
    value: function _run(sink, scheduler) {
      this.sink = sink;
      this.scheduler = scheduler;
      this.active = true;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.active = false;
    }
  }, {
    key: "_next",
    value: function _next(value) {
      if (!this.active) {
        return;
      }
      tryEvent(this.sink, this.scheduler, value);
    }
  }, {
    key: "_error",
    value: function _error(err) {
      this.active = false;
      this.sink.error(this.scheduler.now(), err);
    }
  }, {
    key: "_complete",
    value: function _complete(value) {
      if (!this.active) {
        return;
      }
      this.active = false;
      tryEnd(this.sink, this.scheduler, value);
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;