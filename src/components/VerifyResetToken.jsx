import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const VerifyResetToken = ({ email, onBack, onVerified, darkMode }) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token && userId) {
      verifyToken(token, userId);
    } else {
      setLoading(false);
      setError('Invalid reset link');
    }
  }, [searchParams]);

  const verifyToken = async (token, userId) => {
    try {
      await onVerified(token, userId);
      setVerified(true);
    } catch (err) {
      setError('Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl relative p-8`}>
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin h-8 w-8 mb-4 text-blue-500" />
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verifying reset token...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl relative p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Error</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={onBack}
            className={`w-full py-2 px-4 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyResetToken;