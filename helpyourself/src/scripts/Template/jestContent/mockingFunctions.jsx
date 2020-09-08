import React from 'react';

export default function () {
  return (
    <div>
      <h2>Mock Functions</h2>
      <p>Mock functions replace the actual implementation of the function.</p>
      <h4>Using a mock function</h4>
      <p>Suppose we need to test the implementation of a function checkMe, which invokes a 
      callback for each item in a supplied array.</p>
      <pre className="code">
      {
`
function checkMe(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
`
      }
      </pre>
      <p>To test this function, we can use a mock function, and inspect the 
        mock's state to ensure the callback is invoked as expected.</p>
      <pre className="code">
      {
`
const mockCallback = jest.fn(x => x === 0);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(true);

`
      }
      </pre>

      <h4>.mock property </h4>
      <p>
      All mock functions have this special .mock property, which is where data about how the function
      has been called and what the function returned is kept. The .mock property also tracks the
      value of this for each call. mock members are very useful in tests to assert how 
      these functions get called, instantiated, or what they returned:

      </p>
      <pre className="code">
      {
`
const myMock = jest.fn();
      const a = new myMock();
      const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]

// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a 'name' property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');


`
      }
      </pre>
      
      <h4>Mock Return Values</h4>
      <p>Mock functions can also be used to inject test values into your code during a test.
        Mock functions are also very effective in code that uses a functional 
        continuation-passing style. 
      </p>
      <pre className="code">
      {
`
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true



const filterTestFn = jest.fn();

// Make the mock return 'true' for the first call,
// and 'false' for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(filterTestFn);

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]

`
      }
      </pre>
      <h4>Mocking Modules</h4>
      <p>
        Suppose we have a class that fetches users from our API. The class uses axios to call the 
        API then returns the data attribute which contains all the users:
      </p>
      <pre className="code">
      {
`
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;

`
      }
      </pre>
      <p> Here we can use the jest.mock(...) function 
          to automatically mock the axios module.
          Once we mock the module we can provide a mockResolvedValue 
          for .get that returns the data we want our test to assert against.
      </p> 
      <pre className="code">
      {
`
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or even below one could be used depending on use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(resp => expect(resp.data).toEqual(users));
});

`
      }
      </pre>
      <h4>Mock Implementations</h4>
      <pre className="code">
      {
`
// foo.js
module.exports = function() {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
`
      }
      </pre>
      <p> 
      When you need to recreate a complex behavior of a mock function such that 
      multiple function calls produce different results, use the mockImplementationOnce method:
      </p>
      <pre className="code">
      {
`
const myMockFn = jest
  .fn(cb => cb(null, 'default'))
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false

myMockFn((err, val) => console.log(val));
// > default

`
      }
      </pre>
      <p>
      When the mocked function runs out of implementations defined with mockImplementationOnce, 
      it will execute the default implementation set with jest.fn (if it is defined)
      </p>

    </div>
  );
}