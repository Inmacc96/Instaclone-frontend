import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import AuthContext from "./context/AuthContext";
import AuthProvider from "./context/AuthProvider";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AuthContext.Consumer>
          {({auth}) => (
            <>
              {auth ? <Home /> : <Auth />}
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
            </>
          )}
        </AuthContext.Consumer>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
