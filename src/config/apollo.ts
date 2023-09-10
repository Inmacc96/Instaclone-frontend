import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/token";

const uri = import.meta.env.VITE_BACKEND_URI;

if (!uri) {
  throw new Error("BACKEND_URI is not defined in the environment variables");
}

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: { ...headers, Authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
