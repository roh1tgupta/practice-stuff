
var promise1 = (timeInMilisec) => {
  return new Promise(function(resolve, reject) {
    if (timeInMilisec%2000 === 0) {
      setTimeout(function() {
        // logging the passed argument
        console.log(`inside setTimeout method-- ${timeInMilisec}`);
        resolve(`resolving after ${timeInMilisec/1000} seconds`);
      }, timeInMilisec);
    } else {
      reject(`rejecting ${timeInMilisec}`);
    }
  });
}

Promise.all([
  promise1(6000),promise1(1000),promise1(4000)]).then(val => {
  console.log(`fulfilled--  ${val}`);
}).catch(err => console.log(`rejected--  ${err}`));


// Promise.all([promise1(10000),promise1(2000),promise1(1000)]).then(val => {
//   console.log(val);
// }).catch(err => console.log(err));


// using 2nd argument of then for handling error
// promise1(4000).then(function(value) {
//   console.log(value);
// }, function(err) {
//   console.log(err)
// });

// using .catch for handling error
// promise1(2000).then(function (value) {

//   console.log(value);
// }).catch(function (err) {
//   console.log(err);
// });

//console.log('hello world!');


