import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import SingleBook from "../pages/SingleBook";
import PrivateRoutes from "./privateRoutes";
import OrderPage from "../pages/OrderPage";
import AdminRoutes from "./AdminRoutes";
import AdminLogin from "../pages/AdminLogin";
import DashboardLayout from "../pages/dashboard/Dashboard";
import DasboardHome from "../pages/dashboard/DasboardHome";
import ManageDashBoard from "../pages/dashboard/ManageDashboard";
import AddBook from '../pages/dashboard/AddBook'
import UpdateBook from "../pages/dashboard/UpdateBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/orders",
        element: <PrivateRoutes><OrderPage /></PrivateRoutes>
      },
      {
        path: "/about",
        element: <h1>About</h1>
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      ,
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <PrivateRoutes><Checkout /></PrivateRoutes>
      },
      {
        path: "/books/:id",
        element: <SingleBook />
      },
    ]
  },
  {
    path:'/admin',
    element:<AdminLogin />
  },
  {
    path: '/dashboard',
    element: <AdminRoutes><DashboardLayout/></AdminRoutes>,
    children: [
      {
        path: "",
        element:<AdminRoutes><DasboardHome /></AdminRoutes>
      },
      {
        path: "add-new-book",
        element:<AdminRoutes><AddBook/></AdminRoutes>
      },
      {
        path: "edit-book/:id",
        element:<AdminRoutes><UpdateBook/></AdminRoutes>
      },
      {
        path: "manage-books",
        element:<AdminRoutes><ManageDashBoard /></AdminRoutes>
      }
    ]
  }
]);


export default router;