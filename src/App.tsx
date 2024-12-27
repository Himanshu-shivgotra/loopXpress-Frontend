import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './common/protectedRoutes';
import AddNewProduct from './pages/Product/AddNewProduct';
import ProductList from "./pages/Product/ProductList"
import LandingPage from './pages/LandingPage/LandingPage';
import ViewOrders from './pages/OrdersManagement/ViewOrders';
import OrderStatus from './pages/OrdersManagement/OrderStatus';
import ReturnAndRefund from './pages/OrdersManagement/ReturnAndRefund';
import ProductDetails from './pages/Product/ProductDetails';
import EditProduct from './pages/Product/EditProduct';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Payouts from './pages/Payouts/Payouts';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const token = localStorage.getItem('authToken');
  useEffect(() => {
    setIsAuthenticated(!!token); // Set authentication status based on the token
    setLoading(false); // Stop loading after checking
  }, [token]);

  if (loading) {
    return <Loader />; // Show a loader while authentication status is being checked
  }

  return (
    <>
    <Toaster position='top-center'/>
    <Routes>
      {/* Public Routes */}
      <Route
        path="/auth/signin"
        element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/auth/signup"
        element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/auth/forgot-password"
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" replace />}
      />
       <Route
        path="/auth/reset-password/:token"
        element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/"
        element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />}
      />
      
      {/* Redirect root to dashboard or signin based on authentication */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth/signin"} replace />}
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<ECommerce />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payouts" element={<Payouts/>} />
        <Route path="/add-new-product" element={<AddNewProduct onProductAdded={() => {
          // Optionally navigate to product list after adding
          navigate('/product-list');
        }} />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/view-orders" element={<ViewOrders />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/return-or-refund" element={<ReturnAndRefund />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/seller/edit-product/:id" element={<EditProduct />} />
        <Route path="/seller/product-list" element={<ProductList />} />
        <Route path="/seller/product/:id" element={<ProductDetails />} />
      </Route>

     
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth/signin"} replace />}
      />
  
    </Routes>
  </>
  );
}

export default App;
