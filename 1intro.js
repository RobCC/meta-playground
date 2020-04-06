const g = require('../utils/logger');

////////////////////////////////////////////////////////////////

// Proxy with default value

const defaultHandler = defValue => ({
  get: (target, prop, receiver) => (prop in target) ? Reflect.get(target, prop, receiver) : defValue
});

const withDefaultValue = (target, defValue) => new Proxy(
  target,
  defaultHandler(defValue)
);

const obj = { x: 1 };
const prox = withDefaultValue(obj, 'No value here');

g.title('Default value');
g.log(`${obj.nonExistingProp}:${prox.nonExistingProp}`);

////////////////////////////////////////////////////////////////

//Negative array

const negativeArray = arr => new Proxy(arr, {
  get: (target, prop, receiver) => Reflect.get(
    target,
    (+prop < 0) ? target.length + +prop : prop,
    receiver,
  )
});

const arr = [1, 2, 3];
const arProxy = negativeArray(arr);

g.title('Negative array');
g.log(`${arr[-1]}:${arProxy[-1]}`);


/////////////////////////////////////////////////////////////////

//Hide props with prefix
// Executing the object (> obj;) on DevTools will print the hidden props

const hide = (target, prefix = '_') => new Proxy(target, {
  has: (target, prop) =>
    typeof prop !== 'symbol' &&
    !prop.startsWith(prefix) &&
    prop in obj,
  get: (target, prop, receiver) => (prop in receiver) ? Reflect.get(target, prop) : undefined,
  ownKeys: target => Reflect.ownKeys(target).filter(
    prop => (typeof prop !== 'string' || !prop.startsWith(prefix))
  ),
});

const userData = hide({
  _id: 16,
  name: 'Rob',
  age: 25
});

g.title('Hide props with prefix');
g.log('_id' in userData)
g.log(userData._id)
g.log(Object.keys(userData))

/////////////////////////////////////////////
// Trapping all handlers through get
/**
 * For each trap, the proxy asks for a handler method via the get operation and we give it one.
 * That is, all of the handler methods can be implemented via the single meta method get.
 * It was one of the goals for the proxy API to make this kind of virtualization simple.
 */

g.title('Trapping all handlers through get');

/**
 * For each trap, the proxy asks for a handler method via the get operation and we give it one.
 * That is, all of the handler methods can be implemented via the single meta method get.
 * It was one of the goals for the proxy API to make this kind of virtualization simple.
 */
const allHandler = new Proxy({}, {
  get(target, trapName, receiver) { // target is the empty object above
    // Return the handler method named trapName
    return function (...args) { // args includes the empty object below (new Proxy({}, ...) )
        const params = args.slice(1);
        g.log(`<${trapName}> ${params[0].toString()}`, params[1]);

        return Reflect[trapName](...args);
    }
  }
});

const allProxy = new Proxy({}, allHandler);

allProxy.foo = 123;

/////////////////////////////////////////////
