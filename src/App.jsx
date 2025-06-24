import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import SliderAnimation from './components/SliderAnimation';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import TrackOrder from './components/TrackOrder';
import FooterSection from './components/FooterSection';
import ChatBot from './components/ChatBot';
import Products from './components/Products/Products';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  const [cart, setCart] = useState([]);

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <Header setShowSignUp={setShowSignUp} />

        <main className="flex-grow">
          <Routes>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/trackorder" element={<TrackOrder />} />
          </Routes>
        </main>

        <SliderAnimation />

        <div className="flex items-center justify-center py-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <h1 className="px-4 text-3xl font-bold text-gray-800 tracking-wide">New Models</h1>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="py-16 px-4 flex items align-middle">
          <Products addToCart={addToCart} />
        </div>

        <div className="flex items-center justify-center py-5 my-10">
          <div className="flex-grow h-px bg-gray-300"></div>
          <h1 className="px-4 text-3xl font-bold text-gray-800 tracking-wide">Premium Eyewear</h1>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="w-full flex justify-center py-6">
          <img src="https://static1.lenskart.com/media/desktop/img/16-sep-24/r1.jpeg" alt="Premium Eyewear" className="max-w-[1200px] w-full h-auto shadow" />
        </div>

        <FooterSection className="py-4" />

        {showSignIn && <SignIn onClose={() => setShowSignIn(false)} onSwitch={handleSwitchToSignUp} />}
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} onSwitch={handleSwitchToSignIn} />}
      </div>

      <ChatBot />
    </Router>
  );
};

export default App;