const { sum, sub, helloWorld } = require('./testonme');

// test('Adding 1 + 1 equals 2', () => {
//   expect(sum(1, 1)).toBe(2)
// })
// test('Subtracting 1 - 1 equals 0', () => {
//   expect(sub(1, 1)).toBe(0);
// })
// test('helloworld function should return "helloWorld"', () => {
//   expect(helloWorld()).toBe("Hello World!");
// })

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});