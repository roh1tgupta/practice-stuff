import React from 'react';

export default function() {
  return (
    <div>
      <h2>Setup and tear down</h2>
      <p>
        Sometimes it is required to execute something before and afte the test runs.
        Jest provides helper function for handling sunch scenarios.
      </p>
      <h4>Repeating Setup For Many Tests:</h4>
      <p>
      if some work needs to be done repeatedly before and after each test cases,
      jest provides beforeEach and afterEach for handling such cases.
      For example, lets say that our test cases interact with database of a 
      registered. we have a method initializeCompDatabase() that must be called
       before each of these tests, and a method clearCompDatabase() that must be 
       called after each of these tests.
        </p>
        <pre className="code">
        {
`
beforeEach(() => {
  initializeCompDatabase();
});

afterEach(() => {
  clearCompDatabase();
});

test('comp database has ABC.co', () => {
  expect(isRegistered('ABC.co')).toBeTruthy();
});

test('comp database has Axteria.pvt.ltd', () => {
  expect(isRegistered('Axteria.pvt.ltd')).toBeTruthy();
});

`
        }
        </pre>
        <p>
         beforeEach and afterEach can handle asynchronous code in the 
         same ways that tests can handle asynchronous code - they can 
         either take a done parameter or return a promise. 
        For example, if initializeCityDatabase() returned a promise that 
        resolved when the database was initialized, we would want to return that promise
          </p>
          <pre className="code">
          {
`
beforeEach(() => {
  return initializeCityDatabase();
});
`
          }
          </pre>
          <h4>One-Time Setup</h4>
          <p>
          In some cases, you only need to do setup once, at the beginning of a 
          file and clearing all after all test cases are done. when this is asynchronous,
          it can be bothersome and we can't do this inline. Jest provides beforeAll and 
          afterAll to handle this situation. <br />
          For example, if both initializeCompDatabase and clearCompDatabase returned promises,
            and the company database could be reused between tests, we could change our test code to:
          </p>
          <pre className="code">
          {
`
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

`
          }
          </pre>
          <h4>Scoping</h4>
          <p>
          By default, the before and after blocks apply to every test in a file.
          You can also group tests together using a describe block. When they are inside a describe block,
          the before and after blocks only apply to the tests within that describe block.
          Note that the top-level beforeEach is executed before the beforeEach inside the describe block. 
          Below may help to illustrate the order of execution of all hooks.
          </p>
          <pre className="code">
          {
`
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

`
          }
          </pre>
          <h4>Order of execution of describe and test blocks</h4>
          <p>
          Jest executes all describe handlers in a test file before it executes
          any of the actual tests. This is another reason to do setup and teardown in before* and
          after* handlers rather in the describe blocks. Once the describe blocks are complete,
          by default Jest runs all the tests serially in the order they were encountered 
          in the collection phase, waiting for each to finish and be tidied up before moving on.
          Consider the following illustrative test file and output:
          </p>
          <pre className="code">
          {
`
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2

`
          }
          </pre>
          <h4>Important point</h4>
          <p>
          If a test is failing, one of the first things to check should be whether the test is
          failing when it's the only test that runs. In Jest it's simple to run only one test
          - just temporarily change that test command to a test.only.
          </p>
          <pre className="code">
          {
`
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});

`
          }
          </pre>
          <p>
          If we have a test that often fails when it's run as part of a larger suite, 
          but doesn't fail when run alone, there's a good chance that something from a different 
          test is interfering with this one.
          This can be fixed by clearing some shared state with beforeEach. 
          If it's not confirmed whether some shared state is being modified,
          we can try a beforeEach that just logs data.
          </p>

    </div>
  );
}