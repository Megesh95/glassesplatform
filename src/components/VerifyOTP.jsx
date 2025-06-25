import React, { useState } from 'react';

const VerifyOTP = ({ email, onBack, onSuccess }) => {
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
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 max-w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Verify OTP</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-gray-600 mb-2">
            We sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
          
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 transition-all disabled:opacity-70"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Didn't receive code?{' '}
            <button type="button" className="text-blue-600 hover:underline">
              Resend OTP
            </button>
          </p>
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

export default VerifyOTP;