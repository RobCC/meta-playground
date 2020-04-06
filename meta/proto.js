function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Actual prototype
Shape.prototype; // { move: ƒ, constructor: ƒ }

//What runs to generate the actual prototype (Function's prototype)
Shape.__proto__; // ƒ () { [native code] }

const myShape = new Shape();
myShape.prototype // undefined
myShape.__proto__ // Points to Shape.prototype

//What
Shape.prototype.__proto__; // { constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, ... }



function Rectangle() {
  Shape.call(this); // call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);





/***
 * https://stackoverflow.com/questions/650764/how-does-proto-differ-from-constructor-prototype
 *
 * For reference:
 * ( new Foo ).__proto__ === Foo.prototype;
 * ( new Foo ).prototype === undefined;
 *
 * proto points to the parent's prototype (to what generated it)
 * The prototype property is special only for Function objects
 *
 * Declared function's protos will point to Function's prototype
 * Prototype's __proto__ will point to Object's protoype
 *
 *
 * Object.__proto__ === Function.prototype
 * Function.prototype.__proto__ === Object.prototype   WHY
 *
 * Technically, __proto__ is a property of an object, while prototype is a property of function.
 * But how could functions have property? Because everything in JavaScript is converted implicitly to an object.
 *
 *
 * Function.prototype === Function.__proto__
 * Function === Function.constructor
 */
