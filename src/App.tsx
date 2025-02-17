import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Profile/Settings';
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
// import Inventory from './pages/Warehouse/Inventory';
import SellerList from './pages/SellerList/SellerList';
import ProductCard from './pages/Warehouse/ProductCard';
import Inventory from './pages/Warehouse/Inventory';
import Cart from './pages/Warehouse/Cart';
import Checkout from './pages/Warehouse/Checkout';
import CheckOrders from './pages/OrdersManagement/CheckOrders';
import OrderRequests from './pages/OrdersManagement/OrderRequests';
import ApprovedOrders from './pages/OrdersManagement/ApprovedOrders';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    // Check if token exists and is valid
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem('authToken'); // Clean up invalid token
      setIsAuthenticated(false);
      if (!pathname.startsWith('/auth/') && pathname !== '/') {
        navigate('/auth/signin');
      }
    } else {
      // Verify token expiration
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= expirationTime) {
          // Token has expired
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          navigate('/auth/signin');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Invalid token format
        console.error('Invalid token format:', error);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/auth/signin');
      }
    }
    setLoading(false);
  }, [pathname, navigate]);


  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position='top-center' />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/auth/signin"
          element={!isAuthenticated ? <SignIn /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/auth/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to="/auth/signin" replace />}
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
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/add-new-product" element={<AddNewProduct onProductAdded={() => {
            navigate('/product-list');
          }} />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/return-or-refund" element={<ReturnAndRefund />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/seller/edit-product/:id" element={<EditProduct />} />
          <Route path="/seller/product-list" element={<ProductList />} />
          <Route path="/seller/product/:id" element={<ProductDetails />} />
          <Route path='/inventory' element={<Inventory/>} />
          <Route path='/inventory/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/sellers-list' element={<SellerList/>} />
          <Route path='/check-orders' element={<CheckOrders/>} />
          <Route path='/order-status' element={<OrderStatus />} />
          <Route path='/order-request' element={<OrderRequests />} />
          <Route path='/approved-orders' element={<ApprovedOrders />} />
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
