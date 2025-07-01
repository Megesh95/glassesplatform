import React, { useEffect, useState } from 'react';

const SignIn = ({ onClose, onSwitch, onForgotPassword, darkMode }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div
        className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg w-96 max-w-full transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
        <div className="w-full h-48 relative">
          <img
            src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
            alt="Welcome"
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 ${darkMode ? 'text-zinc-200 hover:text-white' : 'text-white hover:text-gray-200'} text-xl ${darkMode ? 'bg-zinc-700/80' : 'bg-black/40'} rounded-full w-8 h-8 flex items-center justify-center`}
          >
            &times;
          </button>
        </div>

        {/* Form section */}
        <div className="p-6">
          <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Sign In</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                  darkMode 
                    ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              <button
                type="button"
                onClick={onForgotPassword}
                className={`absolute right-2 top-3 text-xs ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline`}
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className={`py-2 rounded-md transition-all ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-800 text-white'
              }`}
            >
              Sign In
            </button>
            <p className={`text-center text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <span
                onClick={onSwitch}
                className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} cursor-pointer hover:underline`}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;