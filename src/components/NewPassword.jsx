import React, { useState } from 'react';

const NewPassword = ({ userId, token, onBack, onComplete, darkMode }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/auth/reset/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newPassword: password,
          token 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      onComplete();
    } catch (err) {
      setError(err.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg p-8 w-96 max-w-full relative`}>
        <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>New Password</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className={`text-sm mb-2 ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            Enter your new password
          </p>
          
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            autoFocus
          />
          
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
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
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <button
          onClick={onBack}
          className={`absolute top-4 right-4 text-xl ${
            darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default NewPassword;