import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'fs/promises'
import { resolvers } from './resolvers.js';

const PORT = 2619;
const app = express();
/**
 * Whats a middleware?
 * A middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
 * The next middleware function is commonly denoted by a variable named next.
 * Middleware functions can perform the following tasks:
 * 1. Execute any code.
 * 2. Make changes to the request and the response objects.
 * 3. End the request-response cycle.
 * 4. Call the next middleware function in the stack.
 * If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. 
 * Otherwise, the request will be left hanging.
 */

/**
 * In a typical Express application, we have handlers like a Login handler.
 * A express app typically sends requests to a handler.
 * But we can have a middleware that runs before the handler.
 * Middlware -> a logic which sits in the middle of a request and a handler.
 * Example, the JSON middleware automatically transforms the incoming request body into a JS object.
 * We can do this transformation in a common middleware instead of doing it in every handler.
 * Another example is to have middleware that checks if a request includes a authorization token.
 * If not, the middleware responds with an error.
 * If yes, it allows the request to proceed to the handler.
 */

/**
 * Our express app is already using these 3 middlewares.
 * 1. cors() - Allows the server to accept requests from different origins. 
    Without this, if the frontend is hosted on a different domain or port, the browser would block requests to our server due to CORS policy.
 * 2. express.json() - Parses the request body and makes it a JS object accessible via req.body.
 * 3. authMiddleware - Handles authentication; checks for a valid token in the request headers and verifies it.
    If the token is valid, it allows the request to proceed; otherwise, it responds with an error.

The order of middleware matters. They are executed in the order they are added.
These middlewares ensure that the server can handle cross-origin requests, parse JSON data, and authenticate users before they access protected routes or resources.
**/
app.use(cors(), express.json(), authMiddleware);
/**
 * Were using the apolloMiddleware middleware function to handle requests to the /graphql endpoint.
 * This apolloMiddleware function expects the apolloServer instance as an argument.
 * This is how we integrate Apollo Server in an Express app!
 */

const typeDefs = await readFile('./schema.graphql', 'utf-8');
// This apolloServer is an instance of the ApolloServer import at #1
const apolloServer = new ApolloServer({ typeDefs, resolvers })
// await as apolloServer 
await apolloServer.start();

// Use the APOLLOMIDDLEWARE to handle /graphql endpoint
app.use('/graphql', apolloMiddleware(apolloServer));
// Use the handleLogin FUNCTION to handle /login endpoint
app.post('/login', handleLogin);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
