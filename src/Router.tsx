import { createBrowserRouter } from "react-router-dom";
import { UserForm } from "./Pages/UserForm/UserForm";
import { Error } from "./Pages/Error/Error";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { MainPage } from "./Pages/MainPage/MainPage";

export const isAuthenticated = () => {
  if (localStorage.getItem("formData")) {
    return true;
  }
  return false;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
    index: true,
  },
  {
    element: <PrivateRoute isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: "/second-page",
        element: <MainPage />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
