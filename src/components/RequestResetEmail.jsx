import React, { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';

const RequestResetEmail = ({ onBack, onSubmit, darkMode }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await onSubmit(email);
      setMessage('If an account exists, a reset link has been sent to your email');
    } catch (error) {
      setMessage('Error requesting reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl relative p-8`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Reset Password</h2>
        
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div className={`mb-4 p-3 rounded ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onBack}
            className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestResetEmail;