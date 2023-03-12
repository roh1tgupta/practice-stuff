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
var schema = buildSchema(`
  type Query {
    hello: String
    olleh: String
    rollDice(numDice: Int, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
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