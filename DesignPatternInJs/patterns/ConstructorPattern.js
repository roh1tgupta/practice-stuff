/* eslint-disable no-console */

// When thinking about classical object-oriented languages, a constructor
// is a special function in a class which initializes an object with some set of
// default and/or sent-in values.

// Common ways to create objects in JavaScript are the three following ways:
const instance1 = {};
const instance2 = Object.create(Object.prototype);
const instance3 = new Object();

// adding properties
instance1.key = "A key's value";
instance2.key = "A key's value";
Object.defineProperty(instance3, 'key', {
  value: "A key's value",
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperties(instance3, {
  firstKey: {
    value: "First key's value",
    writable: true,
  },
  secondKey: {
    value: "Second key's value",
    writable: false,
  },
});

console.log('instance1.key: ', instance1.key);
console.log("instance1['key']:", instance1.key);
console.log("instance2['key']:", instance2.key);
console.log("instance3['key']:", instance3.key);
console.log("instance3['firstKey']:", instance3.firstKey);
console.log('instance3.secondKey:', instance3.secondKey);

// JavaScript doesn’t support native classes, but it does support constructors
// through the use of a "new" keyword prefixed to a function call. This way, we
// can use the function as a constructor and initialize its properties the same way
// we would with a classic language constructor.

// we define a constructor for Person objects
function Person(name, age, isDeveloper) {
  this.name = name;
  this.age = age;
  this.isDeveloper = isDeveloper || false;
  this.writesCode = () => {
    console.log(this.isDeveloper ? 'This person does write code' : 'This person does not write code');
  };
}

let person1 = new Person('Bob', 38, true);
let person2 = new Person('Alice', 32);
person1.writesCode();
person2.writesCode();
// in this approach writesCode gets redefined for each of the instances of the Person constructor.
// We can avoid this by setting the method into the function prototype:

function NewPerson(name, age, isDeveloper) {
  this.name = name;
  this.age = age;
  this.isDeveloper = isDeveloper || false;
}
// we extend the function's prototype
NewPerson.prototype.writesCode1 = function () {
  // here above, if we use arrow operator, this will take context
  // of the file not of the calling person
  // console.log(this.isDeveloper, this.name);
  console.log(this.isDeveloper ? 'This person does write code' : 'This person does not write code');
};
this.name = 'rohit';
person1 = new NewPerson('Bob', 38, true);
person2 = new NewPerson('Alice', 32);
person1.writesCode1();
person2.writesCode1();

// Now, both instances of the Person constructor can access a
// shared instance of the writesCode() method.
