function abc(n, str) {
  let output = '';
  let tracker = 0;

  for(let i = 0;i< str.length; i += 1) {
    if (str[i] !== ' ') {
      // console.log('str[i]: ', str[i], ' .....i: ', i);
      if (tracker === n) {
        tracker = 1;
        output = `${output}\n${str[i]}`;
      } else {
        tracker += 1;
        output = `${output}${str[i]}`
      }
    }
  }
  return output;
}

console.log(abc(2, 'abc de fhg dj'));
console.log();
console.log(abc(3, 'abc de fhg dj'));

console.log(window)