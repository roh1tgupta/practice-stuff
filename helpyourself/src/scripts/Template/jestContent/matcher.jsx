import React from 'react';

export default function () {
  return (
    <div>
      <h2>Matcher</h2>
      <p>Matcher is a method that let us test values.
        So far we used <mark>toBe()</mark> as the only matcher.<br />
        <mark>toBe()</mark> uses Object.is to test exact equality.
        If need to check the value of an object, toEqual should be used: 
      </p>
      <pre className="code">
      {
`
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
`
      }
      </pre>
      <p>
      toEqual recursively checks every field of an object or array.<br/>
      We can also test opposite of any matcher by using .not like below:
      </p>
      <pre className="code">
      {
`
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
`
      }
      </pre>
      <h4>Truthiness</h4>
        <p>
          In tests sometimes we need to distinguish between undefined, null, and false,
          but sometimes we do not want to treat these differently. Jest contains helpers 
          that let you be explicit about what you want.
        </p>
          <ul>
            <li><mark>toBeNull</mark> matches only <mark>null</mark></li>
            <li><mark>toBeUndefined</mark> matches only <mark>undefined</mark></li>
            <li><mark>toBeDefined</mark> is the opposite of <mark>toBeUndefined</mark></li>
            <li><mark>toBeTruthy</mark> matches anything that an <mark>if</mark> statement treats as true</li>
            <li><mark>toBeFalsy</mark> matches anything that an <mark>if</mark> statement treats as false</li>
          </ul>   
        
        <pre className="code">
        {
`
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
`        
}
        </pre>
        <h4>Numbers</h4>
        <p> For comparing numbers there are good number of matcher equivalents: </p>
        <pre className="code">
        {
`
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
`
        }
        </pre>
        <p>
          For floating point equality, use <mark>toBeCloseTo()</mark> instead of toEqual,
          because we don't want a test to depend on a tiny rounding error.
        </p>
        <pre className="code">
        {
`
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
`
        }
        </pre>
        <h4>Strings</h4>
        <p>
        We can check strings against regular expressions with <mark>toMatch()</mark>:
        </p>
        <pre className="code">
        {
`
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
`
        }
        </pre>

        <h4>Array</h4>
        <p>
        We can check if an array contains a particular item using <mark>toContain()</mark>:
        </p>
        <pre className="code">
        {
`
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});
`
        }
        </pre>
        <h4>Exceptions</h4>
        <p>
        If we need to test that a particular function throws an error when it's called, 
        we can use <mark>toThrow()</mark> </p>
        <pre className="code">
        {
`
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // we can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
`
        }
        </pre>
        <p>
        For a complete list of matchers, check out 
        the <a href="https://jestjs.io/docs/en/expect" target="_blank" rel="noopener noreferrer">reference docs</a>
        </p>
    </div>
  );
}