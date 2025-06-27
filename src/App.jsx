import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Wishlist from "./components/Wishlist"
import Cart from "./components/Cart"
import TrackOrder from "./components/TrackOrder"
import FooterSection from "./components/FooterSection"
import ChatBot from "./components/ChatBot"
import HomePage from "./pages/HomePage"
import AuthModalManager from "./components/AuthModalManager"

const App = () => {
  const [authModal, setAuthModal] = useState({
    show: false,
    type: null,
    email: "",
  })

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const openAuthModal = (type) => {
    if (!type) return
    setAuthModal({ show: true, type, email: "" })
  }

  const closeAuthModal = () => {
    setAuthModal({ show: false, type: null, email: "" })
  }

  const switchAuthModal = (type) => {
    if (!type) return
    setAuthModal((prev) => ({ ...prev, show: true, type }))
  }

  const handleOTPSent = (email) => {
    setAuthModal((prev) => ({ ...prev, type: "verifyotp", email }))
  }

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    closeAuthModal()
  }

  // Add to cart function
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Remove from cart function
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add to wishlist function
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.name === product.name)) return prev;
      return [...prev, product];
    });
    setShowWishlist(true);
  };

  // Remove from wishlist function
  const removeFromWishlist = (name) => {
    setWishlistItems((prev) => prev.filter((item) => item.name !== name));
  };

  // Clear wishlist
  const clearWishlist = () => setWishlistItems([]);

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <Header 
          onLoginClick={() => openAuthModal('signin')}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          toggleWishlist={() => setShowWishlist((prev) => !prev)}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} />} />
            <Route path="/cart" element={<Cart cart={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="/trackorder" element={<TrackOrder />} />
          </Routes>
        </main>
        <FooterSection className="py-4" />
        <AuthModalManager
          authModal={authModal}
          closeAuthModal={closeAuthModal}
          switchAuthModal={switchAuthModal}
          handleOTPSent={handleOTPSent}
          onAuthSuccess={handleAuthSuccess}
        />
        <ChatBot cart={cartItems} wishlist={wishlistItems} />
      </div>
      <Wishlist
        wishlist={wishlistItems}
        removeFromWishlist={removeFromWishlist}
        clearWishlist={clearWishlist}
        toggleWishlist={() => setShowWishlist((prev) => !prev)}
        show={showWishlist}
      />
    </Router>
    
  );
};

export default App;