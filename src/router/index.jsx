import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MasterLayout, AuthLayout, NotFound } from "../shared";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  VerifyAccount,
  ChangePassword,
  Dashboard,
  Users,
  Recipes,
  Categories,
  Favorites,
  AddRecipe,
  EditRecipe,
} from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



const Router = () => {
  const {userData}= useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    {
      path: "/dashboard",
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute> ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard />},
        { path: "categories", element: userData?.userGroup==="SuperAdmin"?<Categories />:<NotFound />},
        { path: "users", element: userData?.userGroup==="SuperAdmin"?<Users />:<NotFound />} ,
        { path: "favorites", element: userData?.userGroup==="SystemUser"?<Favorites />:<NotFound />},
        { path: "recipes", element: <Recipes />},
        { path: "add-recipe", element: <AddRecipe />},
        { path: "edit-recipe/:id", element: <EditRecipe />},
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
