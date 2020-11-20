//example#1......................................
// var pokemon = {
//     firstName: 'Pika',
//     lastName: 'chu',
//     getPokemonName: function() {
//         const fullName = this.firstName + ' ' + this.lastName;
//         return fullName;
//     }
// }

// var pokemonInfo = function (snacks, hobby) {
//     console.log(this.getPokemonName() + ' ' + 'love ' + snacks + ' ' + hobby);
// }

// pokemonInfo('milkButter', 'algorithm'); // this.getPokemon is not a function
// pokemonInfo.call(pokemon, 'milkButter', 'algorithm'); // Pika chu love milkButter algorithm
// pokemonInfo.call(pokemon, ['milkButter', 'algorithm']); // Pika chu love milkButter,algorithm undefined
// pokemonInfo.apply(pokemon, ['milkButter', 'algorithm']); // Pika chu love milkButter algorithm
// console.log(this.pokemon);
// console.log(this.pokemon.getPokemonName());  // can't read property of undefined
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


