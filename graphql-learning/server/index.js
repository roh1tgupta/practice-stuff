import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Import schema and resolvers
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { verifyToken } from './utils/auth.js';
import fs from 'fs/promises';

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Express app and HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Set up WebSocket server with the schema
const serverCleanup = useServer({ schema }, wsServer);

// Create Apollo Server
const server = new ApolloServer({
  schema,
//   Apollo Server's Plugin Hook Resolution Process
// During server shutdown, Apollo Server follows this sequence:
// First, it checks if a plugin has a direct serverWillStop() method
// If not, it looks for a drainServer() method in the object that was returned by the plugin's serverWillStart()
// This behavior is intentional and documented in Apollo Server's plugin architecture to support both:
// The newer, more direct API (explicit serverWillStop)
// The legacy API (returning drainServer from serverWillStart)
  plugins: [
    // Proper shutdown for the HTTP server
    ApolloServerPluginDrainHttpServer({ httpServer }),
    
    // Proper shutdown for the WebSocket server
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Start the server
await server.start();

// Helper function to read JSON data from files
async function readData(filename) {
  try {
    const data = await fs.readFile(`./data/${filename}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error);
    return [];
  }
}

// Apply middleware
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Get the user token from the headers
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      let user = null;
      if (token) {
        try {
          const decoded = verifyToken(token);
          const users = await readData('users');
          user = users.find(u => u.id === decoded.userId);
          if (user) {
            // Remove password from user object
            const { password, ...userWithoutPassword } = user;
            user = userWithoutPassword;
          }
        } catch (error) {
          // Token is invalid, but we don't throw an error here
          // We just don't set the user in context
          console.log('Invalid token:', error.message);
        }
      }
      
      return { user };
    },
  }),
);

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('GraphQL API is running at /graphql');
});

// Start the HTTP server
const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
