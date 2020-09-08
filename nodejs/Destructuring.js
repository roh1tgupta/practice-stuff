let testArray = ['ab', 'bc', 'cd', 'ef', 'gh', 'ij'];
let firstItem, secondItem, restItem;
// without destructring
firstItem = testArray[0];
secondItem = testArray[1];
restItem = testArray.slice(2,testArray.length);
console.log(firstItem); // output: ab
console.log(secondItem); // output: bc
console.log(restItem); // output: [ 'cd', 'ef', 'gh', 'ij' ]

firstItem = null; secondItem = null; restItem = null;
console.log(firstItem, secondItem, restItem); // output: nul null null

// with destructuring
[firstItem, secondItem, ...restItem] = testArray;
console.log(firstItem); // output: ab
console.log(secondItem); // output: bc
console.log(restItem); // output: [ 'cd', 'ef', 'gh', 'ij' ]


const [firstNm] = ['rohit', 'gupta'];
console.log(firstNm) // output: rohit

// when we are only interested in first and third item of array
const [fstItem, , thrdItem] = [1 ,2 ,3];
console.log(fstItem); // output: 1
console.log(thrdItem); // output: 3

// using default value in case the item we seeking from array is not defined
let [name, address, city = 'pune'] = ['rohit', 'Koregaon Park'];
console.log(name); // output: rohit
console.log(address); // output: Koregaon Park
console.log(city); // output: pune

// extracting from strings
const [firstAlphabet, secondAlphabet] = 'rohit';
console.log(firstAlphabet); // output: r
console.log(secondAlphabet); // o

// swapping variables
let a = 1, b = 2;
console.log(a); // output: 1
console.log(b); // output: 2
[a, b] = [b, a];
console.log(a); // output: 2
console.log(b); // output: 1

const userInfo = {
  firstName: 'Rohit',
  lastName: 'Gupta',
  address: 'Koregaon Park',
  city: 'Pune',
}

const { firstName } = userInfo;
console.log(firstName); // output: Rohit


const { address: localty } = userInfo;
console.log(localty); // output: Koregaon Park

({ city } = userInfo);
console.log(city); // output: Pune

//order doesn't matter(name is first on left side while at last on right side)
let {nam, age, occupation} = {age: 25, occupation: 'developer', nam: 'rohit'};
console.log(nam); // output: rohit
console.log(occupation); // output: developer
console.log(age); // age: 25

let {firstkey, ...rest} = {firstkey: 'first', age: 25, occupation: 'developer', name: 'rohit'};
console.log(firstkey); // output: first
console.log(rest); // output: { age: 25, occupation: 'developer', name: 'rohit' }

// using default value and other variable
let {cty = 'pune', address: locality = 'pune'} = {name: 'Rohit', address: 'Koregaon Park'};
console.log(cty); // output: pune
console.log(locality); // output: Koregaon Park

// using destructuring for nested object
let employeeInfo = {
  name: 'Rohit',
  address: {
    locality: 'Koregaon Park',
    pincode: 411001,
    city: 'Pune'
  }
};
let {address: {pincode}} = employeeInfo;
console.log(pincode); // output: 411001

// throws error when function called without argument
// function printInfo({name = 'rohit', city = 'pune'}) {
//   console.log(`${name} lives in ${city}`);
// }
// printInfo(); // output: error: Cannot destructure property `name` of 'undefined' or 'null'

//this will run as expected
function printInfo2({name = 'rohit', city = 'pune'} = {}) {
  console.log(`${name} lives in ${city}`);
}
printInfo2(); // output: rohit lives in pune
