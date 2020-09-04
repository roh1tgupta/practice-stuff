// function hoisting1() {
//     console.log('.....', a1);  // throws error a1 not defined
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
//     // console.log('.....', a3); // throws error a3 not defined
//     a3 = 10;
//     console.log('.....', a3);
// }
// hoisting3();
// console.log('.....', a3);

// function hoisting4() {
//     a4 = 10;
//     console.log('.....', a4);
// }
// hoisting4();

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
//     var a6 = 10
//     console.log('.....', a6);
//     abc();
// }
// hoisting6();

// "use strict"    // checkbelow with or without use strict
// console.log(this);
// function setPageName() {
//     // console.log(this);
//     this.page = 'JSSnippet';
//     console.log(this.page);
// }
// setPageName();
// console.log(this.page);