import { ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import AuthContext from "./context/AuthContext";
import AuthProvider from "./context/AuthProvider";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import User from "./pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />
  },
  {
    path: "/user",
    element: <User />,
    errorElement: <Error404 />
  },
]);

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
