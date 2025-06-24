// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import TrackOrder from './components/TrackOrder';
import FooterSection from './components/FooterSection';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import AuthModalManager from './components/AuthModalManager';

const App = () => {
  const [authModal, setAuthModal] = useState({
    show: false,
    type: null,
    email: ''
  });

  const openAuthModal = (type) => {
    if (!type) return;
    setAuthModal({ show: true, type, email: '' });
  };

  const closeAuthModal = () => {
    setAuthModal({ show: false, type: null, email: '' });
  };

  const switchAuthModal = (type) => {
    if (!type) return;
    setAuthModal((prev) => ({ ...prev, show: true, type }));
  };

  const handleOTPSent = (email) => {
    setAuthModal((prev) => ({ ...prev, type: 'verifyotp', email }));
  };

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <Header onLoginClick={() => openAuthModal('signin')} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/trackorder" element={<TrackOrder />} />
          </Routes>
        </main>

        <FooterSection className="py-4" />

        <AuthModalManager
          authModal={authModal}
          closeAuthModal={closeAuthModal}
          switchAuthModal={switchAuthModal}
          handleOTPSent={handleOTPSent}
        />

        <ChatBot />
      </div>
    </Router>
  );
};

export default App;