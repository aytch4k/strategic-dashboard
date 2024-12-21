import { GraphQLClient } from 'graphql-request';

const API_URL = 'https://api.linear.app/graphql';

export const linearClient = new GraphQLClient(API_URL, {
  headers: {
    authorization: import.meta.env.VITE_LINEAR_API_KEY
  }
});