import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import Auth from "./pages/Auth";

const App = () => {
  const [auth, setAuth] = useState(undefined);

  return (
    <ApolloProvider client={client}>
      {auth ? <h1>Authenticated</h1> : <Auth />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </ApolloProvider>
  );
};

export default App;
