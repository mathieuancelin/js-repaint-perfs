(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rotorjsMiddlewares = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trie_RouteTrie = exports.Loop_VirtualDom = exports.Cursor_FreezerJs = undefined;

var _cursorFreezerJs = require('./src/middlewares/cursor-freezerJs');

var _cursorFreezerJs2 = _interopRequireDefault(_cursorFreezerJs);

var _loopVirtualDom = require('./src/middlewares/loop-virtualDom');

var _loopVirtualDom2 = _interopRequireDefault(_loopVirtualDom);

var _trieRouteTrie = require('./src/middlewares/trie-routeTrie');

var _trieRouteTrie2 = _interopRequireDefault(_trieRouteTrie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Cursor_FreezerJs = _cursorFreezerJs2.default;
exports.Loop_VirtualDom = _loopVirtualDom2.default;
exports.Trie_RouteTrie = _trieRouteTrie2.default;

},{"./src/middlewares/cursor-freezerJs":37,"./src/middlewares/loop-virtualDom":38,"./src/middlewares/trie-routeTrie":39}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":5}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
},{"../core-js/object/define-property":2}],5:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":6}],6:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],9:[function(require,module,exports){
var Freezer = require('./src/freezer');
module.exports = Freezer;
},{"./src/freezer":11}],10:[function(require,module,exports){
'use strict';

var Utils = require( './utils' );



//#build


var BEFOREALL = 'beforeAll',
	AFTERALL = 'afterAll'
;
var specialEvents = ['immediate', BEFOREALL, AFTERALL];

// The prototype methods are stored in a different object
// and applied as non enumerable properties later
var emitterProto = {
	on: function( eventName, listener, once ){
		var listeners = this._events[ eventName ] || [];

		listeners.push({ callback: listener, once: once});
		this._events[ eventName ] =  listeners;

		return this;
	},

	once: function( eventName, listener ){
		return this.on( eventName, listener, true );
	},

	off: function( eventName, listener ){
		if( typeof eventName == 'undefined' ){
			this._events = {};
		}
		else if( typeof listener == 'undefined' ) {
			this._events[ eventName ] = [];
		}
		else {
			var listeners = this._events[ eventName ] || [],
				i
			;

			for (i = listeners.length - 1; i >= 0; i--) {
				if( listeners[i].callback === listener )
					listeners.splice( i, 1 );
			}
		}

		return this;
	},

	trigger: function( eventName ){
		var args = [].slice.call( arguments, 1 ),
			listeners = this._events[ eventName ] || [],
			onceListeners = [],
			special = specialEvents.indexOf( eventName ) != -1,
			i, listener
		;

		special || this.trigger.apply( this, [BEFOREALL, eventName].concat( args ) );

		// Call listeners
		for (i = 0; i < listeners.length; i++) {
			listener = listeners[i];

			if( listener.callback )
				listener.callback.apply( this, args );
			else {
				// If there is not a callback, remove!
				listener.once = true;
			}

			if( listener.once )
				onceListeners.push( i );
		}

		// Remove listeners marked as once
		for( i = onceListeners.length - 1; i >= 0; i-- ){
			listeners.splice( onceListeners[i], 1 );
		}

		special || this.trigger.apply( this, [AFTERALL, eventName].concat( args ) );

		return this;
	}
};

// Methods are not enumerable so, when the stores are
// extended with the emitter, they can be iterated as
// hashmaps
var Emitter = Utils.createNonEnumerable( emitterProto );
//#build

module.exports = Emitter;

},{"./utils":14}],11:[function(require,module,exports){
'use strict';

var Utils = require( './utils.js' ),
	Emitter = require( './emitter' ),
	Mixins = require( './mixins' ),
	Frozen = require( './frozen' )
;

//#build
var Freezer = function( initialValue, options ) {
	var me = this,
		mutable = ( options && options.mutable ) || false,
		live = ( options && options.live ) || live
	;

	// Immutable data
	var frozen;
	var pivotTriggers = [], pivotTicking = 0;
	var triggerNow = function( node ){
		var _ = node.__,
			i
		;
		if( _.listener ){
			Frozen.trigger( node, 'update', 0, true );

			if( !_.parents.length )
				_.listener.trigger('immediate', 'now');
		}

		for (i = 0; i < _.parents.length; i++) {
			notify('now', _.parents[i]);
		}
	};
	var addToPivotTriggers = function( node ){
		pivotTriggers.push( node );
		if( !pivotTicking ){
			pivotTicking = 1;
			Utils.nextTick( function(){
				pivotTriggers = [];
				pivotTicking = 0;
			});
		}
	}
	var notify = function notify( eventName, node, options ){
		var _ = node.__,
			nowNode
		;

		if( eventName == 'listener' )
			return Frozen.createListener( node );

		if( eventName == 'now' ){
			if( pivotTriggers.length ){
				while( pivotTriggers.length ){
					nowNode = pivotTriggers.shift();
					triggerNow( nowNode );
				}
			}
			else {
				triggerNow( node );
			}
			return node;
		}

		var update = Frozen.update( eventName, node, options );

		if( eventName != 'pivot' ){
			var pivot = Utils.findPivot( update );
			if( pivot ) {
				addToPivotTriggers( update );
	  			return pivot;
			}
		}

		return update;
	};

	var freeze = function(){};
	if( !mutable )
		freeze = function( obj ){ Object.freeze( obj ); };

	// Create the frozen object
	frozen = Frozen.freeze( initialValue, notify, freeze, live );

	// Listen to its changes immediately
	var listener = frozen.getListener();

	// Updating flag to trigger the event on nextTick
	var updating = false;

	listener.on( 'immediate', function( prevNode, updated ){

		if( prevNode == 'now' ){
			if( !updating )
				return;
			updating = false;
			return me.trigger( 'update', frozen );
		}

		if( prevNode != frozen )
			return;

		frozen = updated;

		if( live )
			return me.trigger( 'update', updated );

		// Trigger on next tick
		if( !updating ){
			updating = true;
			Utils.nextTick( function(){
				if( updating ){
					updating = false;
					me.trigger( 'update', frozen );
				}
			});
		}
	});

	Utils.addNE( this, {
		get: function(){
			return frozen;
		},
		set: function( node ){
			var newNode = notify( 'reset', frozen, node );
			newNode.__.listener.trigger( 'immediate', frozen, newNode );
		}
	});

	Utils.addNE( this, { getData: this.get, setData: this.set } );

	// The event store
	this._events = [];
}

Freezer.prototype = Utils.createNonEnumerable({constructor: Freezer}, Emitter);
//#build

module.exports = Freezer;

},{"./emitter":10,"./frozen":12,"./mixins":13,"./utils.js":14}],12:[function(require,module,exports){
'use strict';

var Utils = require( './utils' ),
	Mixins = require( './mixins'),
	Emitter = require('./emitter')
;

//#build
var Frozen = {
	freeze: function( node, notify, freezeFn, live ){
		if( node && node.__ ){
			return node;
		}

		var me = this,
			frozen, mixin, cons
		;

		if( node.constructor == Array ){
			frozen = this.createArray( node.length );
		}
		else {
			frozen = Object.create( Mixins.Hash );
		}

		Utils.addNE( frozen, { __: {
			listener: false,
			parents: [],
			notify: notify,
			freezeFn: freezeFn,
			live: live || false
		}});

		// Freeze children
		Utils.each( node, function( child, key ){
			cons = child && child.constructor;
			if( cons == Array || cons == Object ){
				child = me.freeze( child, notify, freezeFn, live );
			}

			if( child && child.__ ){
				me.addParent( child, frozen );
			}

			frozen[ key ] = child;
		});

		freezeFn( frozen );

		return frozen;
	},

	update: function( type, node, options ){
		if( !this[ type ])
			return Utils.error( 'Unknown update type: ' + type );

		return this[ type ]( node, options );
	},

	reset: function( node, value ){
		var me = this,
			_ = node.__,
			frozen = value
		;

		if( !frozen.__ ){
			frozen = this.freeze( value, _.notify, _.freezeFn, _.live );
		}

		frozen.__.listener = _.listener;
		frozen.__.parents = _.parents;

		// Set back the parent on the children
		// that have been updated
		this.fixChildren( frozen, node );
		Utils.each( frozen, function( child ){
			if( child && child.__ ){
				me.removeParent( node );
				me.addParent( child, frozen );
			}
		});

		return frozen;
	},

	merge: function( node, attrs ){
		var _ = node.__,
			trans = _.trans,

			// Clone the attrs to not modify the argument
			attrs = Utils.extend( {}, attrs)
		;

		if( trans ){

			for( var attr in attrs )
				trans[ attr ] = attrs[ attr ];
			return node;
		}

		var me = this,
			frozen = this.copyMeta( node ),
			notify = _.notify,
			val, cons, key, isFrozen
		;

		Utils.each( node, function( child, key ){
			isFrozen = child && child.__;

			if( isFrozen ){
				me.removeParent( child, node );
			}

			val = attrs[ key ];
			if( !val ){
				if( isFrozen )
					me.addParent( child, frozen );
				return frozen[ key ] = child;
			}

			cons = val && val.constructor;

			if( cons == Array || cons == Object )
				val = me.freeze( val, notify, _.freezeFn, _.live );

			if( val && val.__ )
				me.addParent( val, frozen );

			delete attrs[ key ];

			frozen[ key ] = val;
		});


		for( key in attrs ) {
			val = attrs[ key ];
			cons = val && val.constructor;

			if( cons == Array || cons == Object )
				val = me.freeze( val, notify, _.freezeFn, _.live );

			if( val && val.__ )
				me.addParent( val, frozen );

			frozen[ key ] = val;
		}

		_.freezeFn( frozen );

		this.refreshParents( node, frozen );

		return frozen;
	},

	replace: function( node, replacement ) {

		var me = this,
			cons = replacement && replacement.constructor,
			_ = node.__,
			frozen = replacement
		;

		if( cons == Array || cons == Object ) {

			frozen = me.freeze( replacement, _.notify, _.freezeFn, _.live );

			frozen.__.parents = _.parents;

			// Add the current listener if exists, replacing a
			// previous listener in the frozen if existed
			if( _.listener )
				frozen.__.listener = _.listener;

			// Since the parents will be refreshed directly,
			// Trigger the listener here
			this.trigger( frozen, 'update', frozen, _.live );
		}

		// Refresh the parent nodes directly
		if( !_.parents.length && _.listener ){
			_.listener.trigger( 'immediate', node, frozen );
		}
		for (var i = _.parents.length - 1; i >= 0; i--) {
				this.refresh( _.parents[i], node, frozen );
		}
		return frozen;
	},

	remove: function( node, attrs ){
		var trans = node.__.trans;
		if( trans ){
			for( var l = attrs.length - 1; l >= 0; l-- )
				delete trans[ attrs[l] ];
			return node;
		}

		var me = this,
			frozen = this.copyMeta( node ),
			isFrozen
		;

		Utils.each( node, function( child, key ){
			isFrozen = child && child.__;

			if( isFrozen ){
				me.removeParent( child, node );
			}

			if( attrs.indexOf( key ) != -1 ){
				return;
			}

			if( isFrozen )
				me.addParent( child, frozen );

			frozen[ key ] = child;
		});

		node.__.freezeFn( frozen );
		this.refreshParents( node, frozen );

		return frozen;
	},

	splice: function( node, args ){
		var _ = node.__,
			trans = _.trans
		;

		if( trans ){
			trans.splice.apply( trans, args );
			return node;
		}

		var me = this,
			frozen = this.copyMeta( node ),
			index = args[0],
			deleteIndex = index + args[1],
			con, child
		;

		// Clone the array
		Utils.each( node, function( child, i ){

			if( child && child.__ ){
				me.removeParent( child, node );

				// Skip the nodes to delete
				if( i < index || i>= deleteIndex )
					me.addParent( child, frozen );
			}

			frozen[i] = child;
		});

		// Prepare the new nodes
		if( args.length > 1 ){
			for (var i = args.length - 1; i >= 2; i--) {
				child = args[i];
				con = child && child.constructor;

				if( con == Array || con == Object )
					child = this.freeze( child, _.notify, _.freezeFn, _.live );

				if( child && child.__ )
					this.addParent( child, frozen );

				args[i] = child;
			}
		}

		// splice
		Array.prototype.splice.apply( frozen, args );

		node.__.freezeFn( frozen );
		this.refreshParents( node, frozen );

		return frozen;
	},

	transact: function( node ) {
		var me = this,
			transacting = node.__.trans,
			trans
		;

		if( transacting )
			return transacting;

		trans = node.constructor == Array ? [] : {};

		Utils.each( node, function( child, key ){
			trans[ key ] = child;
		});

		node.__.trans = trans;

		// Call run automatically in case
		// the user forgot about it
		Utils.nextTick( function(){
			if( node.__.trans )
				me.run( node );
		});

		return trans;
	},

	run: function( node ) {
		var me = this,
			trans = node.__.trans
		;

		if( !trans )
			return node;

		// Remove the node as a parent
		Utils.each( trans, function( child, key ){
			if( child && child.__ ){
				me.removeParent( child, node );
			}
		});

		delete node.__.trans;

		var result = this.replace( node, trans );
		return result;
	},

	pivot: function( node ){
		node.__.pivot = 1;
		this.unpivot( node );
		return node;
	},

	unpivot: function( node ){
		Utils.nextTick( function(){
			node.__.pivot = 0;
		});
	},

	refresh: function( node, oldChild, newChild ){
		var me = this,
			trans = node.__.trans,
			found = 0
		;

		if( trans ){

			Utils.each( trans, function( child, key ){
				if( found ) return;

				if( child === oldChild ){

					trans[ key ] = newChild;
					found = 1;

					if( newChild && newChild.__ )
						me.addParent( newChild, node );
				}
			});

			return node;
		}

		var frozen = this.copyMeta( node ),
			replacement, __
		;

		Utils.each( node, function( child, key ){
			if( child === oldChild ){
				child = newChild;
			}

			if( child && (__ = child.__) ){
				me.removeParent( child, node );
				me.addParent( child, frozen );
			}

			frozen[ key ] = child;
		});

		node.__.freezeFn( frozen );

		this.refreshParents( node, frozen );
	},

	fixChildren: function( node, oldNode ){
		var me = this;
		Utils.each( node, function( child ){
			if( !child || !child.__ )
				return;

			// If the child is linked to the node,
			// maybe its children are not linked
			if( child.__.parents.indexOf( node ) != -1 )
				return me.fixChildren( child );

			// If the child wasn't linked it is sure
			// that it wasn't modified. Just link it
			// to the new parent
			if( child.__.parents.length == 1 )
				return child.__.parents = [ node ];

			if( oldNode )
				me.removeParent( child, oldNode );

			me.addParent( child, node );
		});
	},

	copyMeta: function( node ){
		var me = this,
			frozen
		;

		if( node.constructor == Array ){
			frozen = this.createArray( node.length );
		}
		else {
			frozen = Object.create( Mixins.Hash );
		}

		var _ = node.__;

		Utils.addNE( frozen, {__: {
			notify: _.notify,
			listener: _.listener,
			parents: _.parents.slice( 0 ),
			trans: _.trans,
			freezeFn: _.freezeFn,
			pivot: _.pivot,
			live: _.live
		}});

		if( _.pivot )
			this.unpivot( frozen );

		return frozen;
	},

	refreshParents: function( oldChild, newChild ){
		var _ = oldChild.__,
			i
		;

		this.trigger( newChild, 'update', newChild, _.live );

		if( !_.parents.length ){
			if( _.listener ){
				_.listener.trigger( 'immediate', oldChild, newChild );
			}
		}
		else {
			for (i = _.parents.length - 1; i >= 0; i--) {
				this.refresh( _.parents[i], oldChild, newChild );
			}
		}
	},

	removeParent: function( node, parent ){
		var parents = node.__.parents,
			index = parents.indexOf( parent )
		;

		if( index != -1 ){
			parents.splice( index, 1 );
		}
	},

	addParent: function( node, parent ){
		var parents = node.__.parents,
			index = parents.indexOf( parent )
		;

		if( index == -1 ){
			parents[ parents.length ] = parent;
		}
	},

	trigger: function( node, eventName, param, now ){
		var listener = node.__.listener;
		if( !listener )
			return;

		var ticking = listener.ticking;

		if( now ){
			if( ticking || param ){
				listener.ticking = 0;
				listener.trigger( eventName, ticking || param );
			}
			return;
		}

		listener.ticking = param;
		if( !ticking ){
			Utils.nextTick( function(){
				if( listener.ticking ){
					var updated = listener.ticking;
					listener.ticking = 0;
					listener.trigger( eventName, updated );
				}
			});
		}
	},

	createListener: function( frozen ){
		var l = frozen.__.listener;

		if( !l ) {
			l = Object.create(Emitter, {
				_events: {
					value: {},
					writable: true
				}
			});

			frozen.__.listener = l;
		}

		return l;
	},

	createArray: (function(){
		// Set createArray method
		if( [].__proto__ )
			return function( length ){
				var arr = new Array( length );
				arr.__proto__ = Mixins.List;
				return arr;
			}
		return function( length ){
			var arr = new Array( length ),
				methods = Mixins.arrayMethods
			;
			for( var m in methods ){
				arr[ m ] = methods[ m ];
			}
			return arr;
		}
	})()
};
//#build

module.exports = Frozen;

},{"./emitter":10,"./mixins":13,"./utils":14}],13:[function(require,module,exports){
'use strict';

var Utils = require( './utils.js' );

//#build

/**
 * Creates non-enumerable property descriptors, to be used by Object.create.
 * @param  {Object} attrs Properties to create descriptors
 * @return {Object}       A hash with the descriptors.
 */
var createNE = function( attrs ){
	var ne = {};

	for( var key in attrs ){
		ne[ key ] = {
			writable: true,
			configurable: true,
			enumerable: false,
			value: attrs[ key]
		}
	}

	return ne;
}

var commonMethods = {
	set: function( attr, value ){
		var attrs = attr,
			update = this.__.trans
		;

		if( typeof attr != 'object' ){
			attrs = {};
			attrs[ attr ] = value;
		}

		if( !update ){
			for( var key in attrs ){
				update = update || this[ key ] !== attrs[ key ];
			}

			// No changes, just return the node
			if( !update )
				return this;
		}

		return this.__.notify( 'merge', this, attrs );
	},

	reset: function( attrs ) {
		return this.__.notify( 'replace', this, attrs );
	},

	getListener: function(){
		return this.__.notify( 'listener', this );
	},

	toJS: function(){
		var js;
		if( this.constructor == Array ){
			js = new Array( this.length );
		}
		else {
			js = {};
		}

		Utils.each( this, function( child, i ){
			if( child && child.__ )
				js[ i ] = child.toJS();
			else
				js[ i ] = child;
		});

		return js;
	},

	transact: function(){
		return this.__.notify( 'transact', this );
	},

	run: function(){
		return this.__.notify( 'run', this );
	},

	now: function(){
		return this.__.notify( 'now', this );
	},

	pivot: function(){
		return this.__.notify( 'pivot', this );
	}
};

var arrayMethods = Utils.extend({
	push: function( el ){
		return this.append( [el] );
	},

	append: function( els ){
		if( els && els.length )
			return this.__.notify( 'splice', this, [this.length, 0].concat( els ) );
		return this;
	},

	pop: function(){
		if( !this.length )
			return this;

		return this.__.notify( 'splice', this, [this.length -1, 1] );
	},

	unshift: function( el ){
		return this.prepend( [el] );
	},

	prepend: function( els ){
		if( els && els.length )
			return this.__.notify( 'splice', this, [0, 0].concat( els ) );
		return this;
	},

	shift: function(){
		if( !this.length )
			return this;

		return this.__.notify( 'splice', this, [0, 1] );
	},

	splice: function( index, toRemove, toAdd ){
		return this.__.notify( 'splice', this, arguments );
	}
}, commonMethods );

var FrozenArray = Object.create( Array.prototype, createNE( arrayMethods ) );

var Mixins = {

Hash: Object.create( Object.prototype, createNE( Utils.extend({
	remove: function( keys ){
		var filtered = [],
			k = keys
		;

		if( keys.constructor != Array )
			k = [ keys ];

		for( var i = 0, l = k.length; i<l; i++ ){
			if( this.hasOwnProperty( k[i] ) )
				filtered.push( k[i] );
		}

		if( filtered.length )
			return this.__.notify( 'remove', this, filtered );
		return this;
	}
}, commonMethods))),

List: FrozenArray,
arrayMethods: arrayMethods
};
//#build

module.exports = Mixins;

},{"./utils.js":14}],14:[function(require,module,exports){
'use strict';

//#build
var global = (new Function("return this")());

var Utils = {
	extend: function( ob, props ){
		for( var p in props ){
			ob[p] = props[p];
		}
		return ob;
	},

	createNonEnumerable: function( obj, proto ){
		var ne = {};
		for( var key in obj )
			ne[key] = {value: obj[key] };
		return Object.create( proto || {}, ne );
	},

	error: function( message ){
		var err = new Error( message );
		if( console )
			return console.error( err );
		else
			throw err;
	},

	each: function( o, clbk ){
		var i,l,keys;
		if( o && o.constructor == Array ){
			for (i = 0, l = o.length; i < l; i++)
				clbk( o[i], i );
		}
		else {
			keys = Object.keys( o );
			for( i = 0, l = keys.length; i < l; i++ )
				clbk( o[ keys[i] ], keys[i] );
		}
	},

	addNE: function( node, attrs ){
		for( var key in attrs ){
			Object.defineProperty( node, key, {
				enumerable: false,
				configurable: true,
				writable: true,
				value: attrs[ key ]
			});
		}
	},

	// nextTick - by stagas / public domain
  	nextTick: (function () {
      var queue = [],
			dirty = false,
			fn,
			hasPostMessage = !!global.postMessage && (typeof Window != 'undefined') && (global instanceof Window),
			messageName = 'nexttick',
			trigger = (function () {
				return hasPostMessage
					? function trigger () {
					global.postMessage(messageName, '*');
				}
				: function trigger () {
					setTimeout(function () { processQueue() }, 0);
				};
			}()),
			processQueue = (function () {
				return hasPostMessage
					? function processQueue (event) {
						if (event.source === global && event.data === messageName) {
							event.stopPropagation();
							flushQueue();
						}
					}
					: flushQueue;
      	})()
      ;

      function flushQueue () {
          while (fn = queue.shift()) {
              fn();
          }
          dirty = false;
      }

      function nextTick (fn) {
          queue.push(fn);
          if (dirty) return;
          dirty = true;
          trigger();
      }

      if (hasPostMessage) global.addEventListener('message', processQueue, true);

      nextTick.removeListener = function () {
          global.removeEventListener('message', processQueue, true);
      }

      return nextTick;
  })(),

  findPivot: function( node ){
  		if( !node || !node.__ )
  			return;

  		if( node.__.pivot )
  			return node;

  		var found = 0,
  			parents = node.__.parents,
  			i = 0,
  			parent
  		;

  		// Look up for the pivot in the parents
  		while( !found && i < parents.length ){
  			parent = parents[i];
  			if( parent.__.pivot )
  				found = parent;
  			i++;
  		}

  		if( found ){
  			return found;
  		}

  		// If not found, try with the parent's parents
  		i=0;
  		while( !found && i < parents.length ){
	  		found = this.findPivot( parents[i] );
	  		i++;
	  	}

  		return found;
  }
};
//#build


module.exports = Utils;

},{}],15:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":7}],16:[function(require,module,exports){
var now = require('performance-now')
  , global = typeof window === 'undefined' ? {} : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = global['request' + suffix]
  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

