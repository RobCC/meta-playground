const g = require('../utils/logger');

// https://exploringjs.com/es6/ch_proxies.html#_pitfall-not-all-objects-can-be-wrapped-transparently-by-proxies

////////////////////////////////////////////////////////////////

// Wrapping an object affects this
const cTarget = {
  getContexts() {
      return {
          thisIsTarget: this === cTarget,
          thisIsProxy: this === cProxy,
      };
  }
};
const cProxy = new Proxy(cTarget, {});

g.title('Wrapping an object affects this');
g.log('', cTarget.getContexts())
g.log('', cProxy.getContexts())

////////////////////////////////////////////////////////////////

// Wrapping instances of built-in constructors
// https://exploringjs.com/es6/ch_proxies.html#_wrapping-instances-of-built-in-constructors
// Array is an exception, they can be transparently wrapped. Its methods don’t rely on internal slots

const dTarget = new Date();
const dProxy = new Proxy(dTarget, {});

// dTarget.getDate() // works
// dProxy.getDate(); // TypeError: this is not a Date object.

////////////////////////////////////////////////////////////////

// Instancing from Proxy to pass handler functionaity

const iProxy = new Proxy({ prop1: 1 }, {
  get(target, propKey, receiver) {
    if (!(propKey in target)) {
        throw new ReferenceError('Unknown property: '+propKey);
    }
    return Reflect.get(target, propKey, receiver);
  }
});

const es5Extend = { __proto__: iProxy, ab: 2 }

function ProxyClass() {};
ProxyClass.prototype = iProxy;

const proxyClassInstance = new ProxyClass();

class Es6Class extends ProxyClass {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

const es6ClassInstance = new Es6Class(5, 7);

g.title('Instancing from Proxy')
g.log(es5Extend.prop1)
//g.log(es5Extend.nonExistingProp) // Throws ReferenceError
g.log(proxyClassInstance.prop1);
//g.log(proxyClassInstance.nonExistingProp) // Throws ReferenceError
g.log(es6ClassInstance.prop1);
//g.log(es6ClassInstance.nonExistingProp) // Throws ReferenceError
