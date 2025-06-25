import React, { useEffect, useState } from 'react';

const SignIn = ({ onClose, onSwitch, onForgotPassword }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div
        className={`bg-white rounded-xl shadow-lg w-96 max-w-full transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
        {/* Top image section with rounded top corners */}
        <div className="w-full h-48 relative">
          <img
            src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
            alt="Welcome"
            className="w-full h-full object-cover rounded-t-xl"
          />
          {/* Close button on top of the image */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
          >
            &times;
          </button>
        </div>

        {/* Form section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Sign In</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                required
              />
              <button
                type="button"
                onClick={onForgotPassword}
                className="absolute right-2 top-3 text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <span
                onClick={onSwitch}
                className="text-blue-600 cursor-pointer hover:underline"
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
