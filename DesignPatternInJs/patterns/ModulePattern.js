/* eslint-disable no-console */
// JavaScript does not support access modifiers. In a classical OOP language,
// a user defines a class and determines access rights for its members.
// Since JavaScript in its plain form supports neither classes nor access modifiers,
// JavaScript developers figured out a way to mimic this behavior when needed using Closure

//  A closure is a function with access to the parent scope,
// even after the parent function has closed.

// Using the closures, we can create objects with private and public parts.
// These are called modules and are very useful whenever we want to hide
// certain parts of an object and only expose an interface to the user of the module.

// through the use of a closure we expose an object
// as a public API which manages the private objects array

const collection = (() => {
  // private members
  const objects = [];

  // public members
  return {
    addObject(object) {
      objects.push(object);
    },
    removeObject(object) {
      const index = objects.indexOf(object);
      if (index >= 0) {
        objects.splice(index, 1);
      }
    },
    getObjects() {
      return JSON.parse(JSON.stringify(objects));
    },
  };
})();

collection.addObject('Bob');
collection.addObject('Alice');
collection.addObject('Franck');
console.log(collection.getObjects());
collection.removeObject('Alice');
console.log(collection.getObjects());

// The most useful thing that this pattern introduces is the
// clear separation of private and public parts of an object
