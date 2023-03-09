import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const uri = import.meta.env.VITE_BACKEND_URI;

if (!uri) {
  throw new Error("BACKEND_URI is not defined in the environment variables");
}

const httpLink = createHttpLink({ uri });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