for(var i = 0; i < vendors.length && !raf; i++) {
  raf = global[vendors[i] + 'Request' + suffix]
  caf = global[vendors[i] + 'Cancel' + suffix]
      || global[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(global, fn)
}
module.exports.cancel = function() {
  caf.apply(global, arguments)
}

},{"performance-now":17}],17:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))

},{"_process":8}],18:[function(require,module,exports){
// **Github:** https://github.com/zensh/route-trie
//
// **License:** MIT

/* global module, define */
;(function (root, factory) {
  'use strict'

  if (typeof module === 'object' && module.exports) module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else root.RouteTrie = factory()
}(typeof window === 'object' ? window : this, function () {
  'use strict'

  var sepReg = /\|/
  var multiSlashReg = /(\/){2,}/
  var maybeRegex = /[?^{}()|[\]\\]/
  var regexReg = /^([^\(\n\r\u2028\u2029]*)(\(.+\))$/
  var parameterReg = /^(.*)(\:\w+\b)(.*)$/
  var escapeReg = /[.*+?^${}()|[\]\\]/g
  var trimSlashReg = /(^\/)|(\/$)/g

  function Trie (flags) {
    this.flags = flags ? 'i' : ''
    this.root = new Node(null, 'root')
  }

  Trie.prototype.define = function (pattern) {
    if (typeof pattern !== 'string') throw new TypeError('Pattern must be string.')
    if (multiSlashReg.test(pattern)) throw new Error('Multi-slash exist.')

    var _pattern = pattern.replace(trimSlashReg, '')
    var node = define(this.root, _pattern.split('/'), this.flags)

    if (node._nodeState.pattern == null) node._nodeState.pattern = pattern
    return node
  }

  // the path should be normalized before match, just as path.normalize do in Node.js
  Trie.prototype.match = function (path, multiMatch) {
    if (typeof path !== 'string') throw new TypeError('Path must be string.')
    path = path.replace(trimSlashReg, '')

    var node = this.root
    var frags = path.split('/')
    var matched = new TrieMatched()

    while (frags.length) {
      node = matchNode(node, frags, matched.params, this.flags)
      // matched
      if (node) {
        if (multiMatch && node._nodeState.endpoint) matched.nodes.push(node)
        continue
      }
      // not match
      return multiMatch ? matched : null
    }

    matched.node = node
    if (!multiMatch && !node._nodeState.endpoint) return null
    return matched
  }

  function Node (parentNode, frag, matchRemains) {
    Object.defineProperty(this, '_nodeState', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: new NodeState(parentNode, frag, matchRemains)
    })
  }

  function NodeState (parentNode, frag, matchRemains) {
    this.name = frag
    this.pattern = null
    this.endpoint = false
    this.parentNode = parentNode
    this.matchRemains = !!matchRemains
    this.childNodes = Object.create(null)
    this.regexNames = Object.create(null)
    this.regexNodes = []
  }

  function RegexNode (node, prefix, param, regex) {
    this.node = node
    this.prefix = prefix || ''
    this.param = param || ''
    this.regex = regex || null
  }

  function TrieMatched () {
    this.node = null
    this.nodes = []
    this.params = {}
  }

  function define (parentNode, frags, flags) {
    var frag = frags.shift()
    var child = parseNode(parentNode, frag, flags)

    if (!frags.length) {
      child._nodeState.endpoint = true
      return child
    }
    if (child._nodeState.matchRemains) {
      throw new Error('Can not define regex pattern after "(*)" pattern.')
    }
    return define(child, frags, flags)
  }

  function matchNode (node, frags, params, flags) {
    var frag = safeDecodeURIComponent(frags.shift())
    if (frag === false) return null

    var childNodes = node._nodeState.childNodes
    var child = childNodes[flags ? frag.toLowerCase() : frag]
    if (child) return child

    var regexNodes = node._nodeState.regexNodes

    for (var fragCopy, regexNode, i = 0, len = regexNodes.length; i < len; i++) {
      fragCopy = frag
      regexNode = regexNodes[i]

      if (regexNode.prefix) {
        if (fragCopy.indexOf(regexNode.prefix) !== 0) continue
        fragCopy = fragCopy.slice(regexNode.prefix.length)
      }

      if (regexNode.regex && !regexNode.regex.test(fragCopy)) continue
      if (regexNode.node._nodeState.matchRemains) {
        while (frags.length) {
          var remain = safeDecodeURIComponent(frags.shift())
          if (remain === false) return null
          fragCopy += '/' + remain
        }
      }
      if (regexNode.param) params[regexNode.param] = fragCopy
      child = regexNode.node
      break
    }

    return child
  }

  function parseNode (parentNode, frag, flags) {
    var res = null
    var regex = ''
    var prefix = ''
    var parameter = ''
    var matchRemains = false
    var childNodes = parentNode._nodeState.childNodes
    var regexNames = parentNode._nodeState.regexNames
    var regexNodes = parentNode._nodeState.regexNodes

    if (childNodes[frag]) return childNodes[frag]
    checkMatchRegex(frag, '', parentNode._nodeState)

    if ((res = parameterReg.exec(frag))) {
      // case: `prefix:name(regex)`
      prefix = res[1]
      parameter = res[2].slice(1)
      regex = res[3]
      if (regex && !regexReg.test(regex)) {
        throw new Error('Can not parse "' + regex + '" as regex pattern')
      }
    } else if ((res = regexReg.exec(frag))) {
      // case: `prefix(regex)`
      prefix = res[1]
      regex = res[2]
    } else if (sepReg.test(frag)) {
      // case: `a|b|c`
      regex = wrapSepExp(frag)
    } else if (maybeRegex.test(frag)) {
      throw new Error('Can not parse "' + frag + '"')
    } else {
      // case: other simple string node
      childNodes[frag] = new Node(parentNode, frag)
      return childNodes[frag]
    }

    if (regex === '(*)') {
      regex = '(.*)'
      matchRemains = true
    }

    if (regex) regex = '^' + regex + '$'
    // normalize frag as regex node name
    var regexName = prefix + ':' + regex
    // if regex node exist
    if (regexNames[regexName]) return regexNodes[regexNames[regexName]].node

    if (prefix) checkMatchRegex(frag, prefix, parentNode._nodeState)
    var node = new Node(parentNode, regexName, matchRemains)
    if (regex) regex = new RegExp(regex, flags)
    regexNames[regexName] = '' + regexNodes.length
    regexNodes.push(new RegexNode(node, prefix, parameter, regex))
    return node
  }

  function checkMatchRegex (frag, prefix, parentNodeState) {
    var regexNode = parentNodeState.regexNames[prefix + ':^(.*)$']
    if (regexNode) {
      var pattern = parentNodeState.regexNodes[regexNode].node._nodeState.pattern
      throw new Error('Can not define "' + frag + '" after "' + pattern + '".')
    }
  }

  function wrapSepExp (str) {
    var res = str.split('|')
    for (var i = 0, len = res.length; i < len; i++) {
      if (!res[i]) throw new Error('Can not parse "' + str + '" as separated pattern')
      res[i] = res[i].replace(escapeReg, '\\$&')
    }
    return '(' + res.join('|') + ')'
  }

  function safeDecodeURIComponent (string) {
    try {
      return decodeURIComponent(string)
    } catch (err) {
      return false
    }
  }

  Trie.NAME = 'Trie'
  Trie.VERSION = 'v1.2.3'
  Trie.safeDecodeURIComponent = safeDecodeURIComponent
  return Trie
}))

},{}],19:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],20:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],21:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":29,"is-object":19}],22:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":27,"../vnode/is-vnode.js":30,"../vnode/is-vtext.js":31,"../vnode/is-widget.js":32,"./apply-properties":21,"global/document":15}],23:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],24:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":32,"../vnode/vpatch.js":34,"./apply-properties":21,"./update-widget":26}],25:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":22,"./dom-index":23,"./patch-op":24,"global/document":15,"x-is-array":20}],26:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":32}],27:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":28,"./is-vnode":30,"./is-vtext":31,"./is-widget":32}],28:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],29:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],30:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":33}],31:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":33}],32:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],33:[function(require,module,exports){
module.exports = "2"

},{}],34:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":33}],35:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":29,"is-object":19}],36:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":27,"../vnode/is-thunk":28,"../vnode/is-vnode":30,"../vnode/is-vtext":31,"../vnode/is-widget":32,"../vnode/vpatch":34,"./diff-props":35,"x-is-array":20}],37:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freezerJs = require('freezer-js');

