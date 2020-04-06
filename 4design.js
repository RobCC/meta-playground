/**
 * Proxies are stratified
 * Base level (the proxy object) and meta level (the handler object) are separate.
 *
 *
 * Proxies are used in two roles
 * As wrappers, they wrap their targets, they control access to them.
 * Examples of wrappers are: revocable resources and tracing proxies.
 *
 * As virtual objects, they are simply objects with special behavior and their targets don’t matter.
 * An example is a proxy that forwards method calls to a remote object.
 *
 *
 * Proxies are shielded in two ways:
 * It is impossible to determine whether an object is a proxy or not (transparent virtualization).
 * You can’t access a handler via its proxy (handler encapsulation).
 *
 *
 * Invariants
 * There are two ways of protecting objects:

 * Non-extensibility protects objects
 * Non-configurability protects properties (or rather, their attributes)
 *
 * https://stackoverflow.com/questions/23590502/difference-between-configurable-and-writable-attributes-of-an-object
 *
 *
 *
 * Traditionally, non-extensibility and non-configurability are:

 * Universal: they work for all objects.
 * Monotonic: once switched on, they can’t be switched off again.
 *
 * These and other characteristics that remain unchanged in the face of
 * language operations are called invariants.
 * With proxies, it is easy to violate invariants, as they are not
 * intrinsically bound by non-extensibility etc.
 */
