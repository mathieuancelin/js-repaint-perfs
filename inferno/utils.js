"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isServer = typeof document === 'undefined' ? true : false;

function isUndef(obj) {
	return obj === undefined;
}

function isNullOrUndef(obj) {
	return isUndef(obj) || isNull(obj);
}

function isNull(obj) {
	return obj === null;
}

function isInvalid(obj) {
	return isUndef(obj) || isNull(obj) || isTrue(obj) || isFalse(obj);
}

function isArray(obj) {
	return Array.isArray(obj);
}

function isPromise(obj) {
	return obj instanceof Promise;
}

function isObject(obj) {
	return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isString(obj) {
	return typeof obj === 'string';
}

function isNumber(obj) {
	return typeof obj === 'number';
}

function isFunction(obj) {
	return typeof obj === 'function';
}

function isFalse(obj) {
	return obj === false;
}

function isTrue(obj) {
	return obj === true;
}

function isStringOrNumber(obj) {
	return isString(obj) || isNumber(obj);
}

function appendChild(parentDomNode, childDomNode) {
	parentDomNode.appendChild(childDomNode);
}

function removeChild(parentDomNode, childDomNode) {
	parentDomNode.removeChild(childDomNode);
}

function appendOrInsertChild(parentDomNode, newDomNode, nextDomNode) {
	if (isUndef(nextDomNode)) {
		parentDomNode.appendChild(newDomNode);
	} else {
		parentDomNode.insertBefore(newDomNode, nextDomNode);
	}
}

function replaceChild(parentDomNode, newDomNode, oldDomNode) {
	parentDomNode.replaceChild(newDomNode, oldDomNode);
}

function createTextNode(text) {
	return document.createTextNode(text);
}

function isPromise(obj) {
	obj instanceof Promise;
}

function isStatefulComponent(obj) {
	return !isUndef(obj.prototype) && obj.prototype.render !== undefined;
}