var _freezerJs2 = _interopRequireDefault(_freezerJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cursor = function () {
  function Cursor(object) {
    (0, _classCallCheck3.default)(this, Cursor);

    this.__freezer = new _freezerJs2.default(object);
  }

  (0, _createClass3.default)(Cursor, [{
    key: 'get',
    value: function get() {
      return this.__freezer.get();
    }
  }, {
    key: 'set',
    value: function set() {
      if (arguments.length === 1) {
        return this.__freezer.set(arguments.length <= 0 ? undefined : arguments[0]);
      } else {
        var _freezer;

        return (_freezer = this.__freezer).set.apply(_freezer, arguments);
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (arguments.length === 1) {
        return this.__freezer.remove(arguments.length <= 0 ? undefined : arguments[0]);
      } else {
        var _freezer2;

        return (_freezer2 = this.__freezer).remove.apply(_freezer2, arguments);
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(callback) {
      return this.__freezer.on('update', callback);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(callback) {
      return this.__freezer.off('update', callback);
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      return this.__freezer.trigger('update', this.__freezer.get());
    }
  }]);
  return Cursor;
}();

exports.default = Cursor;

},{"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4,"freezer-js":9}],38:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _createElement = require('virtual-dom/vdom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _diff = require('virtual-dom/vtree/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('virtual-dom/vdom/patch');

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loop = function () {
  function Loop(view) {
    (0, _classCallCheck3.default)(this, Loop);

    this.__view = view;

    this.__redrawImmediatelyBinded = this.__redrawImmediately.bind(this);

    this.__currentTree = (0, this.__view)();
    this.__target = (0, _createElement2.default)(this.__currentTree);
  }

  (0, _createClass3.default)(Loop, [{
    key: 'redraw',
    value: function redraw() {
      (0, _raf2.default)(this.__redrawImmediatelyBinded);
    }
  }, {
    key: '__redrawImmediately',
    value: function __redrawImmediately() {
      var newTree = (0, this.view)();
      var patches = (0, _diff2.default)(this.__currentTree, newTree);
      this.__target = (0, _patch2.default)(this.__target, patches);

      this.__currentTree = newTree;
    }
  }, {
    key: 'view',
    get: function get() {
      return this.__view;
    }
  }, {
    key: 'target',
    get: function get() {
      return this.__target;
    }
  }]);
  return Loop;
}();

exports.default = Loop;

},{"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4,"raf":16,"virtual-dom/vdom/create-element":22,"virtual-dom/vdom/patch":25,"virtual-dom/vtree/diff":36}],39:[function(require,module,exports){
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routeTrie = require('route-trie');

var _routeTrie2 = _interopRequireDefault(_routeTrie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trie = function () {
  function Trie() {
    (0, _classCallCheck3.default)(this, Trie);

    this.__routeTrie = new _routeTrie2.default();
  }

  (0, _createClass3.default)(Trie, [{
    key: 'define',
    value: function define(pattern) {
      var routeTrieNode = this.__routeTrie.define(pattern);
      return new Node(this, routeTrieNode);
    }
  }, {
    key: 'match',
    value: function match(path) {
      var routeTrieMatch = this.__routeTrie.match(path);
      return routeTrieMatch !== null ? new Match(this, routeTrieMatch) : null;
    }
  }, {
    key: 'is',
    value: function is(firstNode, secondNone) {
      return firstNode.__routeTrieNode === secondNone.__routeTrieNode;
    }
  }]);
  return Trie;
}();

exports.default = Trie;

var Node = function () {
  function Node(trie, routeTrieNode) {
    (0, _classCallCheck3.default)(this, Node);

    this.__trie = trie;
    this.__routeTrieNode = routeTrieNode;
  }

  (0, _createClass3.default)(Node, [{
    key: 'pattern',
    get: function get() {
      return this.__routeTrieNode._nodeState.pattern;
    }
  }]);
  return Node;
}();

var Match = function () {
  function Match(trie, routeTrieMatch) {
    (0, _classCallCheck3.default)(this, Match);

    this.__trie = trie;
    this.__routeTrieMatch = routeTrieMatch;
  }

  (0, _createClass3.default)(Match, [{
    key: 'params',
    get: function get() {
      return this.__routeTrieMatch.params;
    }
  }, {
    key: 'node',
    get: function get() {
      return new Node(this.__trie, this.__routeTrieMatch.node);
    }
  }]);
  return Match;
}();

},{"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4,"route-trie":18}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtaWRkbGV3YXJlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9mcmVlemVyLWpzL2ZyZWV6ZXIuanMiLCJub2RlX21vZHVsZXMvZnJlZXplci1qcy9zcmMvZW1pdHRlci5qcyIsIm5vZGVfbW9kdWxlcy9mcmVlemVyLWpzL3NyYy9mcmVlemVyLmpzIiwibm9kZV9tb2R1bGVzL2ZyZWV6ZXItanMvc3JjL2Zyb3plbi5qcyIsIm5vZGVfbW9kdWxlcy9mcmVlemVyLWpzL3NyYy9taXhpbnMuanMiLCJub2RlX21vZHVsZXMvZnJlZXplci1qcy9zcmMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL2RvY3VtZW50LmpzIiwibm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYWYvbm9kZV9tb2R1bGVzL3BlcmZvcm1hbmNlLW5vdy9saWIvcGVyZm9ybWFuY2Utbm93LmpzIiwibm9kZV9tb2R1bGVzL3JvdXRlLXRyaWUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1kb20vbm9kZV9tb2R1bGVzL2lzLW9iamVjdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS9ub2RlX21vZHVsZXMveC1pcy1hcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS9jcmVhdGUtZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92ZG9tL3BhdGNoLW9wLmpzIiwibm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2guanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdmRvbS91cGRhdGUtd2lkZ2V0LmpzIiwibm9kZV9tb2R1bGVzL3ZpcnR1YWwtZG9tL3Zub2RlL2hhbmRsZS10aHVuay5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy10aHVuay5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12bm9kZS5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy12dGV4dC5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS9pcy13aWRnZXQuanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdm5vZGUvdmVyc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92bm9kZS92cGF0Y2guanMiLCJub2RlX21vZHVsZXMvdmlydHVhbC1kb20vdnRyZWUvZGlmZi1wcm9wcy5qcyIsIm5vZGVfbW9kdWxlcy92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLmpzIiwic3JjL21pZGRsZXdhcmVzL2N1cnNvci1mcmVlemVySnMuanMiLCJzcmMvbWlkZGxld2FyZXMvbG9vcC12aXJ0dWFsRG9tLmpzIiwic3JjL21pZGRsZXdhcmVzL3RyaWUtcm91dGVUcmllLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDQU87UUFDQTtRQUNBOzs7QUNGUDs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDemFxQjtBQUNuQixXQURtQixNQUNuQixDQUFZLE1BQVosRUFBb0I7d0NBREQsUUFDQzs7QUFDbEIsU0FBSyxTQUFMLEdBQWlCLHdCQUFZLE1BQVosQ0FBakIsQ0FEa0I7R0FBcEI7OzZCQURtQjs7MEJBS2I7QUFDSixhQUFPLEtBQUssU0FBTCxDQUFlLEdBQWYsRUFBUCxDQURJOzs7OzBCQUlPO0FBQ1gsVUFBSSxVQUFLLE1BQUwsS0FBZ0IsQ0FBaEIsRUFBbUI7QUFDckIsZUFBTyxLQUFLLFNBQUwsQ0FBZSxHQUFmLGtEQUFQLENBRHFCO09BQXZCLE1BRU87OztBQUNMLGVBQU8saUJBQUssU0FBTCxFQUFlLEdBQWYsMkJBQVAsQ0FESztPQUZQOzs7OzZCQU9jO0FBQ2QsVUFBSSxVQUFLLE1BQUwsS0FBZ0IsQ0FBaEIsRUFBbUI7QUFDckIsZUFBTyxLQUFLLFNBQUwsQ0FBZSxNQUFmLGtEQUFQLENBRHFCO09BQXZCLE1BRU87OztBQUNMLGVBQU8sa0JBQUssU0FBTCxFQUFlLE1BQWYsNEJBQVAsQ0FESztPQUZQOzs7OzhCQU9RLFVBQVU7QUFDbEIsYUFBTyxLQUFLLFNBQUwsQ0FBZSxFQUFmLENBQWtCLFFBQWxCLEVBQTRCLFFBQTVCLENBQVAsQ0FEa0I7Ozs7Z0NBSVIsVUFBVTtBQUNwQixhQUFPLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsUUFBN0IsQ0FBUCxDQURvQjs7Ozs4QkFJWjtBQUNSLGFBQU8sS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixRQUF2QixFQUFpQyxLQUFLLFNBQUwsQ0FBZSxHQUFmLEVBQWpDLENBQVAsQ0FEUTs7O1NBakNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0dBO0FBQ25CLFdBRG1CLElBQ25CLENBQVksSUFBWixFQUFrQjt3Q0FEQyxNQUNEOztBQUNoQixTQUFLLE1BQUwsR0FBYyxJQUFkLENBRGdCOztBQUdoQixTQUFLLHlCQUFMLEdBQWlDLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBakMsQ0FIZ0I7O0FBS2hCLFNBQUssYUFBTCxHQUFxQixDQUFDLEdBQUcsS0FBSyxNQUFMLENBQUosRUFBckIsQ0FMZ0I7QUFNaEIsU0FBSyxRQUFMLEdBQWdCLDZCQUFXLEtBQUssYUFBTCxDQUEzQixDQU5nQjtHQUFsQjs7NkJBRG1COzs2QkFrQlY7QUFDUCx5QkFBSSxLQUFLLHlCQUFMLENBQUosQ0FETzs7OzswQ0FJYTtBQUNwQixVQUFJLFVBQVUsQ0FBQyxHQUFHLEtBQUssSUFBTCxDQUFKLEVBQVYsQ0FEZ0I7QUFFcEIsVUFBSSxVQUFVLG9CQUFTLEtBQUssYUFBTCxFQUFvQixPQUE3QixDQUFWLENBRmdCO0FBR3BCLFdBQUssUUFBTCxHQUFnQixxQkFBVSxLQUFLLFFBQUwsRUFBZSxPQUF6QixDQUFoQixDQUhvQjs7QUFLcEIsV0FBSyxhQUFMLEdBQXFCLE9BQXJCLENBTG9COzs7O3dCQVpYO0FBQ1QsYUFBTyxLQUFLLE1BQUwsQ0FERTs7Ozt3QkFJRTtBQUNYLGFBQU8sS0FBSyxRQUFMLENBREk7OztTQWRNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0hBO0FBQ25CLFdBRG1CLElBQ25CLEdBQWM7d0NBREssTUFDTDs7QUFDWixTQUFLLFdBQUwsR0FBbUIseUJBQW5CLENBRFk7R0FBZDs7NkJBRG1COzsyQkFLWixTQUFTO0FBQ2QsVUFBSSxnQkFBZ0IsS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBQXdCLE9BQXhCLENBQWhCLENBRFU7QUFFZCxhQUFPLElBQUksSUFBSixDQUFTLElBQVQsRUFBZSxhQUFmLENBQVAsQ0FGYzs7OzswQkFLVixNQUFNO0FBQ1YsVUFBSSxpQkFBaUIsS0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLElBQXZCLENBQWpCLENBRE07QUFFVixhQUFPLG1CQUFtQixJQUFuQixHQUNILElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsY0FBaEIsQ0FERyxHQUVILElBRkcsQ0FGRzs7Ozt1QkFPVCxXQUFXLFlBQVk7QUFDeEIsYUFBTyxVQUFVLGVBQVYsS0FBOEIsV0FBVyxlQUFYLENBRGI7OztTQWpCUDs7Ozs7SUFzQmY7QUFDSixXQURJLElBQ0osQ0FBWSxJQUFaLEVBQWtCLGFBQWxCLEVBQWlDO3dDQUQ3QixNQUM2Qjs7QUFDL0IsU0FBSyxNQUFMLEdBQWMsSUFBZCxDQUQrQjtBQUUvQixTQUFLLGVBQUwsR0FBdUIsYUFBdkIsQ0FGK0I7R0FBakM7OzZCQURJOzt3QkFNVTtBQUNaLGFBQU8sS0FBSyxlQUFMLENBQXFCLFVBQXJCLENBQWdDLE9BQWhDLENBREs7OztTQU5WOzs7SUFXQTtBQUNKLFdBREksS0FDSixDQUFZLElBQVosRUFBa0IsY0FBbEIsRUFBa0M7d0NBRDlCLE9BQzhCOztBQUNoQyxTQUFLLE1BQUwsR0FBYyxJQUFkLENBRGdDO0FBRWhDLFNBQUssZ0JBQUwsR0FBd0IsY0FBeEIsQ0FGZ0M7R0FBbEM7OzZCQURJOzt3QkFNUztBQUNYLGFBQU8sS0FBSyxnQkFBTCxDQUFzQixNQUF0QixDQURJOzs7O3dCQUlGO0FBQ1QsYUFBTyxJQUFJLElBQUosQ0FBUyxLQUFLLE1BQUwsRUFBYSxLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQTdCLENBRFM7OztTQVZQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBDdXJzb3JfRnJlZXplckpzIGZyb20gJy4vc3JjL21pZGRsZXdhcmVzL2N1cnNvci1mcmVlemVySnMnO1xuZXhwb3J0IExvb3BfVmlydHVhbERvbSBmcm9tICcuL3NyYy9taWRkbGV3YXJlcy9sb29wLXZpcnR1YWxEb20nO1xuZXhwb3J0IFRyaWVfUm91dGVUcmllIGZyb20gJy4vc3JjL21pZGRsZXdhcmVzL3RyaWUtcm91dGVUcmllJztcbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59OyIsIiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIEZyZWV6ZXIgPSByZXF1aXJlKCcuL3NyYy9mcmVlemVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEZyZWV6ZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFV0aWxzID0gcmVxdWlyZSggJy4vdXRpbHMnICk7XHJcblxyXG5cclxuXHJcbi8vI2J1aWxkXHJcblxyXG5cclxudmFyIEJFRk9SRUFMTCA9ICdiZWZvcmVBbGwnLFxyXG5cdEFGVEVSQUxMID0gJ2FmdGVyQWxsJ1xyXG47XHJcbnZhciBzcGVjaWFsRXZlbnRzID0gWydpbW1lZGlhdGUnLCBCRUZPUkVBTEwsIEFGVEVSQUxMXTtcclxuXHJcbi8vIFRoZSBwcm90b3R5cGUgbWV0aG9kcyBhcmUgc3RvcmVkIGluIGEgZGlmZmVyZW50IG9iamVjdFxyXG4vLyBhbmQgYXBwbGllZCBhcyBub24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGxhdGVyXHJcbnZhciBlbWl0dGVyUHJvdG8gPSB7XHJcblx0b246IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyLCBvbmNlICl7XHJcblx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcclxuXHJcblx0XHRsaXN0ZW5lcnMucHVzaCh7IGNhbGxiYWNrOiBsaXN0ZW5lciwgb25jZTogb25jZX0pO1xyXG5cdFx0dGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXSA9ICBsaXN0ZW5lcnM7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0b25jZTogZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKXtcclxuXHRcdHJldHVybiB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyLCB0cnVlICk7XHJcblx0fSxcclxuXHJcblx0b2ZmOiBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApe1xyXG5cdFx0aWYoIHR5cGVvZiBldmVudE5hbWUgPT0gJ3VuZGVmaW5lZCcgKXtcclxuXHRcdFx0dGhpcy5fZXZlbnRzID0ge307XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCB0eXBlb2YgbGlzdGVuZXIgPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRcdHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF0gPSBbXTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXSxcclxuXHRcdFx0XHRpXHJcblx0XHRcdDtcclxuXHJcblx0XHRcdGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdGlmKCBsaXN0ZW5lcnNbaV0uY2FsbGJhY2sgPT09IGxpc3RlbmVyIClcclxuXHRcdFx0XHRcdGxpc3RlbmVycy5zcGxpY2UoIGksIDEgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudE5hbWUgKXtcclxuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICksXHJcblx0XHRcdGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF0gfHwgW10sXHJcblx0XHRcdG9uY2VMaXN0ZW5lcnMgPSBbXSxcclxuXHRcdFx0c3BlY2lhbCA9IHNwZWNpYWxFdmVudHMuaW5kZXhPZiggZXZlbnROYW1lICkgIT0gLTEsXHJcblx0XHRcdGksIGxpc3RlbmVyXHJcblx0XHQ7XHJcblxyXG5cdFx0c3BlY2lhbCB8fCB0aGlzLnRyaWdnZXIuYXBwbHkoIHRoaXMsIFtCRUZPUkVBTEwsIGV2ZW50TmFtZV0uY29uY2F0KCBhcmdzICkgKTtcclxuXHJcblx0XHQvLyBDYWxsIGxpc3RlbmVyc1xyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuXHJcblx0XHRcdGlmKCBsaXN0ZW5lci5jYWxsYmFjayApXHJcblx0XHRcdFx0bGlzdGVuZXIuY2FsbGJhY2suYXBwbHkoIHRoaXMsIGFyZ3MgKTtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm90IGEgY2FsbGJhY2ssIHJlbW92ZSFcclxuXHRcdFx0XHRsaXN0ZW5lci5vbmNlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoIGxpc3RlbmVyLm9uY2UgKVxyXG5cdFx0XHRcdG9uY2VMaXN0ZW5lcnMucHVzaCggaSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlbW92ZSBsaXN0ZW5lcnMgbWFya2VkIGFzIG9uY2VcclxuXHRcdGZvciggaSA9IG9uY2VMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKXtcclxuXHRcdFx0bGlzdGVuZXJzLnNwbGljZSggb25jZUxpc3RlbmVyc1tpXSwgMSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNwZWNpYWwgfHwgdGhpcy50cmlnZ2VyLmFwcGx5KCB0aGlzLCBbQUZURVJBTEwsIGV2ZW50TmFtZV0uY29uY2F0KCBhcmdzICkgKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn07XHJcblxyXG4vLyBNZXRob2RzIGFyZSBub3QgZW51bWVyYWJsZSBzbywgd2hlbiB0aGUgc3RvcmVzIGFyZVxyXG4vLyBleHRlbmRlZCB3aXRoIHRoZSBlbWl0dGVyLCB0aGV5IGNhbiBiZSBpdGVyYXRlZCBhc1xyXG4vLyBoYXNobWFwc1xyXG52YXIgRW1pdHRlciA9IFV0aWxzLmNyZWF0ZU5vbkVudW1lcmFibGUoIGVtaXR0ZXJQcm90byApO1xyXG4vLyNidWlsZFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgVXRpbHMgPSByZXF1aXJlKCAnLi91dGlscy5qcycgKSxcclxuXHRFbWl0dGVyID0gcmVxdWlyZSggJy4vZW1pdHRlcicgKSxcclxuXHRNaXhpbnMgPSByZXF1aXJlKCAnLi9taXhpbnMnICksXHJcblx0RnJvemVuID0gcmVxdWlyZSggJy4vZnJvemVuJyApXHJcbjtcclxuXHJcbi8vI2J1aWxkXHJcbnZhciBGcmVlemVyID0gZnVuY3Rpb24oIGluaXRpYWxWYWx1ZSwgb3B0aW9ucyApIHtcclxuXHR2YXIgbWUgPSB0aGlzLFxyXG5cdFx0bXV0YWJsZSA9ICggb3B0aW9ucyAmJiBvcHRpb25zLm11dGFibGUgKSB8fCBmYWxzZSxcclxuXHRcdGxpdmUgPSAoIG9wdGlvbnMgJiYgb3B0aW9ucy5saXZlICkgfHwgbGl2ZVxyXG5cdDtcclxuXHJcblx0Ly8gSW1tdXRhYmxlIGRhdGFcclxuXHR2YXIgZnJvemVuO1xyXG5cdHZhciBwaXZvdFRyaWdnZXJzID0gW10sIHBpdm90VGlja2luZyA9IDA7XHJcblx0dmFyIHRyaWdnZXJOb3cgPSBmdW5jdGlvbiggbm9kZSApe1xyXG5cdFx0dmFyIF8gPSBub2RlLl9fLFxyXG5cdFx0XHRpXHJcblx0XHQ7XHJcblx0XHRpZiggXy5saXN0ZW5lciApe1xyXG5cdFx0XHRGcm96ZW4udHJpZ2dlciggbm9kZSwgJ3VwZGF0ZScsIDAsIHRydWUgKTtcclxuXHJcblx0XHRcdGlmKCAhXy5wYXJlbnRzLmxlbmd0aCApXHJcblx0XHRcdFx0Xy5saXN0ZW5lci50cmlnZ2VyKCdpbW1lZGlhdGUnLCAnbm93Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IF8ucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRub3RpZnkoJ25vdycsIF8ucGFyZW50c1tpXSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHR2YXIgYWRkVG9QaXZvdFRyaWdnZXJzID0gZnVuY3Rpb24oIG5vZGUgKXtcclxuXHRcdHBpdm90VHJpZ2dlcnMucHVzaCggbm9kZSApO1xyXG5cdFx0aWYoICFwaXZvdFRpY2tpbmcgKXtcclxuXHRcdFx0cGl2b3RUaWNraW5nID0gMTtcclxuXHRcdFx0VXRpbHMubmV4dFRpY2soIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0cGl2b3RUcmlnZ2VycyA9IFtdO1xyXG5cdFx0XHRcdHBpdm90VGlja2luZyA9IDA7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgbm90aWZ5ID0gZnVuY3Rpb24gbm90aWZ5KCBldmVudE5hbWUsIG5vZGUsIG9wdGlvbnMgKXtcclxuXHRcdHZhciBfID0gbm9kZS5fXyxcclxuXHRcdFx0bm93Tm9kZVxyXG5cdFx0O1xyXG5cclxuXHRcdGlmKCBldmVudE5hbWUgPT0gJ2xpc3RlbmVyJyApXHJcblx0XHRcdHJldHVybiBGcm96ZW4uY3JlYXRlTGlzdGVuZXIoIG5vZGUgKTtcclxuXHJcblx0XHRpZiggZXZlbnROYW1lID09ICdub3cnICl7XHJcblx0XHRcdGlmKCBwaXZvdFRyaWdnZXJzLmxlbmd0aCApe1xyXG5cdFx0XHRcdHdoaWxlKCBwaXZvdFRyaWdnZXJzLmxlbmd0aCApe1xyXG5cdFx0XHRcdFx0bm93Tm9kZSA9IHBpdm90VHJpZ2dlcnMuc2hpZnQoKTtcclxuXHRcdFx0XHRcdHRyaWdnZXJOb3coIG5vd05vZGUgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dHJpZ2dlck5vdyggbm9kZSApO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBub2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB1cGRhdGUgPSBGcm96ZW4udXBkYXRlKCBldmVudE5hbWUsIG5vZGUsIG9wdGlvbnMgKTtcclxuXHJcblx0XHRpZiggZXZlbnROYW1lICE9ICdwaXZvdCcgKXtcclxuXHRcdFx0dmFyIHBpdm90ID0gVXRpbHMuZmluZFBpdm90KCB1cGRhdGUgKTtcclxuXHRcdFx0aWYoIHBpdm90ICkge1xyXG5cdFx0XHRcdGFkZFRvUGl2b3RUcmlnZ2VycyggdXBkYXRlICk7XHJcblx0ICBcdFx0XHRyZXR1cm4gcGl2b3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXBkYXRlO1xyXG5cdH07XHJcblxyXG5cdHZhciBmcmVlemUgPSBmdW5jdGlvbigpe307XHJcblx0aWYoICFtdXRhYmxlIClcclxuXHRcdGZyZWV6ZSA9IGZ1bmN0aW9uKCBvYmogKXsgT2JqZWN0LmZyZWV6ZSggb2JqICk7IH07XHJcblxyXG5cdC8vIENyZWF0ZSB0aGUgZnJvemVuIG9iamVjdFxyXG5cdGZyb3plbiA9IEZyb3plbi5mcmVlemUoIGluaXRpYWxWYWx1ZSwgbm90aWZ5LCBmcmVlemUsIGxpdmUgKTtcclxuXHJcblx0Ly8gTGlzdGVuIHRvIGl0cyBjaGFuZ2VzIGltbWVkaWF0ZWx5XHJcblx0dmFyIGxpc3RlbmVyID0gZnJvemVuLmdldExpc3RlbmVyKCk7XHJcblxyXG5cdC8vIFVwZGF0aW5nIGZsYWcgdG8gdHJpZ2dlciB0aGUgZXZlbnQgb24gbmV4dFRpY2tcclxuXHR2YXIgdXBkYXRpbmcgPSBmYWxzZTtcclxuXHJcblx0bGlzdGVuZXIub24oICdpbW1lZGlhdGUnLCBmdW5jdGlvbiggcHJldk5vZGUsIHVwZGF0ZWQgKXtcclxuXHJcblx0XHRpZiggcHJldk5vZGUgPT0gJ25vdycgKXtcclxuXHRcdFx0aWYoICF1cGRhdGluZyApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm4gbWUudHJpZ2dlciggJ3VwZGF0ZScsIGZyb3plbiApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBwcmV2Tm9kZSAhPSBmcm96ZW4gKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0ZnJvemVuID0gdXBkYXRlZDtcclxuXHJcblx0XHRpZiggbGl2ZSApXHJcblx0XHRcdHJldHVybiBtZS50cmlnZ2VyKCAndXBkYXRlJywgdXBkYXRlZCApO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgb24gbmV4dCB0aWNrXHJcblx0XHRpZiggIXVwZGF0aW5nICl7XHJcblx0XHRcdHVwZGF0aW5nID0gdHJ1ZTtcclxuXHRcdFx0VXRpbHMubmV4dFRpY2soIGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoIHVwZGF0aW5nICl7XHJcblx0XHRcdFx0XHR1cGRhdGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0bWUudHJpZ2dlciggJ3VwZGF0ZScsIGZyb3plbiApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdFV0aWxzLmFkZE5FKCB0aGlzLCB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBmcm96ZW47XHJcblx0XHR9LFxyXG5cdFx0c2V0OiBmdW5jdGlvbiggbm9kZSApe1xyXG5cdFx0XHR2YXIgbmV3Tm9kZSA9IG5vdGlmeSggJ3Jlc2V0JywgZnJvemVuLCBub2RlICk7XHJcblx0XHRcdG5ld05vZGUuX18ubGlzdGVuZXIudHJpZ2dlciggJ2ltbWVkaWF0ZScsIGZyb3plbiwgbmV3Tm9kZSApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRVdGlscy5hZGRORSggdGhpcywgeyBnZXREYXRhOiB0aGlzLmdldCwgc2V0RGF0YTogdGhpcy5zZXQgfSApO1xyXG5cclxuXHQvLyBUaGUgZXZlbnQgc3RvcmVcclxuXHR0aGlzLl9ldmVudHMgPSBbXTtcclxufVxyXG5cclxuRnJlZXplci5wcm90b3R5cGUgPSBVdGlscy5jcmVhdGVOb25FbnVtZXJhYmxlKHtjb25zdHJ1Y3RvcjogRnJlZXplcn0sIEVtaXR0ZXIpO1xyXG4vLyNidWlsZFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmVlemVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgVXRpbHMgPSByZXF1aXJlKCAnLi91dGlscycgKSxcclxuXHRNaXhpbnMgPSByZXF1aXJlKCAnLi9taXhpbnMnKSxcclxuXHRFbWl0dGVyID0gcmVxdWlyZSgnLi9lbWl0dGVyJylcclxuO1xyXG5cclxuLy8jYnVpbGRcclxudmFyIEZyb3plbiA9IHtcclxuXHRmcmVlemU6IGZ1bmN0aW9uKCBub2RlLCBub3RpZnksIGZyZWV6ZUZuLCBsaXZlICl7XHJcblx0XHRpZiggbm9kZSAmJiBub2RlLl9fICl7XHJcblx0XHRcdHJldHVybiBub2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdGZyb3plbiwgbWl4aW4sIGNvbnNcclxuXHRcdDtcclxuXHJcblx0XHRpZiggbm9kZS5jb25zdHJ1Y3RvciA9PSBBcnJheSApe1xyXG5cdFx0XHRmcm96ZW4gPSB0aGlzLmNyZWF0ZUFycmF5KCBub2RlLmxlbmd0aCApO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGZyb3plbiA9IE9iamVjdC5jcmVhdGUoIE1peGlucy5IYXNoICk7XHJcblx0XHR9XHJcblxyXG5cdFx0VXRpbHMuYWRkTkUoIGZyb3plbiwgeyBfXzoge1xyXG5cdFx0XHRsaXN0ZW5lcjogZmFsc2UsXHJcblx0XHRcdHBhcmVudHM6IFtdLFxyXG5cdFx0XHRub3RpZnk6IG5vdGlmeSxcclxuXHRcdFx0ZnJlZXplRm46IGZyZWV6ZUZuLFxyXG5cdFx0XHRsaXZlOiBsaXZlIHx8IGZhbHNlXHJcblx0XHR9fSk7XHJcblxyXG5cdFx0Ly8gRnJlZXplIGNoaWxkcmVuXHJcblx0XHRVdGlscy5lYWNoKCBub2RlLCBmdW5jdGlvbiggY2hpbGQsIGtleSApe1xyXG5cdFx0XHRjb25zID0gY2hpbGQgJiYgY2hpbGQuY29uc3RydWN0b3I7XHJcblx0XHRcdGlmKCBjb25zID09IEFycmF5IHx8IGNvbnMgPT0gT2JqZWN0ICl7XHJcblx0XHRcdFx0Y2hpbGQgPSBtZS5mcmVlemUoIGNoaWxkLCBub3RpZnksIGZyZWV6ZUZuLCBsaXZlICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjaGlsZCAmJiBjaGlsZC5fXyApe1xyXG5cdFx0XHRcdG1lLmFkZFBhcmVudCggY2hpbGQsIGZyb3plbiApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmcm96ZW5bIGtleSBdID0gY2hpbGQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRmcmVlemVGbiggZnJvemVuICk7XHJcblxyXG5cdFx0cmV0dXJuIGZyb3plbjtcclxuXHR9LFxyXG5cclxuXHR1cGRhdGU6IGZ1bmN0aW9uKCB0eXBlLCBub2RlLCBvcHRpb25zICl7XHJcblx0XHRpZiggIXRoaXNbIHR5cGUgXSlcclxuXHRcdFx0cmV0dXJuIFV0aWxzLmVycm9yKCAnVW5rbm93biB1cGRhdGUgdHlwZTogJyArIHR5cGUgKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpc1sgdHlwZSBdKCBub2RlLCBvcHRpb25zICk7XHJcblx0fSxcclxuXHJcblx0cmVzZXQ6IGZ1bmN0aW9uKCBub2RlLCB2YWx1ZSApe1xyXG5cdFx0dmFyIG1lID0gdGhpcyxcclxuXHRcdFx0XyA9IG5vZGUuX18sXHJcblx0XHRcdGZyb3plbiA9IHZhbHVlXHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoICFmcm96ZW4uX18gKXtcclxuXHRcdFx0ZnJvemVuID0gdGhpcy5mcmVlemUoIHZhbHVlLCBfLm5vdGlmeSwgXy5mcmVlemVGbiwgXy5saXZlICk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnJvemVuLl9fLmxpc3RlbmVyID0gXy5saXN0ZW5lcjtcclxuXHRcdGZyb3plbi5fXy5wYXJlbnRzID0gXy5wYXJlbnRzO1xyXG5cclxuXHRcdC8vIFNldCBiYWNrIHRoZSBwYXJlbnQgb24gdGhlIGNoaWxkcmVuXHJcblx0XHQvLyB0aGF0IGhhdmUgYmVlbiB1cGRhdGVkXHJcblx0XHR0aGlzLmZpeENoaWxkcmVuKCBmcm96ZW4sIG5vZGUgKTtcclxuXHRcdFV0aWxzLmVhY2goIGZyb3plbiwgZnVuY3Rpb24oIGNoaWxkICl7XHJcblx0XHRcdGlmKCBjaGlsZCAmJiBjaGlsZC5fXyApe1xyXG5cdFx0XHRcdG1lLnJlbW92ZVBhcmVudCggbm9kZSApO1xyXG5cdFx0XHRcdG1lLmFkZFBhcmVudCggY2hpbGQsIGZyb3plbiApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gZnJvemVuO1xyXG5cdH0sXHJcblxyXG5cdG1lcmdlOiBmdW5jdGlvbiggbm9kZSwgYXR0cnMgKXtcclxuXHRcdHZhciBfID0gbm9kZS5fXyxcclxuXHRcdFx0dHJhbnMgPSBfLnRyYW5zLFxyXG5cclxuXHRcdFx0Ly8gQ2xvbmUgdGhlIGF0dHJzIHRvIG5vdCBtb2RpZnkgdGhlIGFyZ3VtZW50XHJcblx0XHRcdGF0dHJzID0gVXRpbHMuZXh0ZW5kKCB7fSwgYXR0cnMpXHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoIHRyYW5zICl7XHJcblxyXG5cdFx0XHRmb3IoIHZhciBhdHRyIGluIGF0dHJzIClcclxuXHRcdFx0XHR0cmFuc1sgYXR0ciBdID0gYXR0cnNbIGF0dHIgXTtcclxuXHRcdFx0cmV0dXJuIG5vZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG1lID0gdGhpcyxcclxuXHRcdFx0ZnJvemVuID0gdGhpcy5jb3B5TWV0YSggbm9kZSApLFxyXG5cdFx0XHRub3RpZnkgPSBfLm5vdGlmeSxcclxuXHRcdFx0dmFsLCBjb25zLCBrZXksIGlzRnJvemVuXHJcblx0XHQ7XHJcblxyXG5cdFx0VXRpbHMuZWFjaCggbm9kZSwgZnVuY3Rpb24oIGNoaWxkLCBrZXkgKXtcclxuXHRcdFx0aXNGcm96ZW4gPSBjaGlsZCAmJiBjaGlsZC5fXztcclxuXHJcblx0XHRcdGlmKCBpc0Zyb3plbiApe1xyXG5cdFx0XHRcdG1lLnJlbW92ZVBhcmVudCggY2hpbGQsIG5vZGUgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFsID0gYXR0cnNbIGtleSBdO1xyXG5cdFx0XHRpZiggIXZhbCApe1xyXG5cdFx0XHRcdGlmKCBpc0Zyb3plbiApXHJcblx0XHRcdFx0XHRtZS5hZGRQYXJlbnQoIGNoaWxkLCBmcm96ZW4gKTtcclxuXHRcdFx0XHRyZXR1cm4gZnJvemVuWyBrZXkgXSA9IGNoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zID0gdmFsICYmIHZhbC5jb25zdHJ1Y3RvcjtcclxuXHJcblx0XHRcdGlmKCBjb25zID09IEFycmF5IHx8IGNvbnMgPT0gT2JqZWN0IClcclxuXHRcdFx0XHR2YWwgPSBtZS5mcmVlemUoIHZhbCwgbm90aWZ5LCBfLmZyZWV6ZUZuLCBfLmxpdmUgKTtcclxuXHJcblx0XHRcdGlmKCB2YWwgJiYgdmFsLl9fIClcclxuXHRcdFx0XHRtZS5hZGRQYXJlbnQoIHZhbCwgZnJvemVuICk7XHJcblxyXG5cdFx0XHRkZWxldGUgYXR0cnNbIGtleSBdO1xyXG5cclxuXHRcdFx0ZnJvemVuWyBrZXkgXSA9IHZhbDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHRmb3IoIGtleSBpbiBhdHRycyApIHtcclxuXHRcdFx0dmFsID0gYXR0cnNbIGtleSBdO1xyXG5cdFx0XHRjb25zID0gdmFsICYmIHZhbC5jb25zdHJ1Y3RvcjtcclxuXHJcblx0XHRcdGlmKCBjb25zID09IEFycmF5IHx8IGNvbnMgPT0gT2JqZWN0IClcclxuXHRcdFx0XHR2YWwgPSBtZS5mcmVlemUoIHZhbCwgbm90aWZ5LCBfLmZyZWV6ZUZuLCBfLmxpdmUgKTtcclxuXHJcblx0XHRcdGlmKCB2YWwgJiYgdmFsLl9fIClcclxuXHRcdFx0XHRtZS5hZGRQYXJlbnQoIHZhbCwgZnJvemVuICk7XHJcblxyXG5cdFx0XHRmcm96ZW5bIGtleSBdID0gdmFsO1xyXG5cdFx0fVxyXG5cclxuXHRcdF8uZnJlZXplRm4oIGZyb3plbiApO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaFBhcmVudHMoIG5vZGUsIGZyb3plbiApO1xyXG5cclxuXHRcdHJldHVybiBmcm96ZW47XHJcblx0fSxcclxuXHJcblx0cmVwbGFjZTogZnVuY3Rpb24oIG5vZGUsIHJlcGxhY2VtZW50ICkge1xyXG5cclxuXHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdGNvbnMgPSByZXBsYWNlbWVudCAmJiByZXBsYWNlbWVudC5jb25zdHJ1Y3RvcixcclxuXHRcdFx0XyA9IG5vZGUuX18sXHJcblx0XHRcdGZyb3plbiA9IHJlcGxhY2VtZW50XHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoIGNvbnMgPT0gQXJyYXkgfHwgY29ucyA9PSBPYmplY3QgKSB7XHJcblxyXG5cdFx0XHRmcm96ZW4gPSBtZS5mcmVlemUoIHJlcGxhY2VtZW50LCBfLm5vdGlmeSwgXy5mcmVlemVGbiwgXy5saXZlICk7XHJcblxyXG5cdFx0XHRmcm96ZW4uX18ucGFyZW50cyA9IF8ucGFyZW50cztcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgY3VycmVudCBsaXN0ZW5lciBpZiBleGlzdHMsIHJlcGxhY2luZyBhXHJcblx0XHRcdC8vIHByZXZpb3VzIGxpc3RlbmVyIGluIHRoZSBmcm96ZW4gaWYgZXhpc3RlZFxyXG5cdFx0XHRpZiggXy5saXN0ZW5lciApXHJcblx0XHRcdFx0ZnJvemVuLl9fLmxpc3RlbmVyID0gXy5saXN0ZW5lcjtcclxuXHJcblx0XHRcdC8vIFNpbmNlIHRoZSBwYXJlbnRzIHdpbGwgYmUgcmVmcmVzaGVkIGRpcmVjdGx5LFxyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBsaXN0ZW5lciBoZXJlXHJcblx0XHRcdHRoaXMudHJpZ2dlciggZnJvemVuLCAndXBkYXRlJywgZnJvemVuLCBfLmxpdmUgKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZWZyZXNoIHRoZSBwYXJlbnQgbm9kZXMgZGlyZWN0bHlcclxuXHRcdGlmKCAhXy5wYXJlbnRzLmxlbmd0aCAmJiBfLmxpc3RlbmVyICl7XHJcblx0XHRcdF8ubGlzdGVuZXIudHJpZ2dlciggJ2ltbWVkaWF0ZScsIG5vZGUsIGZyb3plbiApO1xyXG5cdFx0fVxyXG5cdFx0Zm9yICh2YXIgaSA9IF8ucGFyZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRcdHRoaXMucmVmcmVzaCggXy5wYXJlbnRzW2ldLCBub2RlLCBmcm96ZW4gKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmcm96ZW47XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiggbm9kZSwgYXR0cnMgKXtcclxuXHRcdHZhciB0cmFucyA9IG5vZGUuX18udHJhbnM7XHJcblx0XHRpZiggdHJhbnMgKXtcclxuXHRcdFx0Zm9yKCB2YXIgbCA9IGF0dHJzLmxlbmd0aCAtIDE7IGwgPj0gMDsgbC0tIClcclxuXHRcdFx0XHRkZWxldGUgdHJhbnNbIGF0dHJzW2xdIF07XHJcblx0XHRcdHJldHVybiBub2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBtZSA9IHRoaXMsXHJcblx0XHRcdGZyb3plbiA9IHRoaXMuY29weU1ldGEoIG5vZGUgKSxcclxuXHRcdFx0aXNGcm96ZW5cclxuXHRcdDtcclxuXHJcblx0XHRVdGlscy5lYWNoKCBub2RlLCBmdW5jdGlvbiggY2hpbGQsIGtleSApe1xyXG5cdFx0XHRpc0Zyb3plbiA9IGNoaWxkICYmIGNoaWxkLl9fO1xyXG5cclxuXHRcdFx0aWYoIGlzRnJvemVuICl7XHJcblx0XHRcdFx0bWUucmVtb3ZlUGFyZW50KCBjaGlsZCwgbm9kZSApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggYXR0cnMuaW5kZXhPZigga2V5ICkgIT0gLTEgKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBpc0Zyb3plbiApXHJcblx0XHRcdFx0bWUuYWRkUGFyZW50KCBjaGlsZCwgZnJvemVuICk7XHJcblxyXG5cdFx0XHRmcm96ZW5bIGtleSBdID0gY2hpbGQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHRub2RlLl9fLmZyZWV6ZUZuKCBmcm96ZW4gKTtcclxuXHRcdHRoaXMucmVmcmVzaFBhcmVudHMoIG5vZGUsIGZyb3plbiApO1xyXG5cclxuXHRcdHJldHVybiBmcm96ZW47XHJcblx0fSxcclxuXHJcblx0c3BsaWNlOiBmdW5jdGlvbiggbm9kZSwgYXJncyApe1xyXG5cdFx0dmFyIF8gPSBub2RlLl9fLFxyXG5cdFx0XHR0cmFucyA9IF8udHJhbnNcclxuXHRcdDtcclxuXHJcblx0XHRpZiggdHJhbnMgKXtcclxuXHRcdFx0dHJhbnMuc3BsaWNlLmFwcGx5KCB0cmFucywgYXJncyApO1xyXG5cdFx0XHRyZXR1cm4gbm9kZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbWUgPSB0aGlzLFxyXG5cdFx0XHRmcm96ZW4gPSB0aGlzLmNvcHlNZXRhKCBub2RlICksXHJcblx0XHRcdGluZGV4ID0gYXJnc1swXSxcclxuXHRcdFx0ZGVsZXRlSW5kZXggPSBpbmRleCArIGFyZ3NbMV0sXHJcblx0XHRcdGNvbiwgY2hpbGRcclxuXHRcdDtcclxuXHJcblx0XHQvLyBDbG9uZSB0aGUgYXJyYXlcclxuXHRcdFV0aWxzLmVhY2goIG5vZGUsIGZ1bmN0aW9uKCBjaGlsZCwgaSApe1xyXG5cclxuXHRcdFx0aWYoIGNoaWxkICYmIGNoaWxkLl9fICl7XHJcblx0XHRcdFx0bWUucmVtb3ZlUGFyZW50KCBjaGlsZCwgbm9kZSApO1xyXG5cclxuXHRcdFx0XHQvLyBTa2lwIHRoZSBub2RlcyB0byBkZWxldGVcclxuXHRcdFx0XHRpZiggaSA8IGluZGV4IHx8IGk+PSBkZWxldGVJbmRleCApXHJcblx0XHRcdFx0XHRtZS5hZGRQYXJlbnQoIGNoaWxkLCBmcm96ZW4gKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnJvemVuW2ldID0gY2hpbGQ7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBQcmVwYXJlIHRoZSBuZXcgbm9kZXNcclxuXHRcdGlmKCBhcmdzLmxlbmd0aCA+IDEgKXtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IGFyZ3MubGVuZ3RoIC0gMTsgaSA+PSAyOyBpLS0pIHtcclxuXHRcdFx0XHRjaGlsZCA9IGFyZ3NbaV07XHJcblx0XHRcdFx0Y29uID0gY2hpbGQgJiYgY2hpbGQuY29uc3RydWN0b3I7XHJcblxyXG5cdFx0XHRcdGlmKCBjb24gPT0gQXJyYXkgfHwgY29uID09IE9iamVjdCApXHJcblx0XHRcdFx0XHRjaGlsZCA9IHRoaXMuZnJlZXplKCBjaGlsZCwgXy5ub3RpZnksIF8uZnJlZXplRm4sIF8ubGl2ZSApO1xyXG5cclxuXHRcdFx0XHRpZiggY2hpbGQgJiYgY2hpbGQuX18gKVxyXG5cdFx0XHRcdFx0dGhpcy5hZGRQYXJlbnQoIGNoaWxkLCBmcm96ZW4gKTtcclxuXHJcblx0XHRcdFx0YXJnc1tpXSA9IGNoaWxkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gc3BsaWNlXHJcblx0XHRBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KCBmcm96ZW4sIGFyZ3MgKTtcclxuXHJcblx0XHRub2RlLl9fLmZyZWV6ZUZuKCBmcm96ZW4gKTtcclxuXHRcdHRoaXMucmVmcmVzaFBhcmVudHMoIG5vZGUsIGZyb3plbiApO1xyXG5cclxuXHRcdHJldHVybiBmcm96ZW47XHJcblx0fSxcclxuXHJcblx0dHJhbnNhY3Q6IGZ1bmN0aW9uKCBub2RlICkge1xyXG5cdFx0dmFyIG1lID0gdGhpcyxcclxuXHRcdFx0dHJhbnNhY3RpbmcgPSBub2RlLl9fLnRyYW5zLFxyXG5cdFx0XHR0cmFuc1xyXG5cdFx0O1xyXG5cclxuXHRcdGlmKCB0cmFuc2FjdGluZyApXHJcblx0XHRcdHJldHVybiB0cmFuc2FjdGluZztcclxuXHJcblx0XHR0cmFucyA9IG5vZGUuY29uc3RydWN0b3IgPT0gQXJyYXkgPyBbXSA6IHt9O1xyXG5cclxuXHRcdFV0aWxzLmVhY2goIG5vZGUsIGZ1bmN0aW9uKCBjaGlsZCwga2V5ICl7XHJcblx0XHRcdHRyYW5zWyBrZXkgXSA9IGNoaWxkO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0bm9kZS5fXy50cmFucyA9IHRyYW5zO1xyXG5cclxuXHRcdC8vIENhbGwgcnVuIGF1dG9tYXRpY2FsbHkgaW4gY2FzZVxyXG5cdFx0Ly8gdGhlIHVzZXIgZm9yZ290IGFib3V0IGl0XHJcblx0XHRVdGlscy5uZXh0VGljayggZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoIG5vZGUuX18udHJhbnMgKVxyXG5cdFx0XHRcdG1lLnJ1biggbm9kZSApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHRyYW5zO1xyXG5cdH0sXHJcblxyXG5cdHJ1bjogZnVuY3Rpb24oIG5vZGUgKSB7XHJcblx0XHR2YXIgbWUgPSB0aGlzLFxyXG5cdFx0XHR0cmFucyA9IG5vZGUuX18udHJhbnNcclxuXHRcdDtcclxuXHJcblx0XHRpZiggIXRyYW5zIClcclxuXHRcdFx0cmV0dXJuIG5vZGU7XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIHRoZSBub2RlIGFzIGEgcGFyZW50XHJcblx0XHRVdGlscy5lYWNoKCB0cmFucywgZnVuY3Rpb24oIGNoaWxkLCBrZXkgKXtcclxuXHRcdFx0aWYoIGNoaWxkICYmIGNoaWxkLl9fICl7XHJcblx0XHRcdFx0bWUucmVtb3ZlUGFyZW50KCBjaGlsZCwgbm9kZSApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRkZWxldGUgbm9kZS5fXy50cmFucztcclxuXHJcblx0XHR2YXIgcmVzdWx0ID0gdGhpcy5yZXBsYWNlKCBub2RlLCB0cmFucyApO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9LFxyXG5cclxuXHRwaXZvdDogZnVuY3Rpb24oIG5vZGUgKXtcclxuXHRcdG5vZGUuX18ucGl2b3QgPSAxO1xyXG5cdFx0dGhpcy51bnBpdm90KCBub2RlICk7XHJcblx0XHRyZXR1cm4gbm9kZTtcclxuXHR9LFxyXG5cclxuXHR1bnBpdm90OiBmdW5jdGlvbiggbm9kZSApe1xyXG5cdFx0VXRpbHMubmV4dFRpY2soIGZ1bmN0aW9uKCl7XHJcblx0XHRcdG5vZGUuX18ucGl2b3QgPSAwO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVmcmVzaDogZnVuY3Rpb24oIG5vZGUsIG9sZENoaWxkLCBuZXdDaGlsZCApe1xyXG5cdFx0dmFyIG1lID0gdGhpcyxcclxuXHRcdFx0dHJhbnMgPSBub2RlLl9fLnRyYW5zLFxyXG5cdFx0XHRmb3VuZCA9IDBcclxuXHRcdDtcclxuXHJcblx0XHRpZiggdHJhbnMgKXtcclxuXHJcblx0XHRcdFV0aWxzLmVhY2goIHRyYW5zLCBmdW5jdGlvbiggY2hpbGQsIGtleSApe1xyXG5cdFx0XHRcdGlmKCBmb3VuZCApIHJldHVybjtcclxuXHJcblx0XHRcdFx0aWYoIGNoaWxkID09PSBvbGRDaGlsZCApe1xyXG5cclxuXHRcdFx0XHRcdHRyYW5zWyBrZXkgXSA9IG5ld0NoaWxkO1xyXG5cdFx0XHRcdFx0Zm91bmQgPSAxO1xyXG5cclxuXHRcdFx0XHRcdGlmKCBuZXdDaGlsZCAmJiBuZXdDaGlsZC5fXyApXHJcblx0XHRcdFx0XHRcdG1lLmFkZFBhcmVudCggbmV3Q2hpbGQsIG5vZGUgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIG5vZGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGZyb3plbiA9IHRoaXMuY29weU1ldGEoIG5vZGUgKSxcclxuXHRcdFx0cmVwbGFjZW1lbnQsIF9fXHJcblx0XHQ7XHJcblxyXG5cdFx0VXRpbHMuZWFjaCggbm9kZSwgZnVuY3Rpb24oIGNoaWxkLCBrZXkgKXtcclxuXHRcdFx0aWYoIGNoaWxkID09PSBvbGRDaGlsZCApe1xyXG5cdFx0XHRcdGNoaWxkID0gbmV3Q2hpbGQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjaGlsZCAmJiAoX18gPSBjaGlsZC5fXykgKXtcclxuXHRcdFx0XHRtZS5yZW1vdmVQYXJlbnQoIGNoaWxkLCBub2RlICk7XHJcblx0XHRcdFx0bWUuYWRkUGFyZW50KCBjaGlsZCwgZnJvemVuICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZyb3plblsga2V5IF0gPSBjaGlsZDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG5vZGUuX18uZnJlZXplRm4oIGZyb3plbiApO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaFBhcmVudHMoIG5vZGUsIGZyb3plbiApO1xyXG5cdH0sXHJcblxyXG5cdGZpeENoaWxkcmVuOiBmdW5jdGlvbiggbm9kZSwgb2xkTm9kZSApe1xyXG5cdFx0dmFyIG1lID0gdGhpcztcclxuXHRcdFV0aWxzLmVhY2goIG5vZGUsIGZ1bmN0aW9uKCBjaGlsZCApe1xyXG5cdFx0XHRpZiggIWNoaWxkIHx8ICFjaGlsZC5fXyApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIGNoaWxkIGlzIGxpbmtlZCB0byB0aGUgbm9kZSxcclxuXHRcdFx0Ly8gbWF5YmUgaXRzIGNoaWxkcmVuIGFyZSBub3QgbGlua2VkXHJcblx0XHRcdGlmKCBjaGlsZC5fXy5wYXJlbnRzLmluZGV4T2YoIG5vZGUgKSAhPSAtMSApXHJcblx0XHRcdFx0cmV0dXJuIG1lLmZpeENoaWxkcmVuKCBjaGlsZCApO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIGNoaWxkIHdhc24ndCBsaW5rZWQgaXQgaXMgc3VyZVxyXG5cdFx0XHQvLyB0aGF0IGl0IHdhc24ndCBtb2RpZmllZC4gSnVzdCBsaW5rIGl0XHJcblx0XHRcdC8vIHRvIHRoZSBuZXcgcGFyZW50XHJcblx0XHRcdGlmKCBjaGlsZC5fXy5wYXJlbnRzLmxlbmd0aCA9PSAxIClcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGQuX18ucGFyZW50cyA9IFsgbm9kZSBdO1xyXG5cclxuXHRcdFx0aWYoIG9sZE5vZGUgKVxyXG5cdFx0XHRcdG1lLnJlbW92ZVBhcmVudCggY2hpbGQsIG9sZE5vZGUgKTtcclxuXHJcblx0XHRcdG1lLmFkZFBhcmVudCggY2hpbGQsIG5vZGUgKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGNvcHlNZXRhOiBmdW5jdGlvbiggbm9kZSApe1xyXG5cdFx0dmFyIG1lID0gdGhpcyxcclxuXHRcdFx0ZnJvemVuXHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoIG5vZGUuY29uc3RydWN0b3IgPT0gQXJyYXkgKXtcclxuXHRcdFx0ZnJvemVuID0gdGhpcy5jcmVhdGVBcnJheSggbm9kZS5sZW5ndGggKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmcm96ZW4gPSBPYmplY3QuY3JlYXRlKCBNaXhpbnMuSGFzaCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBfID0gbm9kZS5fXztcclxuXHJcblx0XHRVdGlscy5hZGRORSggZnJvemVuLCB7X186IHtcclxuXHRcdFx0bm90aWZ5OiBfLm5vdGlmeSxcclxuXHRcdFx0bGlzdGVuZXI6IF8ubGlzdGVuZXIsXHJcblx0XHRcdHBhcmVudHM6IF8ucGFyZW50cy5zbGljZSggMCApLFxyXG5cdFx0XHR0cmFuczogXy50cmFucyxcclxuXHRcdFx0ZnJlZXplRm46IF8uZnJlZXplRm4sXHJcblx0XHRcdHBpdm90OiBfLnBpdm90LFxyXG5cdFx0XHRsaXZlOiBfLmxpdmVcclxuXHRcdH19KTtcclxuXHJcblx0XHRpZiggXy5waXZvdCApXHJcblx0XHRcdHRoaXMudW5waXZvdCggZnJvemVuICk7XHJcblxyXG5cdFx0cmV0dXJuIGZyb3plbjtcclxuXHR9LFxyXG5cclxuXHRyZWZyZXNoUGFyZW50czogZnVuY3Rpb24oIG9sZENoaWxkLCBuZXdDaGlsZCApe1xyXG5cdFx0dmFyIF8gPSBvbGRDaGlsZC5fXyxcclxuXHRcdFx0aVxyXG5cdFx0O1xyXG5cclxuXHRcdHRoaXMudHJpZ2dlciggbmV3Q2hpbGQsICd1cGRhdGUnLCBuZXdDaGlsZCwgXy5saXZlICk7XHJcblxyXG5cdFx0aWYoICFfLnBhcmVudHMubGVuZ3RoICl7XHJcblx0XHRcdGlmKCBfLmxpc3RlbmVyICl7XHJcblx0XHRcdFx0Xy5saXN0ZW5lci50cmlnZ2VyKCAnaW1tZWRpYXRlJywgb2xkQ2hpbGQsIG5ld0NoaWxkICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmb3IgKGkgPSBfLnBhcmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0XHR0aGlzLnJlZnJlc2goIF8ucGFyZW50c1tpXSwgb2xkQ2hpbGQsIG5ld0NoaWxkICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW1vdmVQYXJlbnQ6IGZ1bmN0aW9uKCBub2RlLCBwYXJlbnQgKXtcclxuXHRcdHZhciBwYXJlbnRzID0gbm9kZS5fXy5wYXJlbnRzLFxyXG5cdFx0XHRpbmRleCA9IHBhcmVudHMuaW5kZXhPZiggcGFyZW50IClcclxuXHRcdDtcclxuXHJcblx0XHRpZiggaW5kZXggIT0gLTEgKXtcclxuXHRcdFx0cGFyZW50cy5zcGxpY2UoIGluZGV4LCAxICk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkUGFyZW50OiBmdW5jdGlvbiggbm9kZSwgcGFyZW50ICl7XHJcblx0XHR2YXIgcGFyZW50cyA9IG5vZGUuX18ucGFyZW50cyxcclxuXHRcdFx0aW5kZXggPSBwYXJlbnRzLmluZGV4T2YoIHBhcmVudCApXHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoIGluZGV4ID09IC0xICl7XHJcblx0XHRcdHBhcmVudHNbIHBhcmVudHMubGVuZ3RoIF0gPSBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dHJpZ2dlcjogZnVuY3Rpb24oIG5vZGUsIGV2ZW50TmFtZSwgcGFyYW0sIG5vdyApe1xyXG5cdFx0dmFyIGxpc3RlbmVyID0gbm9kZS5fXy5saXN0ZW5lcjtcclxuXHRcdGlmKCAhbGlzdGVuZXIgKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dmFyIHRpY2tpbmcgPSBsaXN0ZW5lci50aWNraW5nO1xyXG5cclxuXHRcdGlmKCBub3cgKXtcclxuXHRcdFx0aWYoIHRpY2tpbmcgfHwgcGFyYW0gKXtcclxuXHRcdFx0XHRsaXN0ZW5lci50aWNraW5nID0gMDtcclxuXHRcdFx0XHRsaXN0ZW5lci50cmlnZ2VyKCBldmVudE5hbWUsIHRpY2tpbmcgfHwgcGFyYW0gKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdGVuZXIudGlja2luZyA9IHBhcmFtO1xyXG5cdFx0aWYoICF0aWNraW5nICl7XHJcblx0XHRcdFV0aWxzLm5leHRUaWNrKCBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCBsaXN0ZW5lci50aWNraW5nICl7XHJcblx0XHRcdFx0XHR2YXIgdXBkYXRlZCA9IGxpc3RlbmVyLnRpY2tpbmc7XHJcblx0XHRcdFx0XHRsaXN0ZW5lci50aWNraW5nID0gMDtcclxuXHRcdFx0XHRcdGxpc3RlbmVyLnRyaWdnZXIoIGV2ZW50TmFtZSwgdXBkYXRlZCApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlTGlzdGVuZXI6IGZ1bmN0aW9uKCBmcm96ZW4gKXtcclxuXHRcdHZhciBsID0gZnJvemVuLl9fLmxpc3RlbmVyO1xyXG5cclxuXHRcdGlmKCAhbCApIHtcclxuXHRcdFx0bCA9IE9iamVjdC5jcmVhdGUoRW1pdHRlciwge1xyXG5cdFx0XHRcdF9ldmVudHM6IHtcclxuXHRcdFx0XHRcdHZhbHVlOiB7fSxcclxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZyb3plbi5fXy5saXN0ZW5lciA9IGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGw7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlQXJyYXk6IChmdW5jdGlvbigpe1xyXG5cdFx0Ly8gU2V0IGNyZWF0ZUFycmF5IG1ldGhvZFxyXG5cdFx0aWYoIFtdLl9fcHJvdG9fXyApXHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiggbGVuZ3RoICl7XHJcblx0XHRcdFx0dmFyIGFyciA9IG5ldyBBcnJheSggbGVuZ3RoICk7XHJcblx0XHRcdFx0YXJyLl9fcHJvdG9fXyA9IE1peGlucy5MaXN0O1xyXG5cdFx0XHRcdHJldHVybiBhcnI7XHJcblx0XHRcdH1cclxuXHRcdHJldHVybiBmdW5jdGlvbiggbGVuZ3RoICl7XHJcblx0XHRcdHZhciBhcnIgPSBuZXcgQXJyYXkoIGxlbmd0aCApLFxyXG5cdFx0XHRcdG1ldGhvZHMgPSBNaXhpbnMuYXJyYXlNZXRob2RzXHJcblx0XHRcdDtcclxuXHRcdFx0Zm9yKCB2YXIgbSBpbiBtZXRob2RzICl7XHJcblx0XHRcdFx0YXJyWyBtIF0gPSBtZXRob2RzWyBtIF07XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGFycjtcclxuXHRcdH1cclxuXHR9KSgpXHJcbn07XHJcbi8vI2J1aWxkXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZyb3plbjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFV0aWxzID0gcmVxdWlyZSggJy4vdXRpbHMuanMnICk7XHJcblxyXG4vLyNidWlsZFxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgZGVzY3JpcHRvcnMsIHRvIGJlIHVzZWQgYnkgT2JqZWN0LmNyZWF0ZS5cclxuICogQHBhcmFtICB7T2JqZWN0fSBhdHRycyBQcm9wZXJ0aWVzIHRvIGNyZWF0ZSBkZXNjcmlwdG9yc1xyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIEEgaGFzaCB3aXRoIHRoZSBkZXNjcmlwdG9ycy5cclxuICovXHJcbnZhciBjcmVhdGVORSA9IGZ1bmN0aW9uKCBhdHRycyApe1xyXG5cdHZhciBuZSA9IHt9O1xyXG5cclxuXHRmb3IoIHZhciBrZXkgaW4gYXR0cnMgKXtcclxuXHRcdG5lWyBrZXkgXSA9IHtcclxuXHRcdFx0d3JpdGFibGU6IHRydWUsXHJcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXHJcblx0XHRcdHZhbHVlOiBhdHRyc1sga2V5XVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIG5lO1xyXG59XHJcblxyXG52YXIgY29tbW9uTWV0aG9kcyA9IHtcclxuXHRzZXQ6IGZ1bmN0aW9uKCBhdHRyLCB2YWx1ZSApe1xyXG5cdFx0dmFyIGF0dHJzID0gYXR0cixcclxuXHRcdFx0dXBkYXRlID0gdGhpcy5fXy50cmFuc1xyXG5cdFx0O1xyXG5cclxuXHRcdGlmKCB0eXBlb2YgYXR0ciAhPSAnb2JqZWN0JyApe1xyXG5cdFx0XHRhdHRycyA9IHt9O1xyXG5cdFx0XHRhdHRyc1sgYXR0ciBdID0gdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoICF1cGRhdGUgKXtcclxuXHRcdFx0Zm9yKCB2YXIga2V5IGluIGF0dHJzICl7XHJcblx0XHRcdFx0dXBkYXRlID0gdXBkYXRlIHx8IHRoaXNbIGtleSBdICE9PSBhdHRyc1sga2V5IF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE5vIGNoYW5nZXMsIGp1c3QgcmV0dXJuIHRoZSBub2RlXHJcblx0XHRcdGlmKCAhdXBkYXRlIClcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdtZXJnZScsIHRoaXMsIGF0dHJzICk7XHJcblx0fSxcclxuXHJcblx0cmVzZXQ6IGZ1bmN0aW9uKCBhdHRycyApIHtcclxuXHRcdHJldHVybiB0aGlzLl9fLm5vdGlmeSggJ3JlcGxhY2UnLCB0aGlzLCBhdHRycyApO1xyXG5cdH0sXHJcblxyXG5cdGdldExpc3RlbmVyOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX18ubm90aWZ5KCAnbGlzdGVuZXInLCB0aGlzICk7XHJcblx0fSxcclxuXHJcblx0dG9KUzogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBqcztcclxuXHRcdGlmKCB0aGlzLmNvbnN0cnVjdG9yID09IEFycmF5ICl7XHJcblx0XHRcdGpzID0gbmV3IEFycmF5KCB0aGlzLmxlbmd0aCApO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGpzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0VXRpbHMuZWFjaCggdGhpcywgZnVuY3Rpb24oIGNoaWxkLCBpICl7XHJcblx0XHRcdGlmKCBjaGlsZCAmJiBjaGlsZC5fXyApXHJcblx0XHRcdFx0anNbIGkgXSA9IGNoaWxkLnRvSlMoKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGpzWyBpIF0gPSBjaGlsZDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBqcztcclxuXHR9LFxyXG5cclxuXHR0cmFuc2FjdDogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLl9fLm5vdGlmeSggJ3RyYW5zYWN0JywgdGhpcyApO1xyXG5cdH0sXHJcblxyXG5cdHJ1bjogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLl9fLm5vdGlmeSggJ3J1bicsIHRoaXMgKTtcclxuXHR9LFxyXG5cclxuXHRub3c6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdub3cnLCB0aGlzICk7XHJcblx0fSxcclxuXHJcblx0cGl2b3Q6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdwaXZvdCcsIHRoaXMgKTtcclxuXHR9XHJcbn07XHJcblxyXG52YXIgYXJyYXlNZXRob2RzID0gVXRpbHMuZXh0ZW5kKHtcclxuXHRwdXNoOiBmdW5jdGlvbiggZWwgKXtcclxuXHRcdHJldHVybiB0aGlzLmFwcGVuZCggW2VsXSApO1xyXG5cdH0sXHJcblxyXG5cdGFwcGVuZDogZnVuY3Rpb24oIGVscyApe1xyXG5cdFx0aWYoIGVscyAmJiBlbHMubGVuZ3RoIClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX18ubm90aWZ5KCAnc3BsaWNlJywgdGhpcywgW3RoaXMubGVuZ3RoLCAwXS5jb25jYXQoIGVscyApICk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRwb3A6IGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggIXRoaXMubGVuZ3RoIClcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX18ubm90aWZ5KCAnc3BsaWNlJywgdGhpcywgW3RoaXMubGVuZ3RoIC0xLCAxXSApO1xyXG5cdH0sXHJcblxyXG5cdHVuc2hpZnQ6IGZ1bmN0aW9uKCBlbCApe1xyXG5cdFx0cmV0dXJuIHRoaXMucHJlcGVuZCggW2VsXSApO1xyXG5cdH0sXHJcblxyXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCBlbHMgKXtcclxuXHRcdGlmKCBlbHMgJiYgZWxzLmxlbmd0aCApXHJcblx0XHRcdHJldHVybiB0aGlzLl9fLm5vdGlmeSggJ3NwbGljZScsIHRoaXMsIFswLCAwXS5jb25jYXQoIGVscyApICk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzaGlmdDogZnVuY3Rpb24oKXtcclxuXHRcdGlmKCAhdGhpcy5sZW5ndGggKVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdzcGxpY2UnLCB0aGlzLCBbMCwgMV0gKTtcclxuXHR9LFxyXG5cclxuXHRzcGxpY2U6IGZ1bmN0aW9uKCBpbmRleCwgdG9SZW1vdmUsIHRvQWRkICl7XHJcblx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdzcGxpY2UnLCB0aGlzLCBhcmd1bWVudHMgKTtcclxuXHR9XHJcbn0sIGNvbW1vbk1ldGhvZHMgKTtcclxuXHJcbnZhciBGcm96ZW5BcnJheSA9IE9iamVjdC5jcmVhdGUoIEFycmF5LnByb3RvdHlwZSwgY3JlYXRlTkUoIGFycmF5TWV0aG9kcyApICk7XHJcblxyXG52YXIgTWl4aW5zID0ge1xyXG5cclxuSGFzaDogT2JqZWN0LmNyZWF0ZSggT2JqZWN0LnByb3RvdHlwZSwgY3JlYXRlTkUoIFV0aWxzLmV4dGVuZCh7XHJcblx0cmVtb3ZlOiBmdW5jdGlvbigga2V5cyApe1xyXG5cdFx0dmFyIGZpbHRlcmVkID0gW10sXHJcblx0XHRcdGsgPSBrZXlzXHJcblx0XHQ7XHJcblxyXG5cdFx0aWYoIGtleXMuY29uc3RydWN0b3IgIT0gQXJyYXkgKVxyXG5cdFx0XHRrID0gWyBrZXlzIF07XHJcblxyXG5cdFx0Zm9yKCB2YXIgaSA9IDAsIGwgPSBrLmxlbmd0aDsgaTxsOyBpKysgKXtcclxuXHRcdFx0aWYoIHRoaXMuaGFzT3duUHJvcGVydHkoIGtbaV0gKSApXHJcblx0XHRcdFx0ZmlsdGVyZWQucHVzaCgga1tpXSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBmaWx0ZXJlZC5sZW5ndGggKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fXy5ub3RpZnkoICdyZW1vdmUnLCB0aGlzLCBmaWx0ZXJlZCApO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59LCBjb21tb25NZXRob2RzKSkpLFxyXG5cclxuTGlzdDogRnJvemVuQXJyYXksXHJcbmFycmF5TWV0aG9kczogYXJyYXlNZXRob2RzXHJcbn07XHJcbi8vI2J1aWxkXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1peGlucztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8jYnVpbGRcclxudmFyIGdsb2JhbCA9IChuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpKTtcclxuXHJcbnZhciBVdGlscyA9IHtcclxuXHRleHRlbmQ6IGZ1bmN0aW9uKCBvYiwgcHJvcHMgKXtcclxuXHRcdGZvciggdmFyIHAgaW4gcHJvcHMgKXtcclxuXHRcdFx0b2JbcF0gPSBwcm9wc1twXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBvYjtcclxuXHR9LFxyXG5cclxuXHRjcmVhdGVOb25FbnVtZXJhYmxlOiBmdW5jdGlvbiggb2JqLCBwcm90byApe1xyXG5cdFx0dmFyIG5lID0ge307XHJcblx0XHRmb3IoIHZhciBrZXkgaW4gb2JqIClcclxuXHRcdFx0bmVba2V5XSA9IHt2YWx1ZTogb2JqW2tleV0gfTtcclxuXHRcdHJldHVybiBPYmplY3QuY3JlYXRlKCBwcm90byB8fCB7fSwgbmUgKTtcclxuXHR9LFxyXG5cclxuXHRlcnJvcjogZnVuY3Rpb24oIG1lc3NhZ2UgKXtcclxuXHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoIG1lc3NhZ2UgKTtcclxuXHRcdGlmKCBjb25zb2xlIClcclxuXHRcdFx0cmV0dXJuIGNvbnNvbGUuZXJyb3IoIGVyciApO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aHJvdyBlcnI7XHJcblx0fSxcclxuXHJcblx0ZWFjaDogZnVuY3Rpb24oIG8sIGNsYmsgKXtcclxuXHRcdHZhciBpLGwsa2V5cztcclxuXHRcdGlmKCBvICYmIG8uY29uc3RydWN0b3IgPT0gQXJyYXkgKXtcclxuXHRcdFx0Zm9yIChpID0gMCwgbCA9IG8ubGVuZ3RoOyBpIDwgbDsgaSsrKVxyXG5cdFx0XHRcdGNsYmsoIG9baV0sIGkgKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRrZXlzID0gT2JqZWN0LmtleXMoIG8gKTtcclxuXHRcdFx0Zm9yKCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrIClcclxuXHRcdFx0XHRjbGJrKCBvWyBrZXlzW2ldIF0sIGtleXNbaV0gKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRORTogZnVuY3Rpb24oIG5vZGUsIGF0dHJzICl7XHJcblx0XHRmb3IoIHZhciBrZXkgaW4gYXR0cnMgKXtcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBub2RlLCBrZXksIHtcclxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXHJcblx0XHRcdFx0dmFsdWU6IGF0dHJzWyBrZXkgXVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBuZXh0VGljayAtIGJ5IHN0YWdhcyAvIHB1YmxpYyBkb21haW5cclxuICBcdG5leHRUaWNrOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgcXVldWUgPSBbXSxcclxuXHRcdFx0ZGlydHkgPSBmYWxzZSxcclxuXHRcdFx0Zm4sXHJcblx0XHRcdGhhc1Bvc3RNZXNzYWdlID0gISFnbG9iYWwucG9zdE1lc3NhZ2UgJiYgKHR5cGVvZiBXaW5kb3cgIT0gJ3VuZGVmaW5lZCcpICYmIChnbG9iYWwgaW5zdGFuY2VvZiBXaW5kb3cpLFxyXG5cdFx0XHRtZXNzYWdlTmFtZSA9ICduZXh0dGljaycsXHJcblx0XHRcdHRyaWdnZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBoYXNQb3N0TWVzc2FnZVxyXG5cdFx0XHRcdFx0PyBmdW5jdGlvbiB0cmlnZ2VyICgpIHtcclxuXHRcdFx0XHRcdGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlTmFtZSwgJyonKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0OiBmdW5jdGlvbiB0cmlnZ2VyICgpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBwcm9jZXNzUXVldWUoKSB9LCAwKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KCkpLFxyXG5cdFx0XHRwcm9jZXNzUXVldWUgPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBoYXNQb3N0TWVzc2FnZVxyXG5cdFx0XHRcdFx0PyBmdW5jdGlvbiBwcm9jZXNzUXVldWUgKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJiBldmVudC5kYXRhID09PSBtZXNzYWdlTmFtZSkge1xyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRcdGZsdXNoUXVldWUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0OiBmbHVzaFF1ZXVlO1xyXG4gICAgICBcdH0pKClcclxuICAgICAgO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZmx1c2hRdWV1ZSAoKSB7XHJcbiAgICAgICAgICB3aGlsZSAoZm4gPSBxdWV1ZS5zaGlmdCgpKSB7XHJcbiAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRpcnR5ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5leHRUaWNrIChmbikge1xyXG4gICAgICAgICAgcXVldWUucHVzaChmbik7XHJcbiAgICAgICAgICBpZiAoZGlydHkpIHJldHVybjtcclxuICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgIHRyaWdnZXIoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGhhc1Bvc3RNZXNzYWdlKSBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHByb2Nlc3NRdWV1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICBuZXh0VGljay5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcHJvY2Vzc1F1ZXVlLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5leHRUaWNrO1xyXG4gIH0pKCksXHJcblxyXG4gIGZpbmRQaXZvdDogZnVuY3Rpb24oIG5vZGUgKXtcclxuICBcdFx0aWYoICFub2RlIHx8ICFub2RlLl9fIClcclxuICBcdFx0XHRyZXR1cm47XHJcblxyXG4gIFx0XHRpZiggbm9kZS5fXy5waXZvdCApXHJcbiAgXHRcdFx0cmV0dXJuIG5vZGU7XHJcblxyXG4gIFx0XHR2YXIgZm91bmQgPSAwLFxyXG4gIFx0XHRcdHBhcmVudHMgPSBub2RlLl9fLnBhcmVudHMsXHJcbiAgXHRcdFx0aSA9IDAsXHJcbiAgXHRcdFx0cGFyZW50XHJcbiAgXHRcdDtcclxuXHJcbiAgXHRcdC8vIExvb2sgdXAgZm9yIHRoZSBwaXZvdCBpbiB0aGUgcGFyZW50c1xyXG4gIFx0XHR3aGlsZSggIWZvdW5kICYmIGkgPCBwYXJlbnRzLmxlbmd0aCApe1xyXG4gIFx0XHRcdHBhcmVudCA9IHBhcmVudHNbaV07XHJcbiAgXHRcdFx0aWYoIHBhcmVudC5fXy5waXZvdCApXHJcbiAgXHRcdFx0XHRmb3VuZCA9IHBhcmVudDtcclxuICBcdFx0XHRpKys7XHJcbiAgXHRcdH1cclxuXHJcbiAgXHRcdGlmKCBmb3VuZCApe1xyXG4gIFx0XHRcdHJldHVybiBmb3VuZDtcclxuICBcdFx0fVxyXG5cclxuICBcdFx0Ly8gSWYgbm90IGZvdW5kLCB0cnkgd2l0aCB0aGUgcGFyZW50J3MgcGFyZW50c1xyXG4gIFx0XHRpPTA7XHJcbiAgXHRcdHdoaWxlKCAhZm91bmQgJiYgaSA8IHBhcmVudHMubGVuZ3RoICl7XHJcblx0ICBcdFx0Zm91bmQgPSB0aGlzLmZpbmRQaXZvdCggcGFyZW50c1tpXSApO1xyXG5cdCAgXHRcdGkrKztcclxuXHQgIFx0fVxyXG5cclxuICBcdFx0cmV0dXJuIGZvdW5kO1xyXG4gIH1cclxufTtcclxuLy8jYnVpbGRcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzO1xyXG4iLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQ7XG59IGVsc2Uge1xuICAgIHZhciBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J107XG5cbiAgICBpZiAoIWRvY2N5KSB7XG4gICAgICAgIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXSA9IG1pbkRvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xufVxuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IHdpbmRvd1xuICAsIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnXVxuICAsIHN1ZmZpeCA9ICdBbmltYXRpb25GcmFtZSdcbiAgLCByYWYgPSBnbG9iYWxbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IGdsb2JhbFsnY2FuY2VsJyArIHN1ZmZpeF0gfHwgZ2xvYmFsWydjYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cblxuZm9yKHZhciBpID0gMDsgaSA8IHZlbmRvcnMubGVuZ3RoICYmICFyYWY7IGkrKykge1xuICByYWYgPSBnbG9iYWxbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gZ2xvYmFsW3ZlbmRvcnNbaV0gKyAnQ2FuY2VsJyArIHN1ZmZpeF1cbiAgICAgIHx8IGdsb2JhbFt2ZW5kb3JzW2ldICsgJ0NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxufVxuXG4vLyBTb21lIHZlcnNpb25zIG9mIEZGIGhhdmUgckFGIGJ1dCBub3QgY0FGXG5pZighcmFmIHx8ICFjYWYpIHtcbiAgdmFyIGxhc3QgPSAwXG4gICAgLCBpZCA9IDBcbiAgICAsIHF1ZXVlID0gW11cbiAgICAsIGZyYW1lRHVyYXRpb24gPSAxMDAwIC8gNjBcblxuICByYWYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGlmKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIF9ub3cgPSBub3coKVxuICAgICAgICAsIG5leHQgPSBNYXRoLm1heCgwLCBmcmFtZUR1cmF0aW9uIC0gKF9ub3cgLSBsYXN0KSlcbiAgICAgIGxhc3QgPSBuZXh0ICsgX25vd1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNwID0gcXVldWUuc2xpY2UoMClcbiAgICAgICAgLy8gQ2xlYXIgcXVldWUgaGVyZSB0byBwcmV2ZW50XG4gICAgICAgIC8vIGNhbGxiYWNrcyBmcm9tIGFwcGVuZGluZyBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgZnJhbWUncyBxdWV1ZVxuICAgICAgICBxdWV1ZS5sZW5ndGggPSAwXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKCFjcFtpXS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgY3BbaV0uY2FsbGJhY2sobGFzdClcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aHJvdyBlIH0sIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBNYXRoLnJvdW5kKG5leHQpKVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKHtcbiAgICAgIGhhbmRsZTogKytpZCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBpZFxuICB9XG5cbiAgY2FmID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihxdWV1ZVtpXS5oYW5kbGUgPT09IGhhbmRsZSkge1xuICAgICAgICBxdWV1ZVtpXS5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pIHtcbiAgLy8gV3JhcCBpbiBhIG5ldyBmdW5jdGlvbiB0byBwcmV2ZW50XG4gIC8vIGBjYW5jZWxgIHBvdGVudGlhbGx5IGJlaW5nIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBuYXRpdmUgckFGIGZ1bmN0aW9uXG4gIHJldHVybiByYWYuY2FsbChnbG9iYWwsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShnbG9iYWwsIGFyZ3VtZW50cylcbn1cbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbihmdW5jdGlvbigpIHtcbiAgdmFyIGdldE5hbm9TZWNvbmRzLCBocnRpbWUsIGxvYWRUaW1lO1xuXG4gIGlmICgodHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsKSAmJiBwZXJmb3JtYW5jZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwpICYmIHByb2Nlc3MuaHJ0aW1lKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoZ2V0TmFub1NlY29uZHMoKSAtIGxvYWRUaW1lKSAvIDFlNjtcbiAgICB9O1xuICAgIGhydGltZSA9IHByb2Nlc3MuaHJ0aW1lO1xuICAgIGdldE5hbm9TZWNvbmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHI7XG4gICAgICBociA9IGhydGltZSgpO1xuICAgICAgcmV0dXJuIGhyWzBdICogMWU5ICsgaHJbMV07XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IGdldE5hbm9TZWNvbmRzKCk7XG4gIH0gZWxzZSBpZiAoRGF0ZS5ub3cpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIERhdGUubm93KCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyAqKkdpdGh1YjoqKiBodHRwczovL2dpdGh1Yi5jb20vemVuc2gvcm91dGUtdHJpZVxuLy9cbi8vICoqTGljZW5zZToqKiBNSVRcblxuLyogZ2xvYmFsIG1vZHVsZSwgZGVmaW5lICovXG47KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoW10sIGZhY3RvcnkpXG4gIGVsc2Ugcm9vdC5Sb3V0ZVRyaWUgPSBmYWN0b3J5KClcbn0odHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBzZXBSZWcgPSAvXFx8L1xuICB2YXIgbXVsdGlTbGFzaFJlZyA9IC8oXFwvKXsyLH0vXG4gIHZhciBtYXliZVJlZ2V4ID0gL1s/Xnt9KCl8W1xcXVxcXFxdL1xuICB2YXIgcmVnZXhSZWcgPSAvXihbXlxcKFxcblxcclxcdTIwMjhcXHUyMDI5XSopKFxcKC4rXFwpKSQvXG4gIHZhciBwYXJhbWV0ZXJSZWcgPSAvXiguKikoXFw6XFx3K1xcYikoLiopJC9cbiAgdmFyIGVzY2FwZVJlZyA9IC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ1xuICB2YXIgdHJpbVNsYXNoUmVnID0gLyheXFwvKXwoXFwvJCkvZ1xuXG4gIGZ1bmN0aW9uIFRyaWUgKGZsYWdzKSB7XG4gICAgdGhpcy5mbGFncyA9IGZsYWdzID8gJ2knIDogJydcbiAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShudWxsLCAncm9vdCcpXG4gIH1cblxuICBUcmllLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbiAocGF0dGVybikge1xuICAgIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhdHRlcm4gbXVzdCBiZSBzdHJpbmcuJylcbiAgICBpZiAobXVsdGlTbGFzaFJlZy50ZXN0KHBhdHRlcm4pKSB0aHJvdyBuZXcgRXJyb3IoJ011bHRpLXNsYXNoIGV4aXN0LicpXG5cbiAgICB2YXIgX3BhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UodHJpbVNsYXNoUmVnLCAnJylcbiAgICB2YXIgbm9kZSA9IGRlZmluZSh0aGlzLnJvb3QsIF9wYXR0ZXJuLnNwbGl0KCcvJyksIHRoaXMuZmxhZ3MpXG5cbiAgICBpZiAobm9kZS5fbm9kZVN0YXRlLnBhdHRlcm4gPT0gbnVsbCkgbm9kZS5fbm9kZVN0YXRlLnBhdHRlcm4gPSBwYXR0ZXJuXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIC8vIHRoZSBwYXRoIHNob3VsZCBiZSBub3JtYWxpemVkIGJlZm9yZSBtYXRjaCwganVzdCBhcyBwYXRoLm5vcm1hbGl6ZSBkbyBpbiBOb2RlLmpzXG4gIFRyaWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKHBhdGgsIG11bHRpTWF0Y2gpIHtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXRoIG11c3QgYmUgc3RyaW5nLicpXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSh0cmltU2xhc2hSZWcsICcnKVxuXG4gICAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcbiAgICB2YXIgZnJhZ3MgPSBwYXRoLnNwbGl0KCcvJylcbiAgICB2YXIgbWF0Y2hlZCA9IG5ldyBUcmllTWF0Y2hlZCgpXG5cbiAgICB3aGlsZSAoZnJhZ3MubGVuZ3RoKSB7XG4gICAgICBub2RlID0gbWF0Y2hOb2RlKG5vZGUsIGZyYWdzLCBtYXRjaGVkLnBhcmFtcywgdGhpcy5mbGFncylcbiAgICAgIC8vIG1hdGNoZWRcbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIGlmIChtdWx0aU1hdGNoICYmIG5vZGUuX25vZGVTdGF0ZS5lbmRwb2ludCkgbWF0Y2hlZC5ub2Rlcy5wdXNoKG5vZGUpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICAvLyBub3QgbWF0Y2hcbiAgICAgIHJldHVybiBtdWx0aU1hdGNoID8gbWF0Y2hlZCA6IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaGVkLm5vZGUgPSBub2RlXG4gICAgaWYgKCFtdWx0aU1hdGNoICYmICFub2RlLl9ub2RlU3RhdGUuZW5kcG9pbnQpIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG1hdGNoZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIE5vZGUgKHBhcmVudE5vZGUsIGZyYWcsIG1hdGNoUmVtYWlucykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX25vZGVTdGF0ZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBuZXcgTm9kZVN0YXRlKHBhcmVudE5vZGUsIGZyYWcsIG1hdGNoUmVtYWlucylcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gTm9kZVN0YXRlIChwYXJlbnROb2RlLCBmcmFnLCBtYXRjaFJlbWFpbnMpIHtcbiAgICB0aGlzLm5hbWUgPSBmcmFnXG4gICAgdGhpcy5wYXR0ZXJuID0gbnVsbFxuICAgIHRoaXMuZW5kcG9pbnQgPSBmYWxzZVxuICAgIHRoaXMucGFyZW50Tm9kZSA9IHBhcmVudE5vZGVcbiAgICB0aGlzLm1hdGNoUmVtYWlucyA9ICEhbWF0Y2hSZW1haW5zXG4gICAgdGhpcy5jaGlsZE5vZGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIHRoaXMucmVnZXhOYW1lcyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB0aGlzLnJlZ2V4Tm9kZXMgPSBbXVxuICB9XG5cbiAgZnVuY3Rpb24gUmVnZXhOb2RlIChub2RlLCBwcmVmaXgsIHBhcmFtLCByZWdleCkge1xuICAgIHRoaXMubm9kZSA9IG5vZGVcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeCB8fCAnJ1xuICAgIHRoaXMucGFyYW0gPSBwYXJhbSB8fCAnJ1xuICAgIHRoaXMucmVnZXggPSByZWdleCB8fCBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBUcmllTWF0Y2hlZCAoKSB7XG4gICAgdGhpcy5ub2RlID0gbnVsbFxuICAgIHRoaXMubm9kZXMgPSBbXVxuICAgIHRoaXMucGFyYW1zID0ge31cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZSAocGFyZW50Tm9kZSwgZnJhZ3MsIGZsYWdzKSB7XG4gICAgdmFyIGZyYWcgPSBmcmFncy5zaGlmdCgpXG4gICAgdmFyIGNoaWxkID0gcGFyc2VOb2RlKHBhcmVudE5vZGUsIGZyYWcsIGZsYWdzKVxuXG4gICAgaWYgKCFmcmFncy5sZW5ndGgpIHtcbiAgICAgIGNoaWxkLl9ub2RlU3RhdGUuZW5kcG9pbnQgPSB0cnVlXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gICAgaWYgKGNoaWxkLl9ub2RlU3RhdGUubWF0Y2hSZW1haW5zKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZGVmaW5lIHJlZ2V4IHBhdHRlcm4gYWZ0ZXIgXCIoKilcIiBwYXR0ZXJuLicpXG4gICAgfVxuICAgIHJldHVybiBkZWZpbmUoY2hpbGQsIGZyYWdzLCBmbGFncylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoTm9kZSAobm9kZSwgZnJhZ3MsIHBhcmFtcywgZmxhZ3MpIHtcbiAgICB2YXIgZnJhZyA9IHNhZmVEZWNvZGVVUklDb21wb25lbnQoZnJhZ3Muc2hpZnQoKSlcbiAgICBpZiAoZnJhZyA9PT0gZmFsc2UpIHJldHVybiBudWxsXG5cbiAgICB2YXIgY2hpbGROb2RlcyA9IG5vZGUuX25vZGVTdGF0ZS5jaGlsZE5vZGVzXG4gICAgdmFyIGNoaWxkID0gY2hpbGROb2Rlc1tmbGFncyA/IGZyYWcudG9Mb3dlckNhc2UoKSA6IGZyYWddXG4gICAgaWYgKGNoaWxkKSByZXR1cm4gY2hpbGRcblxuICAgIHZhciByZWdleE5vZGVzID0gbm9kZS5fbm9kZVN0YXRlLnJlZ2V4Tm9kZXNcblxuICAgIGZvciAodmFyIGZyYWdDb3B5LCByZWdleE5vZGUsIGkgPSAwLCBsZW4gPSByZWdleE5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBmcmFnQ29weSA9IGZyYWdcbiAgICAgIHJlZ2V4Tm9kZSA9IHJlZ2V4Tm9kZXNbaV1cblxuICAgICAgaWYgKHJlZ2V4Tm9kZS5wcmVmaXgpIHtcbiAgICAgICAgaWYgKGZyYWdDb3B5LmluZGV4T2YocmVnZXhOb2RlLnByZWZpeCkgIT09IDApIGNvbnRpbnVlXG4gICAgICAgIGZyYWdDb3B5ID0gZnJhZ0NvcHkuc2xpY2UocmVnZXhOb2RlLnByZWZpeC5sZW5ndGgpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZWdleE5vZGUucmVnZXggJiYgIXJlZ2V4Tm9kZS5yZWdleC50ZXN0KGZyYWdDb3B5KSkgY29udGludWVcbiAgICAgIGlmIChyZWdleE5vZGUubm9kZS5fbm9kZVN0YXRlLm1hdGNoUmVtYWlucykge1xuICAgICAgICB3aGlsZSAoZnJhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHJlbWFpbiA9IHNhZmVEZWNvZGVVUklDb21wb25lbnQoZnJhZ3Muc2hpZnQoKSlcbiAgICAgICAgICBpZiAocmVtYWluID09PSBmYWxzZSkgcmV0dXJuIG51bGxcbiAgICAgICAgICBmcmFnQ29weSArPSAnLycgKyByZW1haW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJlZ2V4Tm9kZS5wYXJhbSkgcGFyYW1zW3JlZ2V4Tm9kZS5wYXJhbV0gPSBmcmFnQ29weVxuICAgICAgY2hpbGQgPSByZWdleE5vZGUubm9kZVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlTm9kZSAocGFyZW50Tm9kZSwgZnJhZywgZmxhZ3MpIHtcbiAgICB2YXIgcmVzID0gbnVsbFxuICAgIHZhciByZWdleCA9ICcnXG4gICAgdmFyIHByZWZpeCA9ICcnXG4gICAgdmFyIHBhcmFtZXRlciA9ICcnXG4gICAgdmFyIG1hdGNoUmVtYWlucyA9IGZhbHNlXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBwYXJlbnROb2RlLl9ub2RlU3RhdGUuY2hpbGROb2Rlc1xuICAgIHZhciByZWdleE5hbWVzID0gcGFyZW50Tm9kZS5fbm9kZVN0YXRlLnJlZ2V4TmFtZXNcbiAgICB2YXIgcmVnZXhOb2RlcyA9IHBhcmVudE5vZGUuX25vZGVTdGF0ZS5yZWdleE5vZGVzXG5cbiAgICBpZiAoY2hpbGROb2Rlc1tmcmFnXSkgcmV0dXJuIGNoaWxkTm9kZXNbZnJhZ11cbiAgICBjaGVja01hdGNoUmVnZXgoZnJhZywgJycsIHBhcmVudE5vZGUuX25vZGVTdGF0ZSlcblxuICAgIGlmICgocmVzID0gcGFyYW1ldGVyUmVnLmV4ZWMoZnJhZykpKSB7XG4gICAgICAvLyBjYXNlOiBgcHJlZml4Om5hbWUocmVnZXgpYFxuICAgICAgcHJlZml4ID0gcmVzWzFdXG4gICAgICBwYXJhbWV0ZXIgPSByZXNbMl0uc2xpY2UoMSlcbiAgICAgIHJlZ2V4ID0gcmVzWzNdXG4gICAgICBpZiAocmVnZXggJiYgIXJlZ2V4UmVnLnRlc3QocmVnZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBwYXJzZSBcIicgKyByZWdleCArICdcIiBhcyByZWdleCBwYXR0ZXJuJylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChyZXMgPSByZWdleFJlZy5leGVjKGZyYWcpKSkge1xuICAgICAgLy8gY2FzZTogYHByZWZpeChyZWdleClgXG4gICAgICBwcmVmaXggPSByZXNbMV1cbiAgICAgIHJlZ2V4ID0gcmVzWzJdXG4gICAgfSBlbHNlIGlmIChzZXBSZWcudGVzdChmcmFnKSkge1xuICAgICAgLy8gY2FzZTogYGF8YnxjYFxuICAgICAgcmVnZXggPSB3cmFwU2VwRXhwKGZyYWcpXG4gICAgfSBlbHNlIGlmIChtYXliZVJlZ2V4LnRlc3QoZnJhZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBwYXJzZSBcIicgKyBmcmFnICsgJ1wiJylcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2FzZTogb3RoZXIgc2ltcGxlIHN0cmluZyBub2RlXG4gICAgICBjaGlsZE5vZGVzW2ZyYWddID0gbmV3IE5vZGUocGFyZW50Tm9kZSwgZnJhZylcbiAgICAgIHJldHVybiBjaGlsZE5vZGVzW2ZyYWddXG4gICAgfVxuXG4gICAgaWYgKHJlZ2V4ID09PSAnKCopJykge1xuICAgICAgcmVnZXggPSAnKC4qKSdcbiAgICAgIG1hdGNoUmVtYWlucyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAocmVnZXgpIHJlZ2V4ID0gJ14nICsgcmVnZXggKyAnJCdcbiAgICAvLyBub3JtYWxpemUgZnJhZyBhcyByZWdleCBub2RlIG5hbWVcbiAgICB2YXIgcmVnZXhOYW1lID0gcHJlZml4ICsgJzonICsgcmVnZXhcbiAgICAvLyBpZiByZWdleCBub2RlIGV4aXN0XG4gICAgaWYgKHJlZ2V4TmFtZXNbcmVnZXhOYW1lXSkgcmV0dXJuIHJlZ2V4Tm9kZXNbcmVnZXhOYW1lc1tyZWdleE5hbWVdXS5ub2RlXG5cbiAgICBpZiAocHJlZml4KSBjaGVja01hdGNoUmVnZXgoZnJhZywgcHJlZml4LCBwYXJlbnROb2RlLl9ub2RlU3RhdGUpXG4gICAgdmFyIG5vZGUgPSBuZXcgTm9kZShwYXJlbnROb2RlLCByZWdleE5hbWUsIG1hdGNoUmVtYWlucylcbiAgICBpZiAocmVnZXgpIHJlZ2V4ID0gbmV3IFJlZ0V4cChyZWdleCwgZmxhZ3MpXG4gICAgcmVnZXhOYW1lc1tyZWdleE5hbWVdID0gJycgKyByZWdleE5vZGVzLmxlbmd0aFxuICAgIHJlZ2V4Tm9kZXMucHVzaChuZXcgUmVnZXhOb2RlKG5vZGUsIHByZWZpeCwgcGFyYW1ldGVyLCByZWdleCkpXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTWF0Y2hSZWdleCAoZnJhZywgcHJlZml4LCBwYXJlbnROb2RlU3RhdGUpIHtcbiAgICB2YXIgcmVnZXhOb2RlID0gcGFyZW50Tm9kZVN0YXRlLnJlZ2V4TmFtZXNbcHJlZml4ICsgJzpeKC4qKSQnXVxuICAgIGlmIChyZWdleE5vZGUpIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gcGFyZW50Tm9kZVN0YXRlLnJlZ2V4Tm9kZXNbcmVnZXhOb2RlXS5ub2RlLl9ub2RlU3RhdGUucGF0dGVyblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGRlZmluZSBcIicgKyBmcmFnICsgJ1wiIGFmdGVyIFwiJyArIHBhdHRlcm4gKyAnXCIuJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwU2VwRXhwIChzdHIpIHtcbiAgICB2YXIgcmVzID0gc3RyLnNwbGl0KCd8JylcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoIXJlc1tpXSkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IHBhcnNlIFwiJyArIHN0ciArICdcIiBhcyBzZXBhcmF0ZWQgcGF0dGVybicpXG4gICAgICByZXNbaV0gPSByZXNbaV0ucmVwbGFjZShlc2NhcGVSZWcsICdcXFxcJCYnKVxuICAgIH1cbiAgICByZXR1cm4gJygnICsgcmVzLmpvaW4oJ3wnKSArICcpJ1xuICB9XG5cbiAgZnVuY3Rpb24gc2FmZURlY29kZVVSSUNvbXBvbmVudCAoc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyaW5nKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgVHJpZS5OQU1FID0gJ1RyaWUnXG4gIFRyaWUuVkVSU0lPTiA9ICd2MS4yLjMnXG4gIFRyaWUuc2FmZURlY29kZVVSSUNvbXBvbmVudCA9IHNhZmVEZWNvZGVVUklDb21wb25lbnRcbiAgcmV0dXJuIFRyaWVcbn0pKVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuXHRyZXR1cm4gdHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbDtcbn07XG4iLCJ2YXIgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXlcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVJc0FycmF5IHx8IGlzQXJyYXlcblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCJcbn1cbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoXCJpcy1vYmplY3RcIilcbnZhciBpc0hvb2sgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdmhvb2suanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseVByb3BlcnRpZXNcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKG5vZGUsIHByb3BzLCBwcmV2aW91cykge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV1cblxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0hvb2socHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgcmVtb3ZlUHJvcGVydHkobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXMpXG4gICAgICAgICAgICBpZiAocHJvcFZhbHVlLmhvb2spIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUuaG9vayhub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKSB7XG4gICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNbcHJvcE5hbWVdXG5cbiAgICAgICAgaWYgKCFpc0hvb2socHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlW2ldID0gXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZpb3VzVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IFwiXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNWYWx1ZS51bmhvb2spIHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUudW5ob29rKG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWRcblxuICAgIC8vIFNldCBhdHRyaWJ1dGVzXG4gICAgaWYgKHByb3BOYW1lID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBhdHRyVmFsdWUgPSBwcm9wVmFsdWVbYXR0ck5hbWVdXG5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYocHJldmlvdXNWYWx1ZSAmJiBpc09iamVjdChwcmV2aW91c1ZhbHVlKSAmJlxuICAgICAgICBnZXRQcm90b3R5cGUocHJldmlvdXNWYWx1ZSkgIT09IGdldFByb3RvdHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghaXNPYmplY3Qobm9kZVtwcm9wTmFtZV0pKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0ge31cbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZXIgPSBwcm9wTmFtZSA9PT0gXCJzdHlsZVwiID8gXCJcIiA6IHVuZGVmaW5lZFxuXG4gICAgZm9yICh2YXIgayBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJvcFZhbHVlW2tdXG4gICAgICAgIG5vZGVbcHJvcE5hbWVdW2tdID0gKHZhbHVlID09PSB1bmRlZmluZWQpID8gcmVwbGFjZXIgOiB2YWx1ZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvdG90eXBlKHZhbHVlKSB7XG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKVxuICAgIH0gZWxzZSBpZiAodmFsdWUuX19wcm90b19fKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3Byb3RvX19cbiAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgICB9XG59XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKFwiZ2xvYmFsL2RvY3VtZW50XCIpXG5cbnZhciBhcHBseVByb3BlcnRpZXMgPSByZXF1aXJlKFwiLi9hcHBseS1wcm9wZXJ0aWVzXCIpXG5cbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlLmpzXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dC5qc1wiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxudmFyIGhhbmRsZVRodW5rID0gcmVxdWlyZShcIi4uL3Zub2RlL2hhbmRsZS10aHVuay5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVsZW1lbnRcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh2bm9kZSwgb3B0cykge1xuICAgIHZhciBkb2MgPSBvcHRzID8gb3B0cy5kb2N1bWVudCB8fCBkb2N1bWVudCA6IGRvY3VtZW50XG4gICAgdmFyIHdhcm4gPSBvcHRzID8gb3B0cy53YXJuIDogbnVsbFxuXG4gICAgdm5vZGUgPSBoYW5kbGVUaHVuayh2bm9kZSkuYVxuXG4gICAgaWYgKGlzV2lkZ2V0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gdm5vZGUuaW5pdCgpXG4gICAgfSBlbHNlIGlmIChpc1ZUZXh0KHZub2RlKSkge1xuICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpXG4gICAgfSBlbHNlIGlmICghaXNWTm9kZSh2bm9kZSkpIHtcbiAgICAgICAgaWYgKHdhcm4pIHtcbiAgICAgICAgICAgIHdhcm4oXCJJdGVtIGlzIG5vdCBhIHZhbGlkIHZpcnR1YWwgZG9tIG5vZGVcIiwgdm5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9ICh2bm9kZS5uYW1lc3BhY2UgPT09IG51bGwpID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQodm5vZGUudGFnTmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKHZub2RlLm5hbWVzcGFjZSwgdm5vZGUudGFnTmFtZSlcblxuICAgIHZhciBwcm9wcyA9IHZub2RlLnByb3BlcnRpZXNcbiAgICBhcHBseVByb3BlcnRpZXMobm9kZSwgcHJvcHMpXG5cbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGROb2RlID0gY3JlYXRlRWxlbWVudChjaGlsZHJlbltpXSwgb3B0cylcbiAgICAgICAgaWYgKGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZE5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZVxufVxuIiwiLy8gTWFwcyBhIHZpcnR1YWwgRE9NIHRyZWUgb250byBhIHJlYWwgRE9NIHRyZWUgaW4gYW4gZWZmaWNpZW50IG1hbm5lci5cbi8vIFdlIGRvbid0IHdhbnQgdG8gcmVhZCBhbGwgb2YgdGhlIERPTSBub2RlcyBpbiB0aGUgdHJlZSBzbyB3ZSB1c2Vcbi8vIHRoZSBpbi1vcmRlciB0cmVlIGluZGV4aW5nIHRvIGVsaW1pbmF0ZSByZWN1cnNpb24gZG93biBjZXJ0YWluIGJyYW5jaGVzLlxuLy8gV2Ugb25seSByZWN1cnNlIGludG8gYSBET00gbm9kZSBpZiB3ZSBrbm93IHRoYXQgaXQgY29udGFpbnMgYSBjaGlsZCBvZlxuLy8gaW50ZXJlc3QuXG5cbnZhciBub0NoaWxkID0ge31cblxubW9kdWxlLmV4cG9ydHMgPSBkb21JbmRleFxuXG5mdW5jdGlvbiBkb21JbmRleChyb290Tm9kZSwgdHJlZSwgaW5kaWNlcywgbm9kZXMpIHtcbiAgICBpZiAoIWluZGljZXMgfHwgaW5kaWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5kaWNlcy5zb3J0KGFzY2VuZGluZylcbiAgICAgICAgcmV0dXJuIHJlY3Vyc2Uocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzLCAwKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVjdXJzZShyb290Tm9kZSwgdHJlZSwgaW5kaWNlcywgbm9kZXMsIHJvb3RJbmRleCkge1xuICAgIG5vZGVzID0gbm9kZXMgfHwge31cblxuXG4gICAgaWYgKHJvb3ROb2RlKSB7XG4gICAgICAgIGlmIChpbmRleEluUmFuZ2UoaW5kaWNlcywgcm9vdEluZGV4LCByb290SW5kZXgpKSB7XG4gICAgICAgICAgICBub2Rlc1tyb290SW5kZXhdID0gcm9vdE5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2Q2hpbGRyZW4gPSB0cmVlLmNoaWxkcmVuXG5cbiAgICAgICAgaWYgKHZDaGlsZHJlbikge1xuXG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHJvb3ROb2RlLmNoaWxkTm9kZXNcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcm9vdEluZGV4ICs9IDFcblxuICAgICAgICAgICAgICAgIHZhciB2Q2hpbGQgPSB2Q2hpbGRyZW5baV0gfHwgbm9DaGlsZFxuICAgICAgICAgICAgICAgIHZhciBuZXh0SW5kZXggPSByb290SW5kZXggKyAodkNoaWxkLmNvdW50IHx8IDApXG5cbiAgICAgICAgICAgICAgICAvLyBza2lwIHJlY3Vyc2lvbiBkb3duIHRoZSB0cmVlIGlmIHRoZXJlIGFyZSBubyBub2RlcyBkb3duIGhlcmVcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhJblJhbmdlKGluZGljZXMsIHJvb3RJbmRleCwgbmV4dEluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICByZWN1cnNlKGNoaWxkTm9kZXNbaV0sIHZDaGlsZCwgaW5kaWNlcywgbm9kZXMsIHJvb3RJbmRleClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb290SW5kZXggPSBuZXh0SW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2Rlc1xufVxuXG4vLyBCaW5hcnkgc2VhcmNoIGZvciBhbiBpbmRleCBpbiB0aGUgaW50ZXJ2YWwgW2xlZnQsIHJpZ2h0XVxuZnVuY3Rpb24gaW5kZXhJblJhbmdlKGluZGljZXMsIGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZhciBtaW5JbmRleCA9IDBcbiAgICB2YXIgbWF4SW5kZXggPSBpbmRpY2VzLmxlbmd0aCAtIDFcbiAgICB2YXIgY3VycmVudEluZGV4XG4gICAgdmFyIGN1cnJlbnRJdGVtXG5cbiAgICB3aGlsZSAobWluSW5kZXggPD0gbWF4SW5kZXgpIHtcbiAgICAgICAgY3VycmVudEluZGV4ID0gKChtYXhJbmRleCArIG1pbkluZGV4KSAvIDIpID4+IDBcbiAgICAgICAgY3VycmVudEl0ZW0gPSBpbmRpY2VzW2N1cnJlbnRJbmRleF1cblxuICAgICAgICBpZiAobWluSW5kZXggPT09IG1heEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEl0ZW0gPj0gbGVmdCAmJiBjdXJyZW50SXRlbSA8PSByaWdodFxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJdGVtIDwgbGVmdCkge1xuICAgICAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxXG4gICAgICAgIH0gZWxzZSAgaWYgKGN1cnJlbnRJdGVtID4gcmlnaHQpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgICByZXR1cm4gYSA+IGIgPyAxIDogLTFcbn1cbiIsInZhciBhcHBseVByb3BlcnRpZXMgPSByZXF1aXJlKFwiLi9hcHBseS1wcm9wZXJ0aWVzXCIpXG5cbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy13aWRnZXQuanNcIilcbnZhciBWUGF0Y2ggPSByZXF1aXJlKFwiLi4vdm5vZGUvdnBhdGNoLmpzXCIpXG5cbnZhciB1cGRhdGVXaWRnZXQgPSByZXF1aXJlKFwiLi91cGRhdGUtd2lkZ2V0XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHlQYXRjaFxuXG5mdW5jdGlvbiBhcHBseVBhdGNoKHZwYXRjaCwgZG9tTm9kZSwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciB0eXBlID0gdnBhdGNoLnR5cGVcbiAgICB2YXIgdk5vZGUgPSB2cGF0Y2gudk5vZGVcbiAgICB2YXIgcGF0Y2ggPSB2cGF0Y2gucGF0Y2hcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFZQYXRjaC5SRU1PVkU6XG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlTm9kZShkb21Ob2RlLCB2Tm9kZSlcbiAgICAgICAgY2FzZSBWUGF0Y2guSU5TRVJUOlxuICAgICAgICAgICAgcmV0dXJuIGluc2VydE5vZGUoZG9tTm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLlZURVhUOlxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ1BhdGNoKGRvbU5vZGUsIHZOb2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guV0lER0VUOlxuICAgICAgICAgICAgcmV0dXJuIHdpZGdldFBhdGNoKGRvbU5vZGUsIHZOb2RlLCBwYXRjaCwgcmVuZGVyT3B0aW9ucylcbiAgICAgICAgY2FzZSBWUGF0Y2guVk5PREU6XG4gICAgICAgICAgICByZXR1cm4gdk5vZGVQYXRjaChkb21Ob2RlLCB2Tm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLk9SREVSOlxuICAgICAgICAgICAgcmVvcmRlckNoaWxkcmVuKGRvbU5vZGUsIHBhdGNoKVxuICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGVcbiAgICAgICAgY2FzZSBWUGF0Y2guUFJPUFM6XG4gICAgICAgICAgICBhcHBseVByb3BlcnRpZXMoZG9tTm9kZSwgcGF0Y2gsIHZOb2RlLnByb3BlcnRpZXMpXG4gICAgICAgICAgICByZXR1cm4gZG9tTm9kZVxuICAgICAgICBjYXNlIFZQYXRjaC5USFVOSzpcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlUm9vdChkb21Ob2RlLFxuICAgICAgICAgICAgICAgIHJlbmRlck9wdGlvbnMucGF0Y2goZG9tTm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGUoZG9tTm9kZSwgdk5vZGUpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuXG4gICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb21Ob2RlKVxuICAgIH1cblxuICAgIGRlc3Ryb3lXaWRnZXQoZG9tTm9kZSwgdk5vZGUpO1xuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm9kZShwYXJlbnROb2RlLCB2Tm9kZSwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIodk5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld05vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudE5vZGVcbn1cblxuZnVuY3Rpb24gc3RyaW5nUGF0Y2goZG9tTm9kZSwgbGVmdFZOb2RlLCB2VGV4dCwgcmVuZGVyT3B0aW9ucykge1xuICAgIHZhciBuZXdOb2RlXG5cbiAgICBpZiAoZG9tTm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBkb21Ob2RlLnJlcGxhY2VEYXRhKDAsIGRvbU5vZGUubGVuZ3RoLCB2VGV4dC50ZXh0KVxuICAgICAgICBuZXdOb2RlID0gZG9tTm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG4gICAgICAgIG5ld05vZGUgPSByZW5kZXJPcHRpb25zLnJlbmRlcih2VGV4dCwgcmVuZGVyT3B0aW9ucylcblxuICAgICAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBkb21Ob2RlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbn1cblxuZnVuY3Rpb24gd2lkZ2V0UGF0Y2goZG9tTm9kZSwgbGVmdFZOb2RlLCB3aWRnZXQsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgdXBkYXRpbmcgPSB1cGRhdGVXaWRnZXQobGVmdFZOb2RlLCB3aWRnZXQpXG4gICAgdmFyIG5ld05vZGVcblxuICAgIGlmICh1cGRhdGluZykge1xuICAgICAgICBuZXdOb2RlID0gd2lkZ2V0LnVwZGF0ZShsZWZ0Vk5vZGUsIGRvbU5vZGUpIHx8IGRvbU5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIod2lkZ2V0LCByZW5kZXJPcHRpb25zKVxuICAgIH1cblxuICAgIHZhciBwYXJlbnROb2RlID0gZG9tTm9kZS5wYXJlbnROb2RlXG5cbiAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIGRvbU5vZGUpXG4gICAgfVxuXG4gICAgaWYgKCF1cGRhdGluZykge1xuICAgICAgICBkZXN0cm95V2lkZ2V0KGRvbU5vZGUsIGxlZnRWTm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxufVxuXG5mdW5jdGlvbiB2Tm9kZVBhdGNoKGRvbU5vZGUsIGxlZnRWTm9kZSwgdk5vZGUsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuICAgIHZhciBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIodk5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICBpZiAocGFyZW50Tm9kZSAmJiBuZXdOb2RlICE9PSBkb21Ob2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIGRvbU5vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbn1cblxuZnVuY3Rpb24gZGVzdHJveVdpZGdldChkb21Ob2RlLCB3KSB7XG4gICAgaWYgKHR5cGVvZiB3LmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIiAmJiBpc1dpZGdldCh3KSkge1xuICAgICAgICB3LmRlc3Ryb3koZG9tTm9kZSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlb3JkZXJDaGlsZHJlbihkb21Ob2RlLCBtb3Zlcykge1xuICAgIHZhciBjaGlsZE5vZGVzID0gZG9tTm9kZS5jaGlsZE5vZGVzXG4gICAgdmFyIGtleU1hcCA9IHt9XG4gICAgdmFyIG5vZGVcbiAgICB2YXIgcmVtb3ZlXG4gICAgdmFyIGluc2VydFxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3Zlcy5yZW1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZSA9IG1vdmVzLnJlbW92ZXNbaV1cbiAgICAgICAgbm9kZSA9IGNoaWxkTm9kZXNbcmVtb3ZlLmZyb21dXG4gICAgICAgIGlmIChyZW1vdmUua2V5KSB7XG4gICAgICAgICAgICBrZXlNYXBbcmVtb3ZlLmtleV0gPSBub2RlXG4gICAgICAgIH1cbiAgICAgICAgZG9tTm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBjaGlsZE5vZGVzLmxlbmd0aFxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgbW92ZXMuaW5zZXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpbnNlcnQgPSBtb3Zlcy5pbnNlcnRzW2pdXG4gICAgICAgIG5vZGUgPSBrZXlNYXBbaW5zZXJ0LmtleV1cbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgd2VpcmRlc3QgYnVnIGkndmUgZXZlciBzZWVuIGluIHdlYmtpdFxuICAgICAgICBkb21Ob2RlLmluc2VydEJlZm9yZShub2RlLCBpbnNlcnQudG8gPj0gbGVuZ3RoKysgPyBudWxsIDogY2hpbGROb2Rlc1tpbnNlcnQudG9dKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVJvb3Qob2xkUm9vdCwgbmV3Um9vdCkge1xuICAgIGlmIChvbGRSb290ICYmIG5ld1Jvb3QgJiYgb2xkUm9vdCAhPT0gbmV3Um9vdCAmJiBvbGRSb290LnBhcmVudE5vZGUpIHtcbiAgICAgICAgb2xkUm9vdC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdSb290LCBvbGRSb290KVxuICAgIH1cblxuICAgIHJldHVybiBuZXdSb290O1xufVxuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZShcImdsb2JhbC9kb2N1bWVudFwiKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKFwieC1pcy1hcnJheVwiKVxuXG52YXIgcmVuZGVyID0gcmVxdWlyZShcIi4vY3JlYXRlLWVsZW1lbnRcIilcbnZhciBkb21JbmRleCA9IHJlcXVpcmUoXCIuL2RvbS1pbmRleFwiKVxudmFyIHBhdGNoT3AgPSByZXF1aXJlKFwiLi9wYXRjaC1vcFwiKVxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuXG5mdW5jdGlvbiBwYXRjaChyb290Tm9kZSwgcGF0Y2hlcywgcmVuZGVyT3B0aW9ucykge1xuICAgIHJlbmRlck9wdGlvbnMgPSByZW5kZXJPcHRpb25zIHx8IHt9XG4gICAgcmVuZGVyT3B0aW9ucy5wYXRjaCA9IHJlbmRlck9wdGlvbnMucGF0Y2ggJiYgcmVuZGVyT3B0aW9ucy5wYXRjaCAhPT0gcGF0Y2hcbiAgICAgICAgPyByZW5kZXJPcHRpb25zLnBhdGNoXG4gICAgICAgIDogcGF0Y2hSZWN1cnNpdmVcbiAgICByZW5kZXJPcHRpb25zLnJlbmRlciA9IHJlbmRlck9wdGlvbnMucmVuZGVyIHx8IHJlbmRlclxuXG4gICAgcmV0dXJuIHJlbmRlck9wdGlvbnMucGF0Y2gocm9vdE5vZGUsIHBhdGNoZXMsIHJlbmRlck9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHBhdGNoUmVjdXJzaXZlKHJvb3ROb2RlLCBwYXRjaGVzLCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIGluZGljZXMgPSBwYXRjaEluZGljZXMocGF0Y2hlcylcblxuICAgIGlmIChpbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcm9vdE5vZGVcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSBkb21JbmRleChyb290Tm9kZSwgcGF0Y2hlcy5hLCBpbmRpY2VzKVxuICAgIHZhciBvd25lckRvY3VtZW50ID0gcm9vdE5vZGUub3duZXJEb2N1bWVudFxuXG4gICAgaWYgKCFyZW5kZXJPcHRpb25zLmRvY3VtZW50ICYmIG93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIHJlbmRlck9wdGlvbnMuZG9jdW1lbnQgPSBvd25lckRvY3VtZW50XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBub2RlSW5kZXggPSBpbmRpY2VzW2ldXG4gICAgICAgIHJvb3ROb2RlID0gYXBwbHlQYXRjaChyb290Tm9kZSxcbiAgICAgICAgICAgIGluZGV4W25vZGVJbmRleF0sXG4gICAgICAgICAgICBwYXRjaGVzW25vZGVJbmRleF0sXG4gICAgICAgICAgICByZW5kZXJPcHRpb25zKVxuICAgIH1cblxuICAgIHJldHVybiByb290Tm9kZVxufVxuXG5mdW5jdGlvbiBhcHBseVBhdGNoKHJvb3ROb2RlLCBkb21Ob2RlLCBwYXRjaExpc3QsIHJlbmRlck9wdGlvbnMpIHtcbiAgICBpZiAoIWRvbU5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlXG4gICAgfVxuXG4gICAgdmFyIG5ld05vZGVcblxuICAgIGlmIChpc0FycmF5KHBhdGNoTGlzdCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRjaExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld05vZGUgPSBwYXRjaE9wKHBhdGNoTGlzdFtpXSwgZG9tTm9kZSwgcmVuZGVyT3B0aW9ucylcblxuICAgICAgICAgICAgaWYgKGRvbU5vZGUgPT09IHJvb3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgcm9vdE5vZGUgPSBuZXdOb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdOb2RlID0gcGF0Y2hPcChwYXRjaExpc3QsIGRvbU5vZGUsIHJlbmRlck9wdGlvbnMpXG5cbiAgICAgICAgaWYgKGRvbU5vZGUgPT09IHJvb3ROb2RlKSB7XG4gICAgICAgICAgICByb290Tm9kZSA9IG5ld05vZGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByb290Tm9kZVxufVxuXG5mdW5jdGlvbiBwYXRjaEluZGljZXMocGF0Y2hlcykge1xuICAgIHZhciBpbmRpY2VzID0gW11cblxuICAgIGZvciAodmFyIGtleSBpbiBwYXRjaGVzKSB7XG4gICAgICAgIGlmIChrZXkgIT09IFwiYVwiKSB7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goTnVtYmVyKGtleSkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kaWNlc1xufVxuIiwidmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZVdpZGdldFxuXG5mdW5jdGlvbiB1cGRhdGVXaWRnZXQoYSwgYikge1xuICAgIGlmIChpc1dpZGdldChhKSAmJiBpc1dpZGdldChiKSkge1xuICAgICAgICBpZiAoXCJuYW1lXCIgaW4gYSAmJiBcIm5hbWVcIiBpbiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYi5pZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGEuaW5pdCA9PT0gYi5pbml0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2Vcbn1cbiIsInZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4vaXMtdm5vZGVcIilcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZShcIi4vaXMtdnRleHRcIilcbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoXCIuL2lzLXdpZGdldFwiKVxudmFyIGlzVGh1bmsgPSByZXF1aXJlKFwiLi9pcy10aHVua1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhbmRsZVRodW5rXG5cbmZ1bmN0aW9uIGhhbmRsZVRodW5rKGEsIGIpIHtcbiAgICB2YXIgcmVuZGVyZWRBID0gYVxuICAgIHZhciByZW5kZXJlZEIgPSBiXG5cbiAgICBpZiAoaXNUaHVuayhiKSkge1xuICAgICAgICByZW5kZXJlZEIgPSByZW5kZXJUaHVuayhiLCBhKVxuICAgIH1cblxuICAgIGlmIChpc1RodW5rKGEpKSB7XG4gICAgICAgIHJlbmRlcmVkQSA9IHJlbmRlclRodW5rKGEsIG51bGwpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYTogcmVuZGVyZWRBLFxuICAgICAgICBiOiByZW5kZXJlZEJcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRodW5rKHRodW5rLCBwcmV2aW91cykge1xuICAgIHZhciByZW5kZXJlZFRodW5rID0gdGh1bmsudm5vZGVcblxuICAgIGlmICghcmVuZGVyZWRUaHVuaykge1xuICAgICAgICByZW5kZXJlZFRodW5rID0gdGh1bmsudm5vZGUgPSB0aHVuay5yZW5kZXIocHJldmlvdXMpXG4gICAgfVxuXG4gICAgaWYgKCEoaXNWTm9kZShyZW5kZXJlZFRodW5rKSB8fFxuICAgICAgICAgICAgaXNWVGV4dChyZW5kZXJlZFRodW5rKSB8fFxuICAgICAgICAgICAgaXNXaWRnZXQocmVuZGVyZWRUaHVuaykpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInRodW5rIGRpZCBub3QgcmV0dXJuIGEgdmFsaWQgbm9kZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZWRUaHVua1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1RodW5rXHJcblxyXG5mdW5jdGlvbiBpc1RodW5rKHQpIHtcclxuICAgIHJldHVybiB0ICYmIHQudHlwZSA9PT0gXCJUaHVua1wiXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc0hvb2tcblxuZnVuY3Rpb24gaXNIb29rKGhvb2spIHtcbiAgICByZXR1cm4gaG9vayAmJlxuICAgICAgKHR5cGVvZiBob29rLmhvb2sgPT09IFwiZnVuY3Rpb25cIiAmJiAhaG9vay5oYXNPd25Qcm9wZXJ0eShcImhvb2tcIikgfHxcbiAgICAgICB0eXBlb2YgaG9vay51bmhvb2sgPT09IFwiZnVuY3Rpb25cIiAmJiAhaG9vay5oYXNPd25Qcm9wZXJ0eShcInVuaG9va1wiKSlcbn1cbiIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlydHVhbE5vZGVcblxuZnVuY3Rpb24gaXNWaXJ0dWFsTm9kZSh4KSB7XG4gICAgcmV0dXJuIHggJiYgeC50eXBlID09PSBcIlZpcnR1YWxOb2RlXCIgJiYgeC52ZXJzaW9uID09PSB2ZXJzaW9uXG59XG4iLCJ2YXIgdmVyc2lvbiA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIilcblxubW9kdWxlLmV4cG9ydHMgPSBpc1ZpcnR1YWxUZXh0XG5cbmZ1bmN0aW9uIGlzVmlydHVhbFRleHQoeCkge1xuICAgIHJldHVybiB4ICYmIHgudHlwZSA9PT0gXCJWaXJ0dWFsVGV4dFwiICYmIHgudmVyc2lvbiA9PT0gdmVyc2lvblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1dpZGdldFxuXG5mdW5jdGlvbiBpc1dpZGdldCh3KSB7XG4gICAgcmV0dXJuIHcgJiYgdy50eXBlID09PSBcIldpZGdldFwiXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiMlwiXG4iLCJ2YXIgdmVyc2lvbiA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIilcblxuVmlydHVhbFBhdGNoLk5PTkUgPSAwXG5WaXJ0dWFsUGF0Y2guVlRFWFQgPSAxXG5WaXJ0dWFsUGF0Y2guVk5PREUgPSAyXG5WaXJ0dWFsUGF0Y2guV0lER0VUID0gM1xuVmlydHVhbFBhdGNoLlBST1BTID0gNFxuVmlydHVhbFBhdGNoLk9SREVSID0gNVxuVmlydHVhbFBhdGNoLklOU0VSVCA9IDZcblZpcnR1YWxQYXRjaC5SRU1PVkUgPSA3XG5WaXJ0dWFsUGF0Y2guVEhVTksgPSA4XG5cbm1vZHVsZS5leHBvcnRzID0gVmlydHVhbFBhdGNoXG5cbmZ1bmN0aW9uIFZpcnR1YWxQYXRjaCh0eXBlLCB2Tm9kZSwgcGF0Y2gpIHtcbiAgICB0aGlzLnR5cGUgPSBOdW1iZXIodHlwZSlcbiAgICB0aGlzLnZOb2RlID0gdk5vZGVcbiAgICB0aGlzLnBhdGNoID0gcGF0Y2hcbn1cblxuVmlydHVhbFBhdGNoLnByb3RvdHlwZS52ZXJzaW9uID0gdmVyc2lvblxuVmlydHVhbFBhdGNoLnByb3RvdHlwZS50eXBlID0gXCJWaXJ0dWFsUGF0Y2hcIlxuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZShcImlzLW9iamVjdFwiKVxudmFyIGlzSG9vayA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12aG9va1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZQcm9wc1xuXG5mdW5jdGlvbiBkaWZmUHJvcHMoYSwgYikge1xuICAgIHZhciBkaWZmXG5cbiAgICBmb3IgKHZhciBhS2V5IGluIGEpIHtcbiAgICAgICAgaWYgKCEoYUtleSBpbiBiKSkge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYUtleV0gPSB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhVmFsdWUgPSBhW2FLZXldXG4gICAgICAgIHZhciBiVmFsdWUgPSBiW2FLZXldXG5cbiAgICAgICAgaWYgKGFWYWx1ZSA9PT0gYlZhbHVlKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGFWYWx1ZSkgJiYgaXNPYmplY3QoYlZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGdldFByb3RvdHlwZShiVmFsdWUpICE9PSBnZXRQcm90b3R5cGUoYVZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICAgICAgZGlmZlthS2V5XSA9IGJWYWx1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0hvb2soYlZhbHVlKSkge1xuICAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgICBkaWZmW2FLZXldID0gYlZhbHVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvYmplY3REaWZmID0gZGlmZlByb3BzKGFWYWx1ZSwgYlZhbHVlKVxuICAgICAgICAgICAgICAgIGlmIChvYmplY3REaWZmKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICAgICAgICAgIGRpZmZbYUtleV0gPSBvYmplY3REaWZmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYUtleV0gPSBiVmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGJLZXkgaW4gYikge1xuICAgICAgICBpZiAoIShiS2V5IGluIGEpKSB7XG4gICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgZGlmZltiS2V5XSA9IGJbYktleV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaWZmXG59XG5cbmZ1bmN0aW9uIGdldFByb3RvdHlwZSh2YWx1ZSkge1xuICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSlcbiAgfSBlbHNlIGlmICh2YWx1ZS5fX3Byb3RvX18pIHtcbiAgICByZXR1cm4gdmFsdWUuX19wcm90b19fXG4gIH0gZWxzZSBpZiAodmFsdWUuY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlXG4gIH1cbn1cbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZShcIngtaXMtYXJyYXlcIilcblxudmFyIFZQYXRjaCA9IHJlcXVpcmUoXCIuLi92bm9kZS92cGF0Y2hcIilcbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dFwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldFwiKVxudmFyIGlzVGh1bmsgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdGh1bmtcIilcbnZhciBoYW5kbGVUaHVuayA9IHJlcXVpcmUoXCIuLi92bm9kZS9oYW5kbGUtdGh1bmtcIilcblxudmFyIGRpZmZQcm9wcyA9IHJlcXVpcmUoXCIuL2RpZmYtcHJvcHNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG5cbmZ1bmN0aW9uIGRpZmYoYSwgYikge1xuICAgIHZhciBwYXRjaCA9IHsgYTogYSB9XG4gICAgd2FsayhhLCBiLCBwYXRjaCwgMClcbiAgICByZXR1cm4gcGF0Y2hcbn1cblxuZnVuY3Rpb24gd2FsayhhLCBiLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICB2YXIgYXBwbHlDbGVhciA9IGZhbHNlXG5cbiAgICBpZiAoaXNUaHVuayhhKSB8fCBpc1RodW5rKGIpKSB7XG4gICAgICAgIHRodW5rcyhhLCBiLCBwYXRjaCwgaW5kZXgpXG4gICAgfSBlbHNlIGlmIChiID09IG51bGwpIHtcblxuICAgICAgICAvLyBJZiBhIGlzIGEgd2lkZ2V0IHdlIHdpbGwgYWRkIGEgcmVtb3ZlIHBhdGNoIGZvciBpdFxuICAgICAgICAvLyBPdGhlcndpc2UgYW55IGNoaWxkIHdpZGdldHMvaG9va3MgbXVzdCBiZSBkZXN0cm95ZWQuXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgYWRkaW5nIHR3byByZW1vdmUgcGF0Y2hlcyBmb3IgYSB3aWRnZXQuXG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICAgICAgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgYSwgYikpXG4gICAgfSBlbHNlIGlmIChpc1ZOb2RlKGIpKSB7XG4gICAgICAgIGlmIChpc1ZOb2RlKGEpKSB7XG4gICAgICAgICAgICBpZiAoYS50YWdOYW1lID09PSBiLnRhZ05hbWUgJiZcbiAgICAgICAgICAgICAgICBhLm5hbWVzcGFjZSA9PT0gYi5uYW1lc3BhY2UgJiZcbiAgICAgICAgICAgICAgICBhLmtleSA9PT0gYi5rZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHNQYXRjaCA9IGRpZmZQcm9wcyhhLnByb3BlcnRpZXMsIGIucHJvcGVydGllcylcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNQYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZQYXRjaChWUGF0Y2guUFJPUFMsIGEsIHByb3BzUGF0Y2gpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcHBseSA9IGRpZmZDaGlsZHJlbihhLCBiLCBwYXRjaCwgYXBwbHksIGluZGV4KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WTk9ERSwgYSwgYikpXG4gICAgICAgICAgICAgICAgYXBwbHlDbGVhciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZOT0RFLCBhLCBiKSlcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVlRleHQoYikpIHtcbiAgICAgICAgaWYgKCFpc1ZUZXh0KGEpKSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgICAgICBhcHBseUNsZWFyID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGEudGV4dCAhPT0gYi50ZXh0KSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzV2lkZ2V0KGIpKSB7XG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5XSURHRVQsIGEsIGIpKVxuICAgIH1cblxuICAgIGlmIChhcHBseSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBseVxuICAgIH1cblxuICAgIGlmIChhcHBseUNsZWFyKSB7XG4gICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKGEsIGIsIHBhdGNoLCBhcHBseSwgaW5kZXgpIHtcbiAgICB2YXIgYUNoaWxkcmVuID0gYS5jaGlsZHJlblxuICAgIHZhciBvcmRlcmVkU2V0ID0gcmVvcmRlcihhQ2hpbGRyZW4sIGIuY2hpbGRyZW4pXG4gICAgdmFyIGJDaGlsZHJlbiA9IG9yZGVyZWRTZXQuY2hpbGRyZW5cblxuICAgIHZhciBhTGVuID0gYUNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBiTGVuID0gYkNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBsZW4gPSBhTGVuID4gYkxlbiA/IGFMZW4gOiBiTGVuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBsZWZ0Tm9kZSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgcmlnaHROb2RlID0gYkNoaWxkcmVuW2ldXG4gICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICBpZiAoIWxlZnROb2RlKSB7XG4gICAgICAgICAgICBpZiAocmlnaHROb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gRXhjZXNzIG5vZGVzIGluIGIgbmVlZCB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLklOU0VSVCwgbnVsbCwgcmlnaHROb2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhbGsobGVmdE5vZGUsIHJpZ2h0Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVk5vZGUobGVmdE5vZGUpICYmIGxlZnROb2RlLmNvdW50KSB7XG4gICAgICAgICAgICBpbmRleCArPSBsZWZ0Tm9kZS5jb3VudFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yZGVyZWRTZXQubW92ZXMpIHtcbiAgICAgICAgLy8gUmVvcmRlciBub2RlcyBsYXN0XG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goXG4gICAgICAgICAgICBWUGF0Y2guT1JERVIsXG4gICAgICAgICAgICBhLFxuICAgICAgICAgICAgb3JkZXJlZFNldC5tb3Zlc1xuICAgICAgICApKVxuICAgIH1cblxuICAgIHJldHVybiBhcHBseVxufVxuXG5mdW5jdGlvbiBjbGVhclN0YXRlKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBzaW5nbGUgd2Fsaywgbm90IHR3b1xuICAgIHVuaG9vayh2Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgIGRlc3Ryb3lXaWRnZXRzKHZOb2RlLCBwYXRjaCwgaW5kZXgpXG59XG5cbi8vIFBhdGNoIHJlY29yZHMgZm9yIGFsbCBkZXN0cm95ZWQgd2lkZ2V0cyBtdXN0IGJlIGFkZGVkIGJlY2F1c2Ugd2UgbmVlZFxuLy8gYSBET00gbm9kZSByZWZlcmVuY2UgZm9yIHRoZSBkZXN0cm95IGZ1bmN0aW9uXG5mdW5jdGlvbiBkZXN0cm95V2lkZ2V0cyh2Tm9kZSwgcGF0Y2gsIGluZGV4KSB7XG4gICAgaWYgKGlzV2lkZ2V0KHZOb2RlKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZOb2RlLmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcGF0Y2hbaW5kZXhdID0gYXBwZW5kUGF0Y2goXG4gICAgICAgICAgICAgICAgcGF0Y2hbaW5kZXhdLFxuICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgdk5vZGUsIG51bGwpXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVk5vZGUodk5vZGUpICYmICh2Tm9kZS5oYXNXaWRnZXRzIHx8IHZOb2RlLmhhc1RodW5rcykpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgdmFyIGxlbiA9IGNoaWxkcmVuLmxlbmd0aFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgaW5kZXggKz0gMVxuXG4gICAgICAgICAgICBkZXN0cm95V2lkZ2V0cyhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkgJiYgY2hpbGQuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSBjaGlsZC5jb3VudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhIHN1Yi1wYXRjaCBmb3IgdGh1bmtzXG5mdW5jdGlvbiB0aHVua3MoYSwgYiwgcGF0Y2gsIGluZGV4KSB7XG4gICAgdmFyIG5vZGVzID0gaGFuZGxlVGh1bmsoYSwgYilcbiAgICB2YXIgdGh1bmtQYXRjaCA9IGRpZmYobm9kZXMuYSwgbm9kZXMuYilcbiAgICBpZiAoaGFzUGF0Y2hlcyh0aHVua1BhdGNoKSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBuZXcgVlBhdGNoKFZQYXRjaC5USFVOSywgbnVsbCwgdGh1bmtQYXRjaClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhdGNoZXMocGF0Y2gpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoaW5kZXggIT09IFwiYVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIEV4ZWN1dGUgaG9va3Mgd2hlbiB0d28gbm9kZXMgYXJlIGlkZW50aWNhbFxuZnVuY3Rpb24gdW5ob29rKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoaXNWTm9kZSh2Tm9kZSkpIHtcbiAgICAgICAgaWYgKHZOb2RlLmhvb2tzKSB7XG4gICAgICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBlbmRQYXRjaChcbiAgICAgICAgICAgICAgICBwYXRjaFtpbmRleF0sXG4gICAgICAgICAgICAgICAgbmV3IFZQYXRjaChcbiAgICAgICAgICAgICAgICAgICAgVlBhdGNoLlBST1BTLFxuICAgICAgICAgICAgICAgICAgICB2Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkS2V5cyh2Tm9kZS5ob29rcylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodk5vZGUuZGVzY2VuZGFudEhvb2tzIHx8IHZOb2RlLmhhc1RodW5rcykge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAgIHZhciBsZW4gPSBjaGlsZHJlbi5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICAgICAgICAgIHVuaG9vayhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzVk5vZGUoY2hpbGQpICYmIGNoaWxkLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVuZGVmaW5lZEtleXMob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBMaXN0IGRpZmYsIG5haXZlIGxlZnQgdG8gcmlnaHQgcmVvcmRlcmluZ1xuZnVuY3Rpb24gcmVvcmRlcihhQ2hpbGRyZW4sIGJDaGlsZHJlbikge1xuICAgIC8vIE8oTSkgdGltZSwgTyhNKSBtZW1vcnlcbiAgICB2YXIgYkNoaWxkSW5kZXggPSBrZXlJbmRleChiQ2hpbGRyZW4pXG4gICAgdmFyIGJLZXlzID0gYkNoaWxkSW5kZXgua2V5c1xuICAgIHZhciBiRnJlZSA9IGJDaGlsZEluZGV4LmZyZWVcblxuICAgIGlmIChiRnJlZS5sZW5ndGggPT09IGJDaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBiQ2hpbGRyZW4sXG4gICAgICAgICAgICBtb3ZlczogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTyhOKSB0aW1lLCBPKE4pIG1lbW9yeVxuICAgIHZhciBhQ2hpbGRJbmRleCA9IGtleUluZGV4KGFDaGlsZHJlbilcbiAgICB2YXIgYUtleXMgPSBhQ2hpbGRJbmRleC5rZXlzXG4gICAgdmFyIGFGcmVlID0gYUNoaWxkSW5kZXguZnJlZVxuXG4gICAgaWYgKGFGcmVlLmxlbmd0aCA9PT0gYUNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IGJDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPKE1BWChOLCBNKSkgbWVtb3J5XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gW11cblxuICAgIHZhciBmcmVlSW5kZXggPSAwXG4gICAgdmFyIGZyZWVDb3VudCA9IGJGcmVlLmxlbmd0aFxuICAgIHZhciBkZWxldGVkSXRlbXMgPSAwXG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggYSBhbmQgbWF0Y2ggYSBub2RlIGluIGJcbiAgICAvLyBPKE4pIHRpbWUsXG4gICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgYUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhSXRlbSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgaXRlbUluZGV4XG5cbiAgICAgICAgaWYgKGFJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKGJLZXlzLmhhc093blByb3BlcnR5KGFJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBNYXRjaCB1cCB0aGUgb2xkIGtleXNcbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBiS2V5c1thSXRlbS5rZXldXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2xkIGtleWVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gaSAtIGRlbGV0ZWRJdGVtcysrXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTWF0Y2ggdGhlIGl0ZW0gaW4gYSB3aXRoIHRoZSBuZXh0IGZyZWUgaXRlbSBpbiBiXG4gICAgICAgICAgICBpZiAoZnJlZUluZGV4IDwgZnJlZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gYkZyZWVbZnJlZUluZGV4KytdXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIGZyZWUgaXRlbXMgaW4gYiB0byBtYXRjaCB3aXRoXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZyZWUgaXRlbXMgaW4gYSwgc28gdGhlIGV4dHJhIGZyZWUgbm9kZXNcbiAgICAgICAgICAgICAgICAvLyBhcmUgZGVsZXRlZC5cbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBpIC0gZGVsZXRlZEl0ZW1zKytcbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFzdEZyZWVJbmRleCA9IGZyZWVJbmRleCA+PSBiRnJlZS5sZW5ndGggP1xuICAgICAgICBiQ2hpbGRyZW4ubGVuZ3RoIDpcbiAgICAgICAgYkZyZWVbZnJlZUluZGV4XVxuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGIgYW5kIGFwcGVuZCBhbnkgbmV3IGtleXNcbiAgICAvLyBPKE0pIHRpbWVcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJDaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbmV3SXRlbSA9IGJDaGlsZHJlbltqXVxuXG4gICAgICAgIGlmIChuZXdJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKCFhS2V5cy5oYXNPd25Qcm9wZXJ0eShuZXdJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW55IG5ldyBrZXllZCBpdGVtc1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBhZGRpbmcgbmV3IGl0ZW1zIHRvIHRoZSBlbmQgYW5kIHRoZW4gc29ydGluZyB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaW4gcGxhY2UuIEluIGZ1dHVyZSB3ZSBzaG91bGQgaW5zZXJ0IG5ldyBpdGVtcyBpbiBwbGFjZS5cbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG5ld0l0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaiA+PSBsYXN0RnJlZUluZGV4KSB7XG4gICAgICAgICAgICAvLyBBZGQgYW55IGxlZnRvdmVyIG5vbi1rZXllZCBpdGVtc1xuICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNpbXVsYXRlID0gbmV3Q2hpbGRyZW4uc2xpY2UoKVxuICAgIHZhciBzaW11bGF0ZUluZGV4ID0gMFxuICAgIHZhciByZW1vdmVzID0gW11cbiAgICB2YXIgaW5zZXJ0cyA9IFtdXG4gICAgdmFyIHNpbXVsYXRlSXRlbVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBiQ2hpbGRyZW4ubGVuZ3RoOykge1xuICAgICAgICB2YXIgd2FudGVkSXRlbSA9IGJDaGlsZHJlbltrXVxuICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuXG4gICAgICAgIC8vIHJlbW92ZSBpdGVtc1xuICAgICAgICB3aGlsZSAoc2ltdWxhdGVJdGVtID09PSBudWxsICYmIHNpbXVsYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgbnVsbCkpXG4gICAgICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIG5lZWQgYSBrZXkgaW4gdGhpcyBwb3NpdGlvbi4uLlxuICAgICAgICAgICAgaWYgKHdhbnRlZEl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXVsYXRlSXRlbSAmJiBzaW11bGF0ZUl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFuIGluc2VydCBkb2Vzbid0IHB1dCB0aGlzIGtleSBpbiBwbGFjZSwgaXQgbmVlZHMgdG8gbW92ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoYktleXNbc2ltdWxhdGVJdGVtLmtleV0gIT09IGsgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbXVsYXRlSXRlbSA9IHNpbXVsYXRlW3NpbXVsYXRlSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcmVtb3ZlIGRpZG4ndCBwdXQgdGhlIHdhbnRlZCBpdGVtIGluIHBsYWNlLCB3ZSBuZWVkIHRvIGluc2VydCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW1zIGFyZSBtYXRjaGluZywgc28gc2tpcCBhaGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltdWxhdGVJbmRleCsrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKHtrZXk6IHdhbnRlZEl0ZW0ua2V5LCB0bzoga30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrK1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYSBrZXkgaW4gc2ltdWxhdGUgaGFzIG5vIG1hdGNoaW5nIHdhbnRlZCBrZXksIHJlbW92ZSBpdFxuICAgICAgICAgICAgZWxzZSBpZiAoc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbXVsYXRlSW5kZXgrK1xuICAgICAgICAgICAgaysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWxsIHRoZSByZW1haW5pbmcgbm9kZXMgZnJvbSBzaW11bGF0ZVxuICAgIHdoaWxlKHNpbXVsYXRlSW5kZXggPCBzaW11bGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgc2ltdWxhdGVJdGVtID0gc2ltdWxhdGVbc2ltdWxhdGVJbmRleF1cbiAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpKVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBvbmx5IG1vdmVzIHdlIGhhdmUgYXJlIGRlbGV0ZXMgdGhlbiB3ZSBjYW4ganVzdFxuICAgIC8vIGxldCB0aGUgZGVsZXRlIHBhdGNoIHJlbW92ZSB0aGVzZSBpdGVtcy5cbiAgICBpZiAocmVtb3Zlcy5sZW5ndGggPT09IGRlbGV0ZWRJdGVtcyAmJiAhaW5zZXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBuZXdDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogbmV3Q2hpbGRyZW4sXG4gICAgICAgIG1vdmVzOiB7XG4gICAgICAgICAgICByZW1vdmVzOiByZW1vdmVzLFxuICAgICAgICAgICAgaW5zZXJ0czogaW5zZXJ0c1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoYXJyLCBpbmRleCwga2V5KSB7XG4gICAgYXJyLnNwbGljZShpbmRleCwgMSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IGluZGV4LFxuICAgICAgICBrZXk6IGtleVxuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5SW5kZXgoY2hpbGRyZW4pIHtcbiAgICB2YXIga2V5cyA9IHt9XG4gICAgdmFyIGZyZWUgPSBbXVxuICAgIHZhciBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGhcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblxuICAgICAgICBpZiAoY2hpbGQua2V5KSB7XG4gICAgICAgICAgICBrZXlzW2NoaWxkLmtleV0gPSBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcmVlLnB1c2goaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGtleXM6IGtleXMsICAgICAvLyBBIGhhc2ggb2Yga2V5IG5hbWUgdG8gaW5kZXhcbiAgICAgICAgZnJlZTogZnJlZSAgICAgIC8vIEFuIGFycmF5IG9mIHVua2V5ZWQgaXRlbSBpbmRpY2VzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRQYXRjaChhcHBseSwgcGF0Y2gpIHtcbiAgICBpZiAoYXBwbHkpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoYXBwbHkpKSB7XG4gICAgICAgICAgICBhcHBseS5wdXNoKHBhdGNoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwbHkgPSBbYXBwbHksIHBhdGNoXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFwcGx5XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGNoXG4gICAgfVxufVxuIiwiaW1wb3J0IEZyZWV6ZXIgZnJvbSAnZnJlZXplci1qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciB7XG4gIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgIHRoaXMuX19mcmVlemVyID0gbmV3IEZyZWV6ZXIob2JqZWN0KTtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyZWV6ZXIuZ2V0KCk7XG4gIH1cblxuICBzZXQoLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuX19mcmVlemVyLnNldChhcmdzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX19mcmVlemVyLnNldCguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuX19mcmVlemVyLnJlbW92ZShhcmdzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX19mcmVlemVyLnJlbW92ZSguLi5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyZWV6ZXIub24oJ3VwZGF0ZScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmVlemVyLm9mZigndXBkYXRlJywgY2FsbGJhY2spO1xuICB9XG5cbiAgdHJpZ2dlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyZWV6ZXIudHJpZ2dlcigndXBkYXRlJywgdGhpcy5fX2ZyZWV6ZXIuZ2V0KCkpO1xuICB9XG59XG4iLCJpbXBvcnQgcmFmIGZyb20gJ3JhZic7XG5pbXBvcnQgdkRvbUNyZWF0ZSBmcm9tICd2aXJ0dWFsLWRvbS92ZG9tL2NyZWF0ZS1lbGVtZW50JztcbmltcG9ydCB2RG9tRGlmZiBmcm9tICd2aXJ0dWFsLWRvbS92dHJlZS9kaWZmJztcbmltcG9ydCB2RG9tUGF0Y2ggZnJvbSAndmlydHVhbC1kb20vdmRvbS9wYXRjaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3Rvcih2aWV3KSB7XG4gICAgdGhpcy5fX3ZpZXcgPSB2aWV3O1xuXG4gICAgdGhpcy5fX3JlZHJhd0ltbWVkaWF0ZWx5QmluZGVkID0gdGhpcy5fX3JlZHJhd0ltbWVkaWF0ZWx5LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9fY3VycmVudFRyZWUgPSAoMCwgdGhpcy5fX3ZpZXcpKCk7XG4gICAgdGhpcy5fX3RhcmdldCA9IHZEb21DcmVhdGUodGhpcy5fX2N1cnJlbnRUcmVlKTtcbiAgfVxuXG4gIGdldCB2aWV3KCkge1xuICAgIHJldHVybiB0aGlzLl9fdmlldztcbiAgfVxuXG4gIGdldCB0YXJnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190YXJnZXQ7XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgcmFmKHRoaXMuX19yZWRyYXdJbW1lZGlhdGVseUJpbmRlZCk7XG4gIH1cblxuICBfX3JlZHJhd0ltbWVkaWF0ZWx5KCkge1xuICAgIGxldCBuZXdUcmVlID0gKDAsIHRoaXMudmlldykoKTtcbiAgICBsZXQgcGF0Y2hlcyA9IHZEb21EaWZmKHRoaXMuX19jdXJyZW50VHJlZSwgbmV3VHJlZSk7XG4gICAgdGhpcy5fX3RhcmdldCA9IHZEb21QYXRjaCh0aGlzLl9fdGFyZ2V0LCBwYXRjaGVzKTtcblxuICAgIHRoaXMuX19jdXJyZW50VHJlZSA9IG5ld1RyZWU7XG4gIH1cbn1cbiIsImltcG9ydCBSb3V0ZVRyaWUgZnJvbSAncm91dGUtdHJpZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyaWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9fcm91dGVUcmllID0gbmV3IFJvdXRlVHJpZSgpO1xuICB9XG5cbiAgZGVmaW5lKHBhdHRlcm4pIHtcbiAgICBsZXQgcm91dGVUcmllTm9kZSA9IHRoaXMuX19yb3V0ZVRyaWUuZGVmaW5lKHBhdHRlcm4pO1xuICAgIHJldHVybiBuZXcgTm9kZSh0aGlzLCByb3V0ZVRyaWVOb2RlKTtcbiAgfVxuXG4gIG1hdGNoKHBhdGgpIHtcbiAgICBsZXQgcm91dGVUcmllTWF0Y2ggPSB0aGlzLl9fcm91dGVUcmllLm1hdGNoKHBhdGgpO1xuICAgIHJldHVybiByb3V0ZVRyaWVNYXRjaCAhPT0gbnVsbFxuICAgICAgPyBuZXcgTWF0Y2godGhpcywgcm91dGVUcmllTWF0Y2gpXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBpcyhmaXJzdE5vZGUsIHNlY29uZE5vbmUpIHtcbiAgICByZXR1cm4gZmlyc3ROb2RlLl9fcm91dGVUcmllTm9kZSA9PT0gc2Vjb25kTm9uZS5fX3JvdXRlVHJpZU5vZGU7XG4gIH1cbn1cblxuY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHRyaWUsIHJvdXRlVHJpZU5vZGUpIHtcbiAgICB0aGlzLl9fdHJpZSA9IHRyaWU7XG4gICAgdGhpcy5fX3JvdXRlVHJpZU5vZGUgPSByb3V0ZVRyaWVOb2RlO1xuICB9XG5cbiAgZ2V0IHBhdHRlcm4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX19yb3V0ZVRyaWVOb2RlLl9ub2RlU3RhdGUucGF0dGVybjtcbiAgfVxufVxuXG5jbGFzcyBNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKHRyaWUsIHJvdXRlVHJpZU1hdGNoKSB7XG4gICAgdGhpcy5fX3RyaWUgPSB0cmllO1xuICAgIHRoaXMuX19yb3V0ZVRyaWVNYXRjaCA9IHJvdXRlVHJpZU1hdGNoO1xuICB9XG5cbiAgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3JvdXRlVHJpZU1hdGNoLnBhcmFtcztcbiAgfVxuXG4gIGdldCBub2RlKCkge1xuICAgIHJldHVybiBuZXcgTm9kZSh0aGlzLl9fdHJpZSwgdGhpcy5fX3JvdXRlVHJpZU1hdGNoLm5vZGUpO1xuICB9XG59XG4iXX0=
