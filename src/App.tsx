import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import AuthContext from "./context/AuthContext";
import AuthProvider from "./context/AuthProvider";
import { router } from './router';
import Auth from "./pages/Auth";


const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AuthContext.Consumer>
          {({auth}) => (
            <>
              {auth ? <RouterProvider router={router} /> : <Auth />}
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
