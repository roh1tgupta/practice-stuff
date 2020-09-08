import React from 'react';

export default function() {
  return (
    <div>
      <h2>Testing Asynchronous Code</h2>
      <h4>Callbacks</h4>
      <p>
        Callbacks is the most common asynchronous pattern.<br/>
        Suppose we have a fetchData(callback) function that fetches some data and
        calls callback(data) when it is complete. We want to test that this returned data 
        is just the string 'Hello World!'.
      </p>
      <p>
      By default, Jest tests complete once they reach the end of their execution. So we can't test
      async code like we were doing so far becuase it ends before ever calling callback.<br />
      There is alternate form of test, where a single argument done is passed and jest waits until
      the done callback is called before finishing test.
      </p>
      <pre className="code">
      {
`
// this wont work as test will be 
// completed before calling callback!
test('the data is Hello World!', () => {
  function callback(data) {
    expect(data).toBe('Hello World!');
  }

  fetchData(callback);
});

// below one works as test will be
// completed after done is called
test('the data is Hello World!', done => {
  function callback(data) {
    expect(data).toBe('Hello World!');
    done();
  }

  fetchData(callback);
});
`
      }
      </pre>
      <p>
      Here if done() is never called, the test will fail.
      </p>

      <h4>Promises</h4>
      <p>
      Suppose fetchData, instead of using a callback, 
      returns a promise that is supposed to resolve to the string 'Hello World!'.
      We could test it with:
      </p>
      <pre className="code">
      {
`
test('the data is Hello World!', () => {
  return fetchData().then(data => {
    expect(data).toBe('Hello World!');
  });
});
`
      }
      </pre>
      <p>
        Here if we omit the return statement, test will complete before the promise
        returned from fetchData resolved and then gets executed. Also here if promise
        is rejected, test will automatically fails.
      </p>
      <p>
      In case if it is expected a promise to be rejected use the .catch method. 
      Make sure to add expect.assertions to verify that a certain number of assertions
       are called. Otherwise a fulfilled promise would not fail the test.
      </p>
      <pre className="code">
      {
`
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
`
      }
      </pre>
      <h5>.resolves/.rejects</h5>
      <p>
      We can also use the .resolves matcher in your expect statement, 
      and Jest will wait for that promise to resolve. If the promise is rejected, 
      the test will automatically fail.
      </p>
      <pre className="code">
      {
`
test('the data is Hello World!', () => {
  return expect(fetchData()).resolves.toBe('Hello World!');
});

// if promise is expected to be rejected
// use .reject matcher

test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});

`
      }
      </pre>
      <h4>Async/Await</h4>
      <p>
      We can also use async and await in our tests. To write an async test,
       just use the async keyword in front of the function passed to test. 
       For example, the same fetchData scenario can be tested with:
      </p>
      <pre className="code">
      {
`
test('the data is Hello World!', async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('Hello World!');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
`
      }
      </pre>
      <p>
      We can also combine async and await with .resolves or .rejects.
      </p>
      <pre className="code">
        {
`
test('the data is Hello World!', async () => {
  await expect(fetchData()).resolves.toBe('Hello World!');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
`
        }
      </pre>
      <p>
      In these cases, async and await are effectively just 
      syntactic sugar for the same logic as the promises example uses.<br/>
      We can mix and match them across a codebase or even in a single file.
      It just depends on which style makes your tests simpler
      </p>
    </div>
  );
}