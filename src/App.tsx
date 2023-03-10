import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Auth from "./pages/Auth";

const App = () => {
  const [auth, setAuth] = useState(undefined);

  return (
    <ApolloProvider client={client}>
      {auth ? <h1>Authenticated</h1> : <Auth />}
    </ApolloProvider>
  );
};

export default App;
