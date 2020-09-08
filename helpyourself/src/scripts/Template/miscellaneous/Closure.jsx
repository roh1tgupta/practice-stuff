import React from 'react';

export default function() {
  return (<div>
    <h3>Closure</h3>
    <p>
      A closure is a feature in JavaScript where an inner function
      has access to the outer (enclosing) function’s variables — a scope chain
    </p>
    <aside className="aside">
      Specifically, <b>console.log </b>gives special treatment to DOM elements,
      whereas <b>console.dir</b> does not. This is often useful when trying to
      see the full representation of the DOM JS object
    </aside>
    <pre className="code">
    {
`function outer() {
  var b = 10;
     function inner() {
          
           var a = 20; 
           console.log(a+b);
      }
     return inner;
  }
  var X = outer(); 
  console.dir(X); //use console.dir() instead of console.log()
`
    }
    </pre>
    <p>Below is what console.dir gives in the console</p>
    <img src={require('../../../images/closure_snip.PNG')} class="code_snippetpic"alt="img" />
    <h4>Let's see clousre in action</h4>
    <pre className="code">
    {
`
function outer() {
  var b = 10;
  var c = 100;
     function inner() {
          
           var a = 20; 
           console.log("a= " + a + " b= " + b);
           a++;
           b++;
      }
     return inner;
  }
  var X = outer();  // outer() invoked the first time
  var Y = outer();  // outer() invoked the second time
  //end of outer() function executions
  
  X(); // X() invoked the first time  o/p a=20 b=10
  X(); // X() invoked the second time  o/p a=20 b=11
  X(); // X() invoked the third time  o/p a=20 b=12
  Y(); // Y() invoked the first time  o/p a=20 b=10
`
    }
    </pre>
    <p>
      When the function outer() is invoked the first time. The following steps take place:
      <p>
        Variable b is created, and is set to 10. Variable c is created, and set to 100.
        Let’s call this b(first_time) and c(first_time) for our own reference.
      </p>
      <p>
        The inner function is returned and assigned to X.At this point, the variable b is 
        enclosed within the inner function scope chain as a closure with b=10, 
        since inner uses the variable b.
      </p>
      <p>
        The inner function is returned and assigned to X. At this point, the variable b is 
        enclosed within the inner function scope chain as a closure with b=10, 
        since inner uses the variable b.
      </p>
    </p>
    <p>
      When the function outer() is invoked the second time. The following steps take place:
      <p>
        Variable b is created anew and is set to 10. Variable c is created a new. Note that
        even though outer() was executed once before variables b and c ceased to exist,
        once the function completed execution they are created as brand new variables.
        Let us call these b(second_time) and c(second_time) for our own reference.
      </p>
      <p>
        The inner function is returned and assigned to Y. At this point the variable b is 
        enclosed within the inner function scope chain as a closure with b(second_time)=10,
        since inner uses the variable b.
      </p>
      <p>
        The outer function completes execution, and all its variables cease to exist.
        The variable c(second_time) no longer exists, although the variable b(second_time)
        exists as closure within inner.
      </p>
    </p>
    <p>
      When X() is invoked the first time:
      <br />
        Variable a is created, and set to 20, the value of a=20, the value of b is from
        the closure value. b(first_time), so b=10. Variables a and b are incremented by 1 
        X() completes execution and all its inner variables — variable a — cease to exist.
        However, b(first_time) was preserved as the closure, so b(first_time) continues to exist.
    </p>
    <p>
      When X() is invoked the second time:
      <br />
      Variable a is created a new, and set to 20. Any previous value of variable a no 
      longer exists, since it ceased to exists when X() completed execution the first time.
      The value of a=20 the value of b is taken from the closure value — b(first_time)
      Also note that we had incremented the value of b by 1 from the previous execution, so b=11.
      Variables a and b are incremented by 1 again.
      X() completes execution and all its inner variables — variable a — cease to exist
      However, b(first_time) is preserved as the closure continues to exist.

    </p>
    <p>
      When X() is invoked the third time:
      <br />
      Variable a is created a new, and set to 20. Any previous value of variable a no longer exists,
      since it ceased to exist when X() completed execution the first time.
      The value of a=20, the value of b is from the closure value — b(first_time)
      Also note that we had incremented the value of b by 1 in the previous execution, so b=12
      variables a and b are incremented by 1 again.
      X() completes execution, and all its inner variables — variable a — cease to exist
      However, b(first_time) is preserved as the closure continues to exist
    </p>
    <p>
      When Y() is invoked the first time:
      <br />
      Variable a is created anew, and set to 20.
      The value of a=20, the value of b is from the closure value — b(second_time), so b=10.
      Variables a and b are incremented by 1.
      Y() completes execution, and all its inner variables — variable a — cease to exist
      However, b(second_time) was preserved as the closure, so b(second_time) continues to exist.
    </p>
    <a
      href="https://medium.freecodecamp.org/javascript-closures-simplified-d0d23fa06ba4"
      target='_blank'
      className='link'
      rel='noopener noreferrer'
    >
      Reference is taken from here
    </a>
  </div>);
}