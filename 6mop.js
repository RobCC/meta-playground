/**
 * https://exploringjs.com/es6/ch_proxies.html#sec_meta-object-protocol
 *
 * Meta Object Protocol (MOP) is a ECMAScript specification that describes
 * the behavior of Objects. It has its own internal methods.
 *
 * JS engines may or may not have them, as they exist only in the specification,
 * and are not accessible from JS
 *
 * These are named with double square brackets
 *
 * The internal method for getting properties is called [[Get]].
 *
 * [[Get]] calls other MOP operations. Operations that do that are called derived.
 * Operations that don’t depend on other operations are called fundamental.
 *
 *
 * The MOP of Proxies is different than the one for objects.
 *
 * For proxies, each operation (regardless of whether it is fundamental or derived)
 * is either intercepted by a handler method or forwarded to the target.
 */
