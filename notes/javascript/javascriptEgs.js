// Arrow Functions: Some people think of arrow funcQons as just being syntacQc sugar for a regular funcQon, 
// but arrow funcQons work a bit differently than a regular funcQon. They are a compact alternaQve to a regular
//  funcQon, but also without its own bindings to this, arguments, super,
// or new.target keywords. Arrow funcQons cannot be used as constructors and are not the best opQon for methods.


// // //example#1......................................
var pokemon = {
    firstName: 'Pika',
    lastName: 'chu',
    getPokemonName: function() {
        // console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    },
    getPokemonNameWithAF: () => {  // Arrow Functions Eg
        console.log(this)
        const fullName = this.firstName + ' ' + this.lastName;
        return fullName;
    }
}

// function getPokemonName () {return "hello"};
// var pokemonInfo = function (snacks, hobby) {
//     console.log(this.getPokemonName() + ' ' + 'love ' + snacks + ' and ' + hobby);
// }

// console.log(getPokemonName()) 
// pokemonInfo('milkButter', 'algorithm');
// pokemonInfo.call(pokemon, 'milkButter', 'algorithm'); 
// pokemonInfo.call(pokemon, ['milkButter', 'algorithm']); 
// pokemonInfo.apply(pokemon, ['milkButter', 'algorithm']); 
// console.log(this.pokemon);
// console.log(this.pokemon.getPokemonName());  
// console.log(pokemon.getPokemonName());
// var pk = { firstName: 'rohit', lastName: 'gupta' };
// console.log(this.pokemon.getPokemonName.call(pk));
// console.log(pokemon.getPokemonName.call(pk));
 

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

// // obj = new bike();
// var name = 'pulsar';
// var maker = 'bajaj';
// obj = new bike();
// console.log(obj.maker, "           ", obj.name);


// console.log(pokemon.getPokemonName())
// // this.firstName = "rohit";
// // this.lastName="gupta"
// // console.log(this)
// console.log(pokemon.getPokemonNameWithAF())

// Currying With Bind
// Currying is breaking down a function with multiple arguments into one or more functions that each accept
//  a single argument.
// function multiply(a, b) {
//     // console.log(this)
//     return a * b;
// }
// let multiplyByTwo = multiply.bind(this, 2);
// console.log(multiplyByTwo(4)); // 8

// let multiplyByThree = multiply.bind(pokemon, 3);
// console.log(multiplyByThree(4)); // 8

// let multiplyByTen = multiply.bind(this, 10);
// console.log(multiplyByTen(6)); // 60


// function pokemon1 () {
//     this.firstName = 'Pika';
//     this.lastName = 'chu';
//     this.getPokemonName = function () {
//         // console.log(this)
//         const fullName = this.firstName + ' ' + this.lastName;
//         return fullName;
//     };
    
//     this.getPokemonNameWithAF = () => {  // Arrow Functions Eg
//         console.log(this)
//         const fullName = this.firstName + ' ' + this.lastName;
//         return fullName;
//         // return pokemon.getPokemonNameWithAF()
//     }
//     // console.log(this)
//     // pokemon.getPokemonNameWithAF()
//     // console.log(this.getPokemonNameWithAF())
//     // console.log(this.getPokemonName(), this.firstName);
// }
// console.log(pokemon)
// pokemon1();
// let ab = new pokemon1();
// console.log(ab.getPokemonNameWithAF())
// // console.log(ab.getPokemonName())

// let abcd = { firstName: "rohit", lastName: "rahul"}
// console.log(ab.getPokemonNameWithAF.call(abcd))
// console.log(ab.getPokemonName.call(abcd))