// Arrow Functions: Some people think of arrow funcQons as just being syntacQc sugar for a regular funcQon, 
// but arrow funcQons work a bit differently than a regular funcQon. They are a compact alternaQve to a regular
//  funcQon, but also without its own bindings to this, arguments, super,
// or new.target keywords. Arrow funcQons cannot be used as constructors and are not the best opQon for methods.



// // //example#1......................................
var pokemon = {
    firstName: 'Pika',
    lastName: 'chu',
    getPokemonName: function() {
        // Regular function - this refers to pokemon object when called normally
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    },
    getPokemonNameWithAF: () => {  // Arrow Functions Eg
        // this refers to the enclosing lexical scope (module context)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    }
}

// Arrow Function Behavior
// Arrow functions do not have their own this. Instead, they inherit this
//  from the enclosing lexical context (the surrounding scope where the arrow 
// function is defined).
// this is not dynamically bound in arrow functions. It's captured from the 
// surrounding context at the time of function definition, not at execution time.

// Key Insight: Objects Don't Create Scopes
// The crucial thing to understand is that objects don't create their own 
// lexical scopes in JavaScript. Only functions, blocks, modules and global code 
// create lexical scopes.

// The arrow function is physically located inside the object literal, 
// but its lexical scope is the module scope where the object itself is defined.





// Every file is wrapped in a module function by Node.js
// Within this module wrapper, this is not the global object but a special empty object called the "module context"
// This is part of Node.js's module system that helps maintain isolation between modules

// console.log(this) 
// console.log(module.exports === this)
// console.log(global). // // The actual global object with all its properties

// Browser: In a browser, top-level this would be the full window object with all its properties
// Node.js REPL: In Node.js interactive console, this is the actual global object
// Node.js Module: In a file, this is the module.exports object (empty by default)


// When a regular function is called without an explicit context (no .call(), .apply(), .bind(), or method syntax), this defaults to:
// In non-strict mode: the global object (global in Node.js)
// In strict mode: undefined



function getPokemonName () {return "hello"};
var pokemonInfo = function (snacks, hobby) {
    // console.log(this) // this is global object in non-strict mode, else it will be undefined
    // console.log(this.getPokemonName) // this is undefined in strict mode, else it will be global object
    console.log(this.getPokemonName() + ' ' + 'love ' + snacks + ' and ' + hobby);
}

// console.log(getPokemonName())  // hello
// pokemonInfo('milkButter', 'algorithm'); // error: this.getPokemonName is not a function
// pokemonInfo.call(pokemon, 'milkButter', 'algorithm');  // Pika chu love milkButter and algorithm
// pokemonInfo.call(pokemon, ['milkButter', 'algorithm']);  // Pika chu love milkButter,algorithm and undefined
// pokemonInfo.apply(pokemon, ['milkButter', 'algorithm']);  // Pika chu love milkButter and algorithm
// console.log(this.pokemon); // undefined
// console.log(this.pokemon.getPokemonName());   // TypeError: Cannot read properties of undefined (reading 'getPokemonName')
// console.log(pokemon.getPokemonName()); // Pika chu
// var pk = { firstName: 'rohit', lastName: 'gupta' };
// // console.log(this.pokemon.getPokemonName.call(pk));// TypeError: Cannot read properties of undefined (reading 'getPokemonName')
// console.log(pokemon.getPokemonName.call(pk));// rohit gupta
 

// // example#2...........................................
// function greeter(name, age) {
//     var message = 'we welcomes '+name + ' ---- ' + age + '--';
//     return function greet() {
//         console.log(message);
//     }
// }
// var greetAkhil = greeter('Akhil', 26);
// greetAkhil();


// // example#3...........................................
// function bike() {
//     var name = 'ninja';
//     this.maker = 'kawasaki';
//     console.log(this.name + ' -- '+ maker);
//     console.log(name + ' -- '+ this.maker);
// }

// obj = new bike(); // undefined -- undefined // ninja -- kawasaki
// var name = 'pulsar';
// var maker = 'bajaj';
// obj = new bike(); // undefined -- bajaj // ninja -- kawasaki
// console.log(obj.maker, "           ", obj.name); // kawasaki     undefined


// console.log(pokemon.getPokemonName()) // Pika chu
// this.firstName = "rohit";
// this.lastName="gupta"
// // console.log(this)
// console.log(pokemon.getPokemonNameWithAF()) // 

// Currying With Bind
// Currying is breaking down a function with multiple arguments into one or more functions that each accept
//  a single argument.
function multiply(a, b) {
    console.log(this)
    return a * b;
}
// let multiplyByTwo = multiply.bind(this, 2);
// console.log(multiplyByTwo(4)); // 8

// let multiplyByThree = multiply.bind(pokemon, 3);
// // let multiplyByThree = multiply.bind(null, 3);
// // let multiplyByThree = multiply.bind(undefined, 3);
// // let multiplyByThree = multiply.bind(true, 3);
// // let multiplyByThree = multiply.bind('', 3);
// console.log(multiplyByThree(4)); // 12

// let multiplyByTen = multiply.bind(this, 10);
// console.log(multiplyByTen(6)); // 60


function pokemon1 () {
    this.firstName = 'Pikas';
    this.lastName = 'chu';
    this.getPokemonName = function () {
        // console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    };
    
    this.getPokemonNameWithAF = () => {  // Arrow Functions Eg
        // console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
        // return pokemon.getPokemonNameWithAF()
    }
    // console.log(this)
    console.log(pokemon.getPokemonNameWithAF());
    console.log(this.getPokemonNameWithAF())
    // console.log(this.getPokemonName(), this.firstName);
}
// console.log(pokemon) // object
// pokemon1();
// let ab = new pokemon1();
// console.log(ab.getPokemonNameWithAF())
// console.log(ab.getPokemonName())

// let abcd = { firstName: "rohit", lastName: "rahul"}
// // console.log(ab.getPokemonNameWithAF.call(abcd))
// console.log(ab.getPokemonName.call(abcd))
// console.log(pokemon.getPokemonNameWithAF.call(abcd))