// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './auth/LandingPage';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import SellerDashboard from './seller/Dashboard';
import UploadProduct from './seller/UploadProduct';
import Marketplace from './customer/Marketplace';
import PaymentPage from './customer/PaymentPage';
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import { CartProvider } from './customer/CartContext';
import SellerProfile from './seller/SellerProfile';
import SkillHub from './seller/SkillHub';
// Inside your <Routes>
<Route path="/seller/:sellerId" element={<SellerProfile />} />

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
           <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Seller */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/upload" element={<UploadProduct />} />
          <Route path="/seller/:sellerId" element={<SellerProfile />} />
          <Route path="/skillhub" element={<SkillHub />} />
          {/* Customer */}
          <Route path="/customer/marketplace" element={<Marketplace />} />
          <Route path="/customer/payment" element={<PaymentPage />} />
          
          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
