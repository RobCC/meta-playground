const g = require('../utils/logger');

////////////////////////////////////////////////////////////////

/**
 * https://exploringjs.com/es6/ch_proxies.html#sec_membranes
 *
 * Membranes build on the idea of revocable references:
 * Environments that are designed to run untrusted code, wrap a membrane
 * around that code to isolate it and keep the rest of the system safe
 */
