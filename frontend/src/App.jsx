import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Register from './auth/Register'
import LoginWithEmail from './auth/LoginWithEmail'
import EditProfile from './components/EditProfile'
import CreateProduct from './admin/CreateProduct'
import ViewProduct from './product/ViewProduct'
import ProductDetail from './product/ProductDetail'
import CartSection from './product/CartSection'
import SearchProduct from './product/SearchProduct'
import Dashboard from './admin/Dashboard'
import Users from './admin/Users'
import ManageProduct from './admin/ManageProduct'
import ViewProducts from './admin/ViewProducts'
import AdminProductDetail from './admin/AdminProductDetail'
import UpdateProduct from './admin/UpdateProduct'
import YourOrders from './components/YourOrders'
import AdminOrders from './admin/AdminOrders'
import AdminLogin from './admin/AdminLogin'

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home /> 
    }, 
    {
      path: "/signup",
      element: <Register />
    }, 
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile/:name/:id",
      element: <EditProfile />
    },
    {
      path: "/create/product",
      element: <CreateProduct/>
    },
    {
      path: "/products/:type",
      element: <ViewProduct />
    },
    {
      path: "/product/details/:id",
      element: <ProductDetail />
    },
    {
      path: "/:name/cart/section",
      element: <CartSection />
    },
    {
      path: "/search",
      element: <SearchProduct />
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />
    },
    {
      path: "/admin/users",
      element: <Users />
    },
    {
      path: "/admin/products",
      element: <ManageProduct />
    },
    {
      path: "/products-admin/:type",
      element: <ViewProducts />
    },
    {
      path: "/product-admin/details/:id",
      element: <AdminProductDetail />
    }, 
    {
      path: "/admin/update-product/:id",
      element: <UpdateProduct />
    },
    {
      path: "/orders/:name/:id",
      element: <YourOrders/>
    },
    {
      path: "/admin/orders",
      element: <AdminOrders />
    },
    {
      path: "/admin-login",
      element: <AdminLogin />
    }
    
    
  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App