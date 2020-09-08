import React from 'react';

export default function SetupAndGettingStarted() {
  return (
    <div>
      <h2>Installation</h2>
      <p>
        With React, Jest is automatically installed in <b>create-react-app</b>, 
        so if we use that, we don’t need to install Jest.
      </p>
      <p>
        For other projects it can be installed using npm or yarn, here we will go with npm:
      </p>
      <pre className="code">
        {
"npm install --save-dev jest"
        }
      </pre>
      
      <h2>Getting Started</h2>
      <p>
        Let's define some function in testonme.js file that we are going to test. 
      </p>
      <pre className="code">
      {
`const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const helloWorld = () => "Hello World!";

module.exports.sum = sum;
module.exports.sub = sub;
module.exports.helloWorld = helloWorld;
`      }
      </pre>
      <p>
        Now create the testonme.test.js file in the same folder to test the function
        defined in testonme.js file.
      </p>
      <pre className="code">
      {
`
const { sum, sub, helloWorld } = require('./testonme');

test('Adding 1 + 1 equals 2', () => {
  expect(sum(1, 1)).toBe(2)
})
test('Subtracting 1 - 1 equals 0', () => {
  expect(sub(1, 1)).toBe(0);
})
test('helloworld function should return "helloWorld"', () => {
  expect(helloWorld()).toBe("Hello World!");
})
`
      }
      </pre>
      <p>
      In this code expect(sum(1, 1)), expect(sub(1, 1)) and expect(helloWorld())
      returns an "expectation" object. We typically don't do much with these expectation objects
      except call matchers on them. <br />
      In this code, .toBe(2), .toBe(0) and .toBe("Hello World!") 
      are the matcher. When Jest runs, it tracks all the failing matchers so that
      it can print out nice error messages. </p>
      <p>Now add the following section to package.json:</p>
      <pre className="code">
      {
        `{
  "scripts": {
    "test": "jest"
    }
}
        `
      }
      </pre>
      <p>
        Now finally run 'npm test' and jest will print below message
      </p>
      <pre className="code">
      {
`
PASS  src/testonme.test.js
√ Adding 1 + 1 equals 2 (4ms)
√ Subtracting 1 - 1 equals 0 (1ms)
√ helloworld function should return "helloWorld"

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.26s
`
      }
      </pre>
      <p>
      We just successfully wrote our first test using Jest
      </p>
    </div>
  );
}