import React from 'react';

export default function() {
  return (
    <div className="newjs">
      <h3>Contents:</h3>
      <ul className="es6-content">
        <li><a href="#privateClassVariable" className="link">Private Class Variable</a></li>
        <li><a href="#arrayFlat" className="link">Array Flat</a></li>
        <li><a href="#entriesAndFromEntries" className="link">entries and fromEntries</a></li>
        
      </ul>
      <section id="privateClassVariable">
        <h3>Private Class Variable</h3>
        <pre className="code">
{
`
class A {
  #number = 0;
  incNum() {
   this.#number += 1;
  }
  getnum() {
   return this.#number;
  }
 }
 let a = new A();
 console.log(a.#number);
 // Uncaught SyntaxError: Undefined private
 // field undefined: must be declared in an enclosing class
 console.log(a.getnum());
 // 0
 a.incNum();
 console.log(a.getnum());
 // 1
`
}
          </pre>
      </section>
      <section id="arrayFlat">
        <h3>Array.flat() method</h3>
        <p>
          The flat() method creates a new array with 
          all sub-array elements concatenated into it recursively up to the specified depth.
        </p>
        <p>
          var newArray = arr.flat([depth]); <br/>
          Here depth is optional. The depth level specifying how deep a 
          nested array structure should be flattened. Defaults to 1.
        </p>
        <pre className="code">
        {
`
var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]

var arr1 = [1, [2, [3, 4]], [5, 6]];
arr1.flat(Infinity);
// [1, 2, 3, 4, 5, 6]

`
        }
        </pre>
      </section>
      <section id="entriesAndFromEntries">
        <h3> entries and fromEntries method</h3>
        <pre className="code">
{
`
const object = { x: 40, y:50 };
const entries = Object.entries(object);
// [['x', 40],['y', 50]]
const result = Object.fromEntries(entries);
// { x: 40, y:50 }

`}
        </pre>
      </section>
    </div>
  );
};
