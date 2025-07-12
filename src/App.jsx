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
import Products from "./components/Products/Products";
import BrandPage from "./BrandPage";
import ScreenGlassesPage from "./pages/ScreenGlassesPage";
import KidsGlassesPage from "./pages/KidsGlassesPage";
import ContactLensesPage from "./pages/ContactLensesPage";
import SunglassesPage from "./pages/SunglassesPage";
import HomeEyeTestPage from "./pages/HomeEyeTestPage";

const App = () => {
  const [authModal, setAuthModal] = useState({
    show: false,
    type: null,
    email: "",
  })

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
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

  

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    closeAuthModal()
  }

  // Add to cart function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.name === product.name && item.size === product.size);
      if (idx !== -1) {
        // If already in cart, increase quantity
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Increase quantity function
  const increaseQuantity = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
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
    <div className = {`${darkMode ? "dark": ""}`}>
      <Router>
        <div className="font-sans min-h-screen dark:bg-zinc-950 bg-zinc-100 flex flex-col">
          <Header 
            darkMode = {darkMode}
            onLoginClick={() => openAuthModal('signin')}
            cartCount={cartItems.length}
            wishlistCount={wishlistItems.length}
            toggleWishlist={() => setShowWishlist((prev) => !prev)}
          />
          <button onClick={() => {setDarkMode(!darkMode)}} className = {`fixed bottom-8 shadow-[0_2px_5px_1px_rgba(0,0,0,0.25)] hover:scale-[1.05] left-5 z-30 ${darkMode ? "bg-zinc-700": "bg-zinc-200"} w-[10vh] h-[10vh] rounded-full flex items-center justify-center`}>
            {darkMode ? 
              <img src = "/dark.svg" className = "size-[50%]"/>
              :
              <img src = "/lightblack.svg" className = "size-[50%]"/>
            }
          </button>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} darkMode={darkMode} />} />
              <Route path="/cart" element={<Cart cart={cartItems} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} wishlistItems={wishlistItems} addToCart={addToCart} removeFromWishlist={removeFromWishlist} addToWishlist={addToWishlist}/>} />
              <Route path="/trackorder" element={<TrackOrder />} />
              <Route path="/eyeglasses" element={<Products addToCart={addToCart} wishlistItems={wishlistItems} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} cartItems={cartItems} />} />
              <Route path="/screenglasses" element={<ScreenGlassesPage addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} cartItems={cartItems} />} />
              <Route path="/kidsglasses" element={<KidsGlassesPage addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} cartItems={cartItems} />} />
              <Route path="/contactlenses" element={<ContactLensesPage addToCart={addToCart} wishlistItems={wishlistItems} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} cartItems={cartItems} />} />
              <Route path="/sunglasses" element={<SunglassesPage addToCart={addToCart} addToWishlist={addToWishlist} wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} cartItems={cartItems} />} />
              <Route path="/brand/:brandName" element={<BrandPage addToCart={addToCart} wishlistItems={wishlistItems} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} cartItems={cartItems} /> }/>
              <Route path="/home-eye-test" element={<HomeEyeTestPage />} />
            </Routes>
          </main>
          <FooterSection className="py-4" />
          <AuthModalManager
            authModal={authModal}
            closeAuthModal={closeAuthModal}
            switchAuthModal={switchAuthModal}
            onAuthSuccess={handleAuthSuccess}
            darkMode={darkMode} 
          />
          <ChatBot cart={cartItems} wishlist={wishlistItems} darkMode={darkMode} />
        </div>
        <Wishlist
          wishlist={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          clearWishlist={clearWishlist}
          toggleWishlist={() => setShowWishlist((prev) => !prev)}
          show={showWishlist}
        />
      </Router>
    </div>
  );
};

export default App;