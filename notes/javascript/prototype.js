// ref: https://javascript.info/function-prototype

//Please note that F.prototype here means a regular property named "prototype" on F.
//It sounds something similar to the term “prototype”, but here we really mean a regular property with this name.
let animal = {
  eats: true
};
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
console.log( rabbit.eats ); // true
console.log( rabbit.name ); // White Rabbit
console.log(rabbit.__proto__ === animal);


//Setting Rabbit.prototype = animal literally states the following: "When a new Rabbit is created, assign its [[Prototype]] to animal".
//F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object.
// If, after the creation, F.prototype property changes (F.prototype = <another object>),
// then new objects created by new F will have another object as [[Prototype]], but already existing objects keep the old one.
//The default "prototype" is an object with the only property constructor that points back to the function itself.
// function Rabbit() {}
// // by default:
// // Rabbit.prototype = { constructor: Rabbit }
// console.log( Rabbit.prototype.constructor == Rabbit ); // true



//Naturally, if we do nothing, the constructor property is available to all rabbits through [[Prototype]]:
// function Rabbit() {}
// // by default:
// // Rabbit.prototype = { constructor: Rabbit }
// let rabbit = new Rabbit(); // inherits from {constructor: Rabbit}
// console.log(rabbit.constructor == Rabbit); // true (from prototype)



//We can use constructor property to create a new object using the same constructor as the existing one.
// function Rabbit(name) {
//   this.name = name;
//   console.log(name);
// }
// let rabbit = new Rabbit("White Rabbit");
// let rabbit2 = new rabbit.constructor("Black Rabbit");



// That’s handy when we have an object, don’t know which constructor was used for
// it (e.g. it comes from a 3rd party library), and we need to create another one of the same kind.
// But probably the most important thing about "constructor" is that…
// …JavaScript itself does not ensure the right "constructor" value.
// Yes, it exists in the default "prototype" for functions, but that’s all. What happens with it later – is totally on us.
// In particular, if we replace the default prototype as a whole, then there will be no "constructor" in it.
// for instance
// function Rabbit() {}
// Rabbit.prototype = {
//   jumps: true
// };
// let rabbit = new Rabbit();
// console.log(rabiit.jumps); // true
// console.log(rabbit.constructor === Rabbit); // false



//So, to keep the right "constructor" we can choose to add/remove properties to the default "prototype"
//instead of overwriting it as a whole:
// function Rabbit() {}
// // Not overwrite Rabbit.prototype totally
// // just add to it
// Rabbit.prototype.jumps = true
// // the default Rabbit.prototype.constructor is preserved
// // Or, alternatively, recreate the constructor property manually:
// Rabbit.prototype = {
//   jumps: true,
//   constructor: Rabbit
// };
// now constructor is also correct, because we added it



//On regular objects the prototype is nothing special:
// let user = {
//   name: "John",
//   prototype: "Bla-bla" // no magic at all
// };




// questions:
// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };
// let rabbit = new Rabbit();
// Rabbit.prototype = {};
// console.log( rabbit.eats ); // ? true



// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };
// let rabbit = new Rabbit();
// Rabbit.prototype.eats = false;
// console.log( rabbit.eats ); // ? false
// Rabbit.prototype.jumps = true;
// console.log(rabbit.jumps); // ? true



// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };
// let rabbit = new Rabbit();
// delete rabbit.eats;
// console.log( rabbit.eats ); // ? true



// function Rabbit() {}
// Rabbit.prototype = {
//   eats: true
// };
// let rabbit = new Rabbit();
// delete Rabbit.prototype.eats;
// console.log( rabbit.eats ); // ?  undefined

