(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('@most/dom-event', ['exports', 'most'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('most'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.most);
        global.mostDomEvent = mod.exports;
    }
})(this, function (exports, _most) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.touchcancel = exports.touchmove = exports.touchend = exports.touchstart = exports.pointerleave = exports.pointerout = exports.pointerenter = exports.pointerover = exports.pointermove = exports.pointerup = exports.pointerdown = exports.unload = exports.load = exports.popstate = exports.hashchange = exports.error = exports.scroll = exports.resize = exports.contextmenu = exports.input = exports.keyup = exports.keypress = exports.keydown = exports.submit = exports.select = exports.change = exports.mouseleave = exports.mouseout = exports.mouseenter = exports.mouseover = exports.mousemove = exports.mouseup = exports.mousedown = exports.dblclick = exports.click = exports.focusout = exports.focusin = exports.focus = exports.blur = exports.domEvent = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var domEvent = function domEvent(event, node) {
        var capture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        return new _most.Stream(new DomEvent(event, node, capture));
    };

    var blur = function blur(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('blur', node, capture);
    };

    var focus = function focus(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focus', node, capture);
    };

    var focusin = function focusin(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focusin', node, capture);
    };

    var focusout = function focusout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('focusout', node, capture);
    };

    var click = function click(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('click', node, capture);
    };

    var dblclick = function dblclick(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('dblclick', node, capture);
    };

    var mousedown = function mousedown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mousedown', node, capture);
    };

    var mouseup = function mouseup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseup', node, capture);
    };

    var mousemove = function mousemove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mousemove', node, capture);
    };

    var mouseover = function mouseover(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseover', node, capture);
    };

    var mouseenter = function mouseenter(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseenter', node, capture);
    };

    var mouseout = function mouseout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseout', node, capture);
    };

    var mouseleave = function mouseleave(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('mouseleave', node, capture);
    };

    var change = function change(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('change', node, capture);
    };

    var select = function select(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('select', node, capture);
    };

    var submit = function submit(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('submit', node, capture);
    };

    var keydown = function keydown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keydown', node, capture);
    };

    var keypress = function keypress(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keypress', node, capture);
    };

    var keyup = function keyup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('keyup', node, capture);
    };

    var input = function input(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('input', node, capture);
    };

    var contextmenu = function contextmenu(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('contextmenu', node, capture);
    };

    var resize = function resize(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('resize', node, capture);
    };

    var scroll = function scroll(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('scroll', node, capture);
    };

    var error = function error(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('error', node, capture);
    };

    var hashchange = function hashchange(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('hashchange', node, capture);
    };

    var popstate = function popstate(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('popstate', node, capture);
    };

    var load = function load(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('load', node, capture);
    };

    var unload = function unload(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('unload', node, capture);
    };

    var pointerdown = function pointerdown(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerdown', node, capture);
    };

    var pointerup = function pointerup(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerup', node, capture);
    };

    var pointermove = function pointermove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointermove', node, capture);
    };

    var pointerover = function pointerover(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerover', node, capture);
    };

    var pointerenter = function pointerenter(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerenter', node, capture);
    };

    var pointerout = function pointerout(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerout', node, capture);
    };

    var pointerleave = function pointerleave(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('pointerleave', node, capture);
    };

    var touchstart = function touchstart(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchstart', node, capture);
    };

    var touchend = function touchend(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchend', node, capture);
    };

    var touchmove = function touchmove(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchmove', node, capture);
    };

    var touchcancel = function touchcancel(node) {
        var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
        return domEvent('touchcancel', node, capture);
    };

    var DomEvent = function () {
        function DomEvent(event, node, capture) {
            _classCallCheck(this, DomEvent);

            this.event = event;
            this.node = node;
            this.capture = capture;
        }

        _createClass(DomEvent, [{
            key: 'run',
            value: function run(sink, scheduler) {
                var _this = this;

                var send = function send(e) {
                    return tryEvent(scheduler.now(), e, sink);
                };

                var dispose = function dispose() {
                    return _this.node.removeEventListener(_this.event, send, _this.capture);
                };

                this.node.addEventListener(this.event, send, this.capture);
                return {
                    dispose: dispose
                };
            }
        }]);

        return DomEvent;
    }();

    function tryEvent(t, x, sink) {
        try {
            sink.event(t, x);
        } catch (e) {
            sink.error(t, e);
        }
    }

    exports.domEvent = domEvent;
    exports.blur = blur;
    exports.focus = focus;
    exports.focusin = focusin;
    exports.focusout = focusout;
    exports.click = click;
    exports.dblclick = dblclick;
    exports.mousedown = mousedown;
    exports.mouseup = mouseup;
    exports.mousemove = mousemove;
    exports.mouseover = mouseover;
    exports.mouseenter = mouseenter;
    exports.mouseout = mouseout;
    exports.mouseleave = mouseleave;
    exports.change = change;
    exports.select = select;
    exports.submit = submit;
    exports.keydown = keydown;
    exports.keypress = keypress;
    exports.keyup = keyup;
    exports.input = input;
    exports.contextmenu = contextmenu;
    exports.resize = resize;
    exports.scroll = scroll;
    exports.error = error;
    exports.hashchange = hashchange;
    exports.popstate = popstate;
    exports.load = load;
    exports.unload = unload;
    exports.pointerdown = pointerdown;
    exports.pointerup = pointerup;
    exports.pointermove = pointermove;
    exports.pointerover = pointerover;
    exports.pointerenter = pointerenter;
    exports.pointerout = pointerout;
    exports.pointerleave = pointerleave;
    exports.touchstart = touchstart;
    exports.touchend = touchend;
    exports.touchmove = touchmove;
    exports.touchcancel = touchcancel;
});
