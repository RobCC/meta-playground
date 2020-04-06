const g = require('../utils/logger');

// Characteristics that remain unchanged in the face of language operations are called invariants.
// With proxies, it is easy to violate invariants, as they are not intrinsically
// bound by non-extensibility etc.

////////////////////////////////////////////////////////////////

// In response to the getPrototypeOf trap, the proxy must return the target’s prototype
// if the target is non-extensible (even if both prototypes are Objects')

const fakePrototype = {};
const handler = {
    getPrototypeOf: t => fakePrototype
};

const extensibleTarget = {};
const nonExtensibleTarget = {};
Object.preventExtensions(nonExtensibleTarget);

const ext = new Proxy(extensibleTarget, handler);
const nonExt = new Proxy(nonExtensibleTarget, handler);


g.title("Invariant 1: Proxy must return target's prototype if it's non-extensible")
g.log(Object.getPrototypeOf(ext) === fakePrototype); // true

try {
  Object.getPrototypeOf(nonExt); // TypeError
} catch (e) {
  g.log(e)
}

////////////////////////////////////////////////////////////////

// If the target has a non-writable non-configurable property then the handler must return
// that property’s value in response to a get trap.

const dummyGetHandler = {
  get(target, propKey) {
      return 'abc';
  }
};

const propTarget = Object.defineProperties({}, {
  foo: {
      value: 123,
      writable: true,
      configurable: true
  },
  bar: {
      value: 456,
      writable: false,
      configurable: false
  },
});

const propCheckProxy = new Proxy(propTarget, dummyGetHandler);

g.title('Invariant 2: If target has non-config, non-writtable prop, it must return its value');
g.log('propCheckProxy.foo', propCheckProxy.foo)

try {
  propCheckProxy.bar
} catch (e) {
  g.log(e)
}
