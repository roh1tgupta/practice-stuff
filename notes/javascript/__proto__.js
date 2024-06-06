// let animal = {
//   eats: true
// };
// let rabbit = {
//   jumps: true
// };

// // let ab = new animal();
// // console.log(ab);   //TypeError:  animal is not a constructor

// rabbit.__proto__ = animal; // (*)

// // we can find both properties in rabbit now:
// console.log( rabbit.eats ); // true (**)
// console.log( rabbit.jumps ); // true
// // Here we can say that "animal is the prototype of rabbit" or "rabbit prototypically inherits from animal".



// let animal = {
//   eats: true,
//   walk() {
//     console.log("Animal walk");
//   }
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// let longEar = {
//   earLength: 10,
//   __proto__: rabbit
// };

// // walk is taken from the prototype chain
// longEar.walk(); // Animal walk
// console.log(longEar.jumps); // true (from rabbit)



//The references can't go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
//The value of __proto__ can be either an object or null. Other types are ignored.
//The prototype is only used for reading properties.
//Write/delete operations work directly with the object.

// let animal = {
//   eats: true,
//   walk() {
//     /* this method won't be used by rabbit */
//   }
// };
// let rabbit = {
//   __proto__: animal
// };
// rabbit.walk = function() {
//   console.log("Rabbit! Bounce-bounce!");
// };
// rabbit.walk(); // Rabbit! Bounce-bounce!




//Accessor properties are an exception, as assignment is handled by a setter function.
//So writing to such a property is actually the same as calling a function.

let user = {
  name: "John",
  surname: "Smith",
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // John Smith (*)
// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
console.log(admin.fullName); // Alice Cooper

//No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.
// let animal = {
//   walk() {
//     if (!this.isSleeping) {
//       console.log(`I walk`);
//     }
//   },
//   sleep() {
//     this.isSleeping = true;
//   }
// };
// let rabbit = {
//   name: "White Rabbit",
//   __proto__: animal
// };
// modifies rabbit.isSleeping
// rabbit.sleep();
// console.log(rabbit.isSleeping); // true
// console.log(animal.isSleeping); // undefined (no such property in the prototype)



// // The for..in loop iterates over inherited properties too.
// let animal = {
//   eats: true,
//   walk() {
//     console.log('animal walks');
//   }
// };
// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };
// // Object.keys only returns own keys
// console.log(Object.keys(rabbit)); // jumps
// // for..in loops over both own and inherited keys
// for(let prop in rabbit) console.log(prop); // jumps, then eats


//If that's not what we want, and we'd like to exclude inherited properties,
//there's a built-in method obj.hasOwnProperty(key): it returns true if obj has
//its own (not inherited) property named key.

// let animal = {
//   eats: true
// };
// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };
// for(let prop in rabbit) {
//   let isOwn = rabbit.hasOwnProperty(prop);
//   if (isOwn) {
//     console.log(`Our: ${prop}`); // Our: jumps
//   } else {
//     console.log(`Inherited: ${prop}`); // Inherited: eats
//   }
// }

// for..in only lists enumerable properties
//rabit --[[Prototype]]--> animal --[[Prototype]]--> Object.prototype --[[Prototype]]--> null
// rabbit inherits hasOwnProperty from Object.prototype but its not shown in for--in loop as its not enumerable
//it has 'enumerable:false' flag


// //question
// let hamster = {
//   stomach: [],
//   eat(food) {
//     this.stomach.push(food);
//   }
// };
// let speedy = {
//   __proto__: hamster
// };
// let lazy = {
//   __proto__: hamster
// };
// // This one found the food
// speedy.eat("apple");
// console.log( speedy.stomach ); // apple
// // This one also has it, why? fix please.
// console.log( lazy.stomach ); // apple
