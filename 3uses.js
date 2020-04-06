const g = require('../utils/logger');

////////////////////////////////////////////////////////////////

// Negative array indices

const createArray = (...elements) => new Proxy([...elements], {
  get(target, propKey, receiver) {
    // Sloppy way of checking for negative indices
    const index = Number(propKey);
    if (index < 0) {
        propKey = String(target.length + index);
    }
    return Reflect.get(target, propKey, receiver);
  }
});

const arr = createArray('a', 'b', 'c');
g.title('Negative array indices')
g.log(arr[-1]); // c

////////////////////////////////////////////////////////////////

// Create an observer

const createObserved = (observed, callback) => {
  return new Proxy(observed, {
    set: (target, prop, value, receiver) => {
      callback(prop, value);
      return Reflect.set(target, prop, value, receiver);
    }
  })
}

const observer = {};
const observedObject = createObserved({}, (prop, val) => {
  observer[prop] = val;
});

g.title('Create an observer')
g.log('', observedObject)

observedObject.prop = 1;

g.log('Observed: ', observedObject)
g.log('Observer: ', observer)

////////////////////////////////////////////////////////////////

// Restful web service

const dummyFetch = () => new Promise((resolve, reject) => {
  const dummyData = { id: 1, name: 'Rob' };

  resolve(dummyData);
});

const createWebService = baseUrl => new Proxy({}, {
  get: (target, propKey, receiver) => {
      g.log(`${baseUrl}/${propKey}`);
      return dummyFetch;
  }
});

const service = createWebService('http://example.com/data');

g.title('Restful web service');
service.employee().then(response => g.log('', response));


/**
 * Other examples:
 *
 * Remoting: Local placeholder objects forward method invocations to remote objects.
 * This use case is similar to the web service example.
 *
 * Data access objects for databases: Reading and writing to the object reads and writes to the database.
 * This use case is similar to the web service example.
 *
 * Profiling: Intercept method invocations to track how much time is spent in each method. This use case is similar to the tracing example.
 *
 * Type checking: Nicholas Zakas has used proxies to type-check objects.
 */
