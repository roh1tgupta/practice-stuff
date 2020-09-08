import React from 'react';

export default function() {
  return (<div>
    <h3>Reduce</h3>
    <blockquote>The reduce() method executes a reducer function (that you provide) on each element of the array,
      resulting in a single output value. --<cite>MDN web docs</cite></blockquote>
      <pre className="code">
      {
`
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
`
      }
      </pre>
      <h3>More examples</h3>
      <p>Converting array to objects</p>
      <pre className="code">
      {
`const peopleArr  = [
  {
      username:    'glestrade',
      displayname: 'Inspector Lestrade',
      email:       'glestrade@met.police.uk',
      authHash:    'bdbf9920f42242defd9a7f76451f4f1d',
      lastSeen:    '2019-05-13T11:07:22+00:00',
  },
  {
      username:    'mholmes',
      displayname: 'Mycroft Holmes',
      email:       'mholmes@gov.uk',
      authHash:    'b4d04ad5c4c6483cfea030ff4e7c70bc',
      lastSeen:    '2019-05-10T11:21:36+00:00',
  },
  {
      username:    'iadler',
      displayname: 'Irene Adler',
      email:       null,
      authHash:    '319d55944f13760af0a07bf24bd1de28',
      lastSeen:    '2019-05-17T11:12:12+00:00',
  },
];
function keyByUsernameReducer(acc, person) {
  return {...acc, [person.username]: person};
}
const peopleObj = peopleArr.reduce(keyByUsernameReducer, {});
console.log(peopleObj);
  // output
  // {
  //     "glestrade": {
  //         "username":    "glestrade",
  //         "displayname": "Inspector Lestrade",
  //         "email":       "glestrade@met.police.uk",
  //         "authHash":    "bdbf9920f42242defd9a7f76451f4f1d",
  //          "lastSeen":    "2019-05-13T11:07:22+00:00"
  //     },
  //     "mholmes": {
  //         "username":    "mholmes",
  //         "displayname": "Mycroft Holmes",
  //         "email":       "mholmes@gov.uk",
  //         "authHash":    "b4d04ad5c4c6483cfea030ff4e7c70bc",
  //          "lastSeen":    "2019-05-10T11:21:36+00:00"
  //     },
  //     "iadler":{
  //         "username":    "iadler",
  //         "displayname": "Irene Adler",
  //         "email":       null,
  //         "authHash":    "319d55944f13760af0a07bf24bd1de28",
  //          "lastSeen":    "2019-05-17T11:12:12+00:00"
  //     }
  // }
`
      }
      </pre>
      <p>Unfolding smaller array to larger one. Context for below: reading data from a text file,
        imagine we’ve read a bunch of plain text lines into an array</p>
      <pre className="code">
      {
`const fileLines = [
  'Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton',
  'Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown',
  'Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester',
  'Inspector Gregory,Inspector Tobias Gregson,Inspector Hill',
  'Inspector Stanley Hopkins,Inspector Athelney Jones'
];

function splitLineReducer(acc, line) {
  return acc.concat(line.split(/,/g));
}
const investigators = fileLines.reduce(splitLineReducer, []);
console.log(investigators);
// ⦘ [
//   "Inspector Algar",
//   "Inspector Bardle",
//   "Mr. Barker",
//   "Inspector Barton",
//   "Inspector Baynes",
//   "Inspector Bradstreet",
//   "Inspector Sam Brown",
//   "Monsieur Dubugue",
//   "Birdy Edwards",
//   "Inspector Forbes",
//   "Inspector Forrester",
//   "Inspector Gregory",
//   "Inspector Tobias Gregson",
//   "Inspector Hill",
//   "Inspector Stanley Hopkins",
//   "Inspector Athelney Jones"
// ]
`
      }
      </pre>
      <p>Array method flatMap() is not available in IE or edge. Creating flatMap using .reduce taking above example</p>
      <pre className="code">
      {
`function flatMap(f, arr) {
  const reducer = (acc, item) => acc.concat(f(item));
  return arr.reduce(reducer, []);
}

const investigators = flatMap(x => x.split(','), fileLines);
console.log(investigators);
`
      }
      </pre>
      <p>Combine mapping and filtering into one pass</p>
      <pre className="code">
      {
`function notEmptyEmail(x) {
  return (x.email !== null) && (x.email !== undefined);
}

function getLastSeen(x) {
   return x.lastSeen;
}

function greater(a, b) {
   return (a > b) ? a : b;
}

const peopleWithEmail = peopleArr.filter(notEmptyEmail);
const lastSeenDates   = peopleWithEmail.map(getLastSeen);
const mostRecent      = lastSeenDates.reduce(greater, '');

console.log(mostRecent);
// ⦘ 2019-05-13T11:07:22+00:00

// using reduce
function notEmptyEmail(x) {
  return (x.email !== null) && (x.email !== undefined);
}

function greater(a, b) {
   return (a > b) ? a : b;
}
function notEmptyMostRecent(currentRecent, person) {
   return (notEmptyEmail(person))
       ? greater(currentRecent, person.lastSeen)
       : currentRecent;
}

const mostRecent = peopleArr.reduce(notEmptyMostRecent, '');

console.log(mostRecent);
// ⦘ 2019-05-13T11:07:22+00:00
`
      }</pre>
      <p>Asynchronous functions in sequence using reduce:</p>
      <pre className="code">
      {
`function fetchMessages(username) {
  return fetch(\`https://example.com/api/messages/\${username}\`)
      .then(response => response.json());
}

function getUsername(person) {
  return person.username;
}

async function chainedFetchMessages(p, username) {
  // In this function, p is a promise. We wait for it to finish,
  // then run fetchMessages().
  const obj  = await p;
  const data = await fetchMessages(username);
  return { ...obj, [username]: data};
}

const msgObj = peopleArr
  .map(getUsername)
  .reduce(chainedFetchMessages, Promise.resolve({}))
  .then(console.log);
// ⦘ {glestrade: [ … ], mholmes: [ … ], iadler: [ … ]}
`
      }
      </pre>
      <p>For the above example to work, we have to pass in a Promise as the initial value 
        using Promise.resolve(). It will resolve immediately (that’s what Promise.resolve() does). 
        Then our first API call will run straight away</p>
      <p>For more details <a
        href="https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/"
        className="link"
        target="_blank"
        rel="noopener noreferrer">click here</a></p>
  </div>)
}