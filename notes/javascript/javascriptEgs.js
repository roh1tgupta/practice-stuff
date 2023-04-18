// Arrow Functions: Some people think of arrow funcQons as just being syntacQc sugar for a regular funcQon, but arrow funcQons work a bit differently than a regular funcQon. They are a compact alternaQve to a regular funcQon, but also without its own bindings to this, arguments, super,
// or new.target keywords. Arrow funcQons cannot be used as constructors and are not the best opQon for methods.


//example#1......................................
var pokemon = {
    firstName: 'Pika',
    lastName: 'chu',
    getPokemonName: function() {
        console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    },
    getPokemonNameWithAF: () => {  // Arrow Functions Eg
        console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    }
}

function getPokemonName () {return "hello"};
var pokemonInfo = function (snacks, hobby) {
    console.log(this.getPokemonName() + ' ' + 'love ' + snacks + ' ' + hobby);
}
// console.log(getPokemonName()) // hello
// pokemonInfo('milkButter', 'algorithm'); // this.getPokemonName is not a function
// pokemonInfo.call(pokemon, 'milkButter', 'algorithm'); // Pika chu love milkButter algorithm
// pokemonInfo.call(pokemon, ['milkButter', 'algorithm']); // Pika chu love milkButter,algorithm undefined
// pokemonInfo.apply(pokemon, ['milkButter', 'algorithm']); // Pika chu love milkButter algorithm
// console.log(this.pokemon);
// // console.log(this.pokemon.getPokemonName());  // can't read property of undefined
// console.log(pokemon.getPokemonName());
// var pk = { firstName: 'rohit', lastName: 'gupta' };
// console.log(this.pokemon.getPokemonName.call(pk));
// console.log(pokemon.getPokemonName.call(pk));
 

// example#2...........................................
// function greeter(name, age) {
//     var message = 'we welcomes '+name + ' ---- ' + age + '--';
//     return function greet() {
//         console.log(message);
//     }
// }
// var greetAkhil = greeter('Akhil', 26);
// greetAkhil();


// example#3...........................................
// function bike() {
//     var name = 'ninja';
//     this.maker = 'kawasaki';
//     console.log(this.name + ' -- '+ maker);
//     console.log(name + ' -- '+ this.maker);
// }

// var name = 'pulsar';
// var maker = 'bajaj';
// obj = new bike();
// console.log(obj.maker, "           ", obj.name);


// console.log(pokemon.getPokemonName())
// console.log(pokemon.getPokemonNameWithAF())

// Currying With Bind
// Currying is breaking down a function with multiple arguments into one or more functions that each accept a single argument.
function multiply(a, b) {
    return a * b;
}
let multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4)); // 8
let multiplyByTen = multiply.bind(this, 10);
console.log(multiplyByTen(6)); // 60