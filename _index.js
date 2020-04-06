const target = {
  msg: 'Test',
};

const handler = {
  get: (target, key) => {
    if (typeof key !== 'symbol' && (typeof key === 'string' && key !== 'inspect')) {
      console.log(`Key: ${key}`);
      console.log(`Value: ${target[key]}`);
    }

    return target[key];
  },
  set: (target, key, value) => {
    if (key === 'msg' && (value.length === 0 || typeof(value) !== 'string')) {
      throw new TypeError('Msg cannot be empty and must be a string.');
    }

    target[key] = value;
  },
};

let proxy = new Proxy(target, handler);

proxy.msg = '1234'; // set
console.log(proxy.msg); // get
console.log(proxy); // get

// proxy.msg;




// Object.assign(
//   {},
//   ['get', 'delete', 'post', 'put', 'patch'].reduce((obj, method) => {
//     return Object.assign({}, obj, {
//       [method]: (url = '', body = {}, params = {}) => {
//         if (method === 'get' || method === 'post') {
//           return { url, body, params };
//         }
//         return { url, method, data: body };
//       },
//     });
//   }, {}),
// );

// const proxyHandler = {
//   ...['get', 'delete', 'post', 'put', 'patch'].reduce(
//     (obj, method) => ({
//       ...obj,
//       [method]: (url = '', body = {}, params = {}) => {
//         if (method === 'get' || method === 'post') {
//           return { url, body, params };
//         }
//         return { url, method, data: body };
//       },
//     }),
//     {},
//   ),
// };
