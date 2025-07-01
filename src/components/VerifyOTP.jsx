import React, { useState } from 'react';

const VerifyOTP = ({ email, onBack, onSuccess, darkMode }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg p-8 w-96 max-w-full relative`}>
        <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Verify OTP</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className={`text-sm mb-2 ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            We sent a 6-digit code to <span className={`font-medium ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>{email}</span>
          </p>
          
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 text-center tracking-widest ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 rounded-md transition-all disabled:opacity-70 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-800 text-white'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <p className={`text-center text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            Didn't receive code?{' '}
            <button 
              type="button" 
              className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline`}
            >
              Resend OTP
            </button>
          </p>
        </form>
        
        <button
          onClick={onBack}
          className={`absolute top-4 right-4 text-xl ${
            darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;