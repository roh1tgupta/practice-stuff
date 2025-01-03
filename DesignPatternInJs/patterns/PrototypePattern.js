// js enables us to create objects which can serve as a prototype for other
// objects being created. The prototype object is used as a blueprint for
// each object the constructor creates.

var personPrototype = {
  sayHi: function() {
      console.log("Hello, my name is " + this.name + ", and I am " + this.age);
  },
  sayBye: function() {
      console.log("Bye Bye!");
  }
};

function Person(name, age) {
  name = name || "John Doe";
  age = age || 26;

  function constructorFunction(name, age) {
      this.name = name;
      this.age = age;
  };

  constructorFunction.prototype = personPrototype;

  var instance = new constructorFunction(name, age);
  return instance;
}

var person1 = Person();
var person2 = Person("Bob", 38);

// prints out Hello, my name is John Doe, and I am 26
person1.sayHi();
// prints out Hello, my name is Bob, and I am 38
person2.sayHi();

person2.sayBye();