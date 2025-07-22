import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import TrackOrder from "./components/TrackOrder";
import FooterSection from "./components/FooterSection";
import ChatBot from "./components/ChatBot";
import HomePage from "./pages/HomePage";
import AuthModalManager from "./components/AuthModalManager";
import Products from "./components/Products/Products";
import Appointment from "./components/appointment";
import BrandPage from "./BrandPage";
import AccountInfo from "./components/AccountInfo";
import { RecentlyViewedProvider } from "./components/RecentlyViewedCombined";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const [authModal, setAuthModal] = useState({
    show: false,
    type: null, // 'signin', 'signup', 'getotp', 'verifyotp', 'newpassword'
    email: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      console.log("App.jsx: Restoring user from localStorage", parsed);
      setUser(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Auth Modal Handlers
  const openAuthModal = (type) => {
    if (!type) return;
    setAuthModal({ show: true, type, email: "" });
  };

  const closeAuthModal = () => {
    setAuthModal({ show: false, type: null, email: "" });
  };

  const switchAuthModal = (type) => {
    if (!type) return;
    setAuthModal((prev) => ({ ...prev, type }));
  };

  const handleAuthSuccess = (userData) => {
    console.log("✅ App.jsx: handleAuthSuccess called with:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // optional
    setIsAuthenticated(true);
    closeAuthModal();
  };

  console.log("App.jsx: user state in render:", user);
  const handleOTPSent = (email) => {
    setAuthModal((prev) => ({ ...prev, email }));
  };

  // Cart Functions
  const addToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.name === product.name && item.size === product.size
      );
      if (idx !== -1) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const increaseQuantity = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Wishlist Functions
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.name === product.name)) return prev;
      return [...prev, product];
    });
    setShowWishlist(true);
  };

  const removeFromWishlist = (name) => {
    setWishlistItems((prev) => prev.filter((item) => item.name !== name));
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Router>
        <RecentlyViewedProvider>
          <div className="font-sans min-h-screen dark:bg-zinc-950 bg-zinc-100 flex flex-col">
            <Header
              darkMode={darkMode}
              onLoginClick={() => openAuthModal("signin")}
              cartCount={cartItems.length}
              wishlistCount={wishlistItems.length}
              toggleWishlist={() => setShowWishlist((prev) => !prev)}
              isAuthenticated={isAuthenticated}
              user={user}
            />

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`fixed bottom-8 shadow-[0_2px_5px_1px_rgba(0,0,0,0.25)] hover:scale-[1.05] left-5 z-30 ${
                darkMode ? "bg-zinc-700" : "bg-zinc-200"
              } w-[10vh] h-[10vh] rounded-full flex items-center justify-center`}
            >
              {darkMode ? (
                <img src="/dark.svg" className="size-[50%]" alt="Light mode" />
              ) : (
                <img
                  src="/lightblack.svg"
                  className="size-[50%]"
                  alt="Dark mode"
                />
              )}
            </button>

            <main className="flex-grow">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      addToCart={addToCart}
                      addToWishlist={addToWishlist}
                      wishlistItems={wishlistItems}
                      removeFromWishlist={removeFromWishlist}
                      darkMode={darkMode}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Cart
                      cart={cartItems}
                      removeFromCart={removeFromCart}
                      increaseQuantity={increaseQuantity}
                      wishlistItems={wishlistItems}
                      addToCart={addToCart}
                      removeFromWishlist={removeFromWishlist}
                      addToWishlist={addToWishlist}
                    />
                  }
                />
                <Route
                  path="/trackorder"
                  element={<TrackOrder darkMode={darkMode} />}
                />
                <Route
                  path="/user"
                  element={
                    <>
                      {console.log(
                        "App.jsx: Rendering /user route with user:",
                        user
                      )}
                      <AccountInfo user={user} />
                    </>
                  }
                />{" "}
                <Route
                  path="/eyeglasses"
                  element={
                    <Products
                      addToCart={addToCart}
                      wishlistItems={wishlistItems}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      cartItems={cartItems}
                    />
                  }
                />
                <Route
                  path="/appointment"
                  element={<Appointment darkMode={darkMode} />}
                />
                <Route
                  path="/brand/:brandName"
                  element={
                    <BrandPage
                      addToCart={addToCart}
                      wishlistItems={wishlistItems}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      cartItems={cartItems}
                    />
                  }
                />
                <Route 
                  path="/reset-password/:userId/:token" 
                  element={<ResetPassword />} 
                />
              </Routes>
            </main>

            <FooterSection className="py-4" />

            {/* Auth Modal - appears above all other content */}
            <AuthModalManager
              authModal={authModal}
              closeAuthModal={closeAuthModal}
              switchAuthModal={switchAuthModal}
              onAuthSuccess={handleAuthSuccess}
              onOTPSent={handleOTPSent}
              darkMode={darkMode}
            />

            {/* Chat Bot */}
            <ChatBot
              cart={cartItems}
              wishlist={wishlistItems}
              darkMode={darkMode}
            />
          </div>

          {/* Wishlist Sidebar */}
          <Wishlist
            wishlist={wishlistItems}
            removeFromWishlist={removeFromWishlist}
            clearWishlist={clearWishlist}
            toggleWishlist={() => setShowWishlist((prev) => !prev)}
            show={showWishlist}
          />
        </RecentlyViewedProvider>
      </Router>
    </div>
  );
};

export default App;
