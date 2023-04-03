// var { graphql, buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

// // Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{ hello }',
//   rootValue
// }).then((response) => {
//   console.log(response);
// });

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');
// Construct a schema, using GraphQL schema language
const spaceArr = [{id: 1,name:"hotel",rent:10, status: "available"}];
const personData = [{
  id: 1,
  name: "rohit",
  email: ["rohitgupta887@gmail.com", "abcd.d@gs.com"]
},
{
  id: 1,
  name: "rahjul",
  email: ["rohitgu11pta887@gmail.com", "abc11d.d@gs.com"]
}
]
var schema = buildSchema(`
  type Person {
    name: String,
    email: [String]
  }

  type Space {
    name: String,
    rent: Float,
    status: Status
  }
  type Developer {
    profile: Person,
    experience: Int
  }

  enum Status {
    available
    not_available
  }

  type Query {
    hello: String
    olleh: String
    rollDice(numDice: Int, numSides: Int): [Int]
    isDeveloper: Boolean
    rohit: Developer
    name: String
    age: Int
    users: [Person]
    user(id: Int): Person 
    getSpace(id: Int!): Space
    space: [Space]
  }

  input SpaceInput {
    name: String,
    rent: Float,
    status: Status!
  }
  type Mutation {
    addUser(name: String, email: String): Person
    addSpace(input: SpaceInput): Space
    udpateSpace(id: Int!, input: SpaceInput): Space
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  isDeveloper: () => false,
  space: () => spaceArr,
  updateSpace: ({id, input}) => {
    return spaceArr[id-1] = {name: input.name, rent: input.rent, status: input.status}
  },
  getSpace: ({id}) => spaceArr[id-1],
  addUser: ({name, email}) => {
    let len = personData.length
    personData.push({id: len, name, email: [email]});
    return personData[len];
  },
  addSpace: ({input}) => {
    let len = spaceArr.length
    return spaceArr[len] = {name: input.name, rent: input.rent, id: len, status: input.status}
  },
  user: ({id}) => personData[id],
  users: () => ([...personData]),
  rohit: () => ({profile: {name: "rohit", email: "sfa.g@ga.com"}, experience: 21}),
  age: () => 29,
  name: () => "rohit",
  hello: () => {
    return 'Hello world! from graphql';
  },
  olleh: () => 'from graphql, Hello world!!',
  rollDice: (props) => { 
    console.log(props)  
    return [props.numDice, props.numSides]; }

};
var app = express();
app.use(cors());



app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));


app.use('/', function (req, res) {
    res.send('Hello World');
    }
);
app.listen(6001);
console.log('Running a GraphQL API server at http://localhost:6001 and at http://localhost:6001/graphql for graphql');