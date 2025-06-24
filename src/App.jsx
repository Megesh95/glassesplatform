import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import SliderAnimation from './components/SliderAnimation.jsx';
import SignIn from './components/Signin.jsx';
import SignUp from './components/Signup.jsx';
import Header from './components/Header.jsx';
import TrackOrder from './components/TrackOrder';
import FooterSection from './components/FooterSection';
import ChatBot from './components/ChatBot';

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
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        {/* Header with SignUp popup trigger */}
        <Header setShowSignUp={setShowSignUp} />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<SliderAnimation />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
        </Routes>
        
        {/* Footer */}
        <FooterSection />

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

      {/* ChatBot */}
      <div>
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
