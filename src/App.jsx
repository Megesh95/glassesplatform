import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import SliderAnimation from './components/SliderAnimation.jsx';
import SignIn from './components/Signin.jsx';
import SignUp from './components/Signup.jsx';
import Header from './components/Header.jsx';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-100">
        <Header setShowSignUp = {setShowSignUp}/>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SliderAnimation />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        {/* Modals */}
        {showSignIn && (
          <SignIn
            onClose={() => setShowSignIn(false)}
            onSwitch={handleSwitchToSignUp}
          />
        )}
        {showSignUp && (
          <SignUp
            onClose={() => setShowSignUp(false)}
            onSwitch={handleSwitchToSignIn}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
