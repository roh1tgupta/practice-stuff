# GraphQL Learning Project

This project is a comprehensive GraphQL learning resource that includes both a React frontend and an Express/Node.js backend. It's designed to demonstrate GraphQL concepts from basics to advanced, serving as a reference for future GraphQL development.

## Project Structure

```
graphql-learning/
├── client/              # React frontend with Apollo Client
│   ├── public/          # Static assets
│   └── src/             # React source code
│       ├── components/  # Reusable React components
│       ├── pages/       # Page components
│       └── graphql/     # GraphQL queries and mutations
└── server/              # Express backend with Apollo Server
    ├── data/            # JSON files for data storage
    ├── index.js         # Server entry point
    ├── schema.js        # GraphQL schema definition
    └── resolvers.js     # GraphQL resolvers
```

## Features

- **Basic GraphQL Operations**: Queries, mutations, and subscriptions
- **Relationships**: Connected data types (Books, Authors, Reviews)
- **Advanced Queries**: Filtering, pagination, sorting, and search
- **Real-time Updates**: GraphQL subscriptions with WebSockets
- **Error Handling**: Proper error management in GraphQL
- **Interactive UI**: React-based interface to try different GraphQL operations

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Server Setup

```bash
cd server
npm install
npm start
```

The GraphQL server will be running at http://localhost:4000/graphql.

### Client Setup

```bash
cd client
npm install
npm start
```

The React app will be running at http://localhost:3000.

## GraphQL Features Demonstrated

1. **Queries**
   - Basic queries with field selection
   - Queries with arguments
   - Nested queries and relationships
   - Aliases and fragments

2. **Mutations**
   - Creating data
   - Updating data
   - Deleting data
   - Input types

3. **Subscriptions**
   - Real-time updates with WebSockets
   - Subscription filters

4. **Advanced Features**
   - Custom scalars
   - Enums
   - Interfaces and unions
   - Directives

5. **Best Practices**
   - Schema design
   - Resolver patterns
   - Error handling
   - Performance considerations

## Pages

- **Home**: Overview and introduction to the project
- **Books**: List and manage books
- **Authors**: List and manage authors with statistics
- **Query Playground**: Interactive interface to try different queries
- **Advanced Examples**: Examples of filtering, pagination, and search
- **Subscriptions**: Real-time updates demonstration

## Data Structure

The application uses JSON files as a simple database:

- **books.json**: Book information with author relationships
- **authors.json**: Author information
- **reviews.json**: Book reviews with user and book relationships
- **users.json**: User information

## Technology Stack

### Frontend
- React
- Apollo Client
- Material UI
- React Router

### Backend
- Node.js
- Express
- Apollo Server
- GraphQL Subscriptions

## License

MIT
