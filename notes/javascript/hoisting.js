// Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of 
// their scope before code execution. Inevitably, this 
// means that no matter where functions and variables are declared, they are moved to the top of their
// scope regardless of whether their scope is global or local

// Conceptually, for example, a strict definition of hoisting suggests that variable and function
//  declarations are physically moved to the top of your code, but this is not in fact what happens. 
//  Instead, the variable and function declarations are put into memory during the compile phase, 
//  but stay exactly where you typed them in your code.


// function hoisting1() {
//     // console.log('.....', a1);  // throws error a1 not defined
//     let a1;
//     console.log('.....', a1);
//     a1 = 10;
//     console.log('.....', a1);
// }
// hoisting1();

// function hoisting2() {
//     console.log('.....', a2);
//     var a2;
//     console.log('.....', a2);
//     a2 = 10;
//     console.log('.....', a2);
// }
// hoisting2();

// "use strict"
// function hoisting3() {
//     console.log('..hello...', a3); // throws error a3 not defined
//     var a3 = 10;
//     rohit = 5;
//     // console.log('.....', a3);
//     console.log(rohit)
// }
// hoisting3();
// console.log('.....', a3);
// console.log(rohit)

// function hoisting4() {
//     // console.log('..helo...', a4); // check after removing this line too
//     a4 = 10;
//     console.log('.....', a4);
// }
// hoisting4();
// console.log('....', a4);

// function hoisting41() {
//     "use strict"
//     a5 = 10;  // throws error a5 not defined
//     console.log('.....', a5);
// }
// hoisting41();

// function hoisting6() {
//     abc();
//     function abc() {
//         console.log(' from inside', a6)
//     }
// 	abc();
//     // let a6 = 10; // ReferenceError: Cannot access 'a6' before initialization
//     var a6 = 10;
//     console.log('.....', a6);
//     abc();
// }
// hoisting6();


// // "use strict"    // checkbelow with or without use strict
// console.log(this);
// function setPageName() {
//     // console.log(this);
//     this.page = 'JSSnippet';
//     console.log(this.page);
// }
// setPageName();
// console.log(this.page);



// var a = 20;
// function abc() {
//  // var a ;
//   return a;
// }

// console.log(abc());