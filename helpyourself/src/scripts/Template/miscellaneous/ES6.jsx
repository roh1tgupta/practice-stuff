import React from 'react';

export default function() {
  return (
    <div className="es6">
      <h3>Contents:</h3>
      <ul className="es6-content">
        <li><a href="#defaultParameter" className="link">Default parameters</a></li>
        <li><a href="#templateLiterals" className="link">Template literals</a></li>
        <li><a href="#multiline" className="link">Multiline strings</a></li>
        <li><a href="#destructuring" className="link">Destructuring </a></li>
        <li><a href="#arrowFunction" className="link">Arrow functions</a></li>
        <li><a href="#promises" className="link">Promises</a></li>
        <li><a href="#asyncAndAwait" className="link">Async and Await</a></li>
        <li><a href="#letAndconst" className="link">Block Scoped constructs let and const</a></li>
        <li><a href="#classes" className="link">Classes</a></li>
        <li><a href="#modules" className="link">Modules</a></li>
      </ul>
      <section id="defaultParameter">
        <h3>Default parameters</h3>
          <p>Earlier we used to do like below for handling(default values) if we are not
             getting in parameteres
          </p>
          <pre className="code">
{
`
var link = function (height, color, url) {
  var height = height || 50
  var color = color || 'red'
  var url = url || 'http://azat.co'
  ...
}
`
}
          </pre>
          <p>Now we can put the default values right in the signature of the funciton.</p>
          <pre className="code">
          {
`
var link = function(height = 50, color = 'red', url = 'http:abcd..co') {
		...
}
`
          }</pre>
      </section>
      <section id="templateLiterals">
        <h3>Tempalte Literals</h3>
          <p>earlier we had to break the string like below: </p>
          <pre className="code">
          {
`
var name = 'Your name is ' + first + ' ' + last + '.'
var url = 'http://localhost:3000/api/messages/' + id  
`
          }
          </pre>
          <p>Now in ES6 we can use a new syntax &#36;&#123;NAME&#125; inside of the back-ticked string:</p>
          <pre className="code">
          {
`
var name = \`Your name is $\{first} $\{last}.\`
var url = \`http://localhost:3000/api/messages/$\{id}\`
`
          }
          </pre>
	    </section>
      <section id="multiline">
          <h3>Multiline Strings</h3>
          <p>Earlier we had to use one of these approaches:</p>
          <pre className="code">
          {
`
var roadPoem = 'Then took the other, as just as fair,\\n\\t'
		+ 'And having perhaps the better claim\\n\\t'
		+ 'Because it was grassy and wanted wear,\\n\\t'
		+ 'Though as for that the passing there\\n\\t'
		+ 'Had worn them really about the same,\\n\\t'

	var fourAgreements = 'You have the right to be you.\\n
		You can only be you when you do your best.'
`
          }
          </pre>
          <p>While in ES6, simply utilizing the backticks:</p>
          <pre className="code">
          {
`
var roadPoem = \`Then took the other, as just as fair,
		And having perhaps the better claim
		Because it was grassy and wanted wear,
		Though as for that the passing there
		Had worn them really about the same,\`

var fourAgreements = \`You have the right to be you.
		You can only be you when you do your best.\`
`
          }
          </pre>
      </section>
      <section id="destructuring">
      <h3>Destructuring</h3>
      <pre className="code">
      {
`
var a, b, rest;
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // expected output: 10
console.log(rest); // expected output: [30,40,50]

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

default values:
[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7

swapping variables
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1


var o = {p: 42, q: true};
var {p: foo, q: bar} = o;
console.log(foo); // 42 
console.log(bar); // true
//Here, for example, var {p: foo} = o takes from the
// object o the property named p and assigns it to a
// local variable named foo

`
      }</pre>
      <p>Setting function parameter's default values</p>
      <pre className="code">
      {
`
function drawES2015Chart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}
drawES2015Chart({
  coords: {x: 18, y: 30},
  radius: 30
});
`
      }
      </pre>
      <p>
        In the function signature for drawES2015Chart above, 
        the destructured left-hand side is assigned to an empty 
        object literal on the right-hand side: 
        &#123;size = 'big', coords = &#123;x: 0, y: 0&#125;, radius = 25&#125; = &#123;&#125;.
        You could have also written the function without the right-hand 
        side assignment. However, if you leave out the right-hand side assignment,
        the function will look for at least one argument to be supplied when
        invoked, whereas in its current form, you can simply call 
        drawES2015Chart() without supplying any parameters.
        The current design is useful if you want to be able to call
        the function without supplying any parameters, the other 
        can be useful when you want to ensure an object is passed to the function.
      </p>

      <pre className="code">
      {
`
//Computed object property names and destructuring
let key = 'z';
let {[key]: foo} = {z: 'bar'};
console.log(foo); // "bar"

//Combined Array and Object Destructuring
const props = [
	{ id: 1, name: 'Fizz'},
	{ id: 2, name: 'Buzz'},
	{ id: 3, name: 'FizzBuzz'}
];
const [,, { name }] = props;
console.log(name); // "FizzBuzz";
	
//Nested object and array destructuring
const metadata = {
	title: 'Scratchpad',
	translations: [
		{
			locale: 'de',
			localization_tags: [],
			last_edit: '2014-04-14T08:43:37',
			url: '/de/docs/Tools/Scratchpad',
			title: 'JavaScript-Umgebung'
		}
	],
	url: '/en-US/docs/Tools/Scratchpad'
};

let {
	title: englishTitle, // rename
	translations: [
		{
			title: localeTitle, // rename
		},
	],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
	
//For of iteration and destructuring
var people = [
	{
		name: 'Mike Smith',
		family: {
			mother: 'Jane Smith',
			father: 'Harry Smith',
			sister: 'Samantha Smith'
		},
		age: 35
	},
	{
		name: 'Tom Jones',
		family: {
			mother: 'Norah Jones',
			father: 'Richard Jones',
			brother: 'Howard Jones'
		},
		age: 25
	}
];
for (var {name: n, family: {father: f}} of people) {
	console.log('Name: ' + n + ', Father: ' + f);
}
// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
`
      }
      </pre>
      </section>
      <section id="arrowFunction">
      <p>An arrow function expression is a syntactically 
        compact alternative to a regular function expression, 
        although without its own bindings to the this,
         arguments, super, or new.target keywords. 
         Arrow function expressions are ill suited as methods, 
         and they cannot be used as constructors.
      </p>
      {
`
var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]

`
      }</section>
      <section id="promises">
      <h3>Promises</h3>
      <pre className="code">
      {
`
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});
promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});
console.log(promise1);
// expected output: [object Promise]

`
      }
      </pre>
      <p>properties: </p>
      <dl>
        <dt>Promise.length:</dt>
        <dd>Length property whose value is always 1 (number of constructor arguments).</dd>
        <dt>Promise.prototype:</dt>
        <dd>Represents the prototype for the Promise constructor.</dd>
        <dt>Methods:</dt>
        <dd>
            <li>Promise.all(iterable)</li>
            <li>Promise.race(iterable)</li>
            <li>Promise.reject()</li>
            <li>Promise.resolve()</li>
        </dd>
      </dl>
      </section>
      <section id="asyncAndAwait">
        <h3>Async and Await</h3>
          <p>The async function declaration defines an asynchronous function,
            which returns an AsyncFunction object. An asynchronous function is
            a function which operates asynchronously via the event loop, using
            an implicit Promise to return its result.
          </p>
          <pre className="code">
          {
`
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output after 2 seconds: 'resolved'
}

asyncCall();
`
          }
          </pre>
          <p>For more detail please&nbsp;
            <a 
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
              target="_blank"
              rel="noopener noreferrer"
              className="link">click here</a></p>
      </section>
      <section id="letAndconst">
        <h3>let</h3>
        <p>The let statement declares a block scope local variable, optionally initializing it to a value.</p>
        <pre className="code">
          {
`
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
  // expected output: 2
}

console.log(x);
// expected output: 1
`
          }
        </pre>
        <p>
        <mark>let</mark> allows you to declare variables that are limited in scope to the block,
        statement, or expression on which it is used. This is unlike the <mark>var</mark> keyword, 
        which defines a variable globally, or locally to an entire function regardless of block scope.
        </p>
        <p>Go through&nbsp;
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Emulating_private_members"
            className="link"
            target="_blank"
            rel="noopener noreferrer">Emulating Private members
          </a>
          ,&nbsp;
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone"
            className="link"
            target="_blank"
            rel="noopener noreferrer">
              temporal dead zone
          </a>&nbsp;and&nbsp;
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Another_example_of_temporal_dead_zone_combined_with_lexical_scoping"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            temporal dead zone combined with lexical scoping
          </a>
          
        </p>
        <h3>const</h3>
        <p>Constants are block-scoped, much like variables defined using the let statement.
          The value of a constant cannot change through reassignment, and it can't be redeclared.
        </p>
        <pre className="code">
        {
`
const number = 42;

try {
  number = 99;
} catch(err) {
  console.log(err);
  // expected output: TypeError: invalid assignment to const \`number'
  // Note - error messages will vary depending on browser
}

console.log(number);
// expected output: 42
`
        }
        </pre>
        <p>
          This declaration creates a constant whose scope can be either global
           or local to the block in which it is declared. Global constants do not
            become properties of the window object, unlike var variables. 
            An initializer for a constant is required; that is, you must 
            specify its value in the same statement in which it's declared.

        </p>
        <p>
        The const declaration creates a read-only reference to a value.
         It does not mean the value it holds is immutable, just that the 
         variable identifier cannot be reassigned. For instance, in the case 
         where the content is an object, this means the object's contents 
         (e.g., its properties) can be altered.
        </p>
        <p>All the considerations about the "temporal dead zone" apply to both let and const.
            A constant cannot share its name with a function or a variable in the same scope.
        </p>
      </section>
      <section id="classes">
        <h3>Classes</h3>
        <p>JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical
           sugar over JavaScript's existing prototype-based inheritance.
        </p>
        <p>
          Classes are in fact "special functions", and just as you can define function expressions 
          and function declarations, the class syntax has two components: class expressions and 
          class declarations.
          <br />
          An important difference between function declarations and class declarations is that
           function declarations are hoisted and class declarations are not. You first need 
           to declare your class and then access it, otherwise code like the following will
            throw a ReferenceError.
        </p>
        <p>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here to go to MDN web docs for class
          </a>
        </p>
      </section>
      <section id="modules">
        <h3>Modules</h3>
          <blockquote>
            Modules are small units of independent, reusable code that is 
            desired to be used as the building blocks in creating a non-trivial 
            Javascript application. Modules let the developer define private and 
            public members separately, making it one of the more desired design 
            patterns in JavaScript paradigm -- <cite>GeeksForGeeks</cite>
          </blockquote>
        <a
          href="https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc"
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here for detailed explanation
        </a>
      </section>

    </div>
  )
}