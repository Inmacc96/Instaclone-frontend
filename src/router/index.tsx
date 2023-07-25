import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error404 />
    },
    {
      path: "/:username",
      element: <User />,
      errorElement: <Error404 />
    },
  ]);