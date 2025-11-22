import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The first thing to do when creating a GraphQL API is to define the APIs' schema.
// We use a Schema Definition Language (SDL) to define the schema

// This schema represents what the users can request from the API
const typeDefs = `#graphql
  # This is a simple schema that defines a single query called "greeting"
  # This refers to query type which is used when calling this API from the GraphQL client
  type Query {
    greeting: String
  }
`;

// Now that we have defined the schema, we have to provide an implementation for the schema
// i.e, write some code that will actually return the greeting
// We do this by defining a resolver function

// Resolvers contain code to return data for the fields in the schema
const resolvers = {  
  Query: {
    greeting: () => 'Hello GraphQL!',
  },
};

// Apollo server is used to expose the GraphQL API to the outside world using HTTP
// This ApolloServer accepts a few configuration objects.
const server = new ApolloServer({ typeDefs, resolvers });

// The startStandaloneServer imports the ApolloServer and starts it on a specified port
// The startStandaloneServer function returns a promise that resolves to an object -> meaning its asynchronous
const { url } = await startStandaloneServer(server, { listen: { port: 2619 } });
console.log(`🚀 Server ready at ${url}`);