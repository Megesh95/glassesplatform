import React, { useState } from 'react';

const GetOTP = ({ onBack, onOTPSent }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      onOTPSent(email);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 max-w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-gray-600 mb-2">
            Enter your email to receive a verification code
          </p>
          
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 transition-all disabled:opacity-70"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
        
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default GetOTP;