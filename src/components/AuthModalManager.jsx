import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import RequestResetEmail from './RequestResetEmail';
import VerifyResetToken from './VerifyResetToken';
import ResetPassword from './ResetPassword';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthModalManager = ({ 
  authModal, 
  closeAuthModal, 
  switchAuthModal,
  darkMode,
  onAuthSuccess 
}) => {
  const [resetData, setResetData] = useState({
    email: '',
    userId: '',
    token: ''
  });
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [resetError, setResetError] = useState('');

  // Handle forgot password flow
  const handleForgotPassword = () => {
    setResetError('');
    switchAuthModal('requestReset');
  };

  // Handle password reset request
  const handlePasswordResetRequest = async (email) => {
    try {
      setResetError('');
      const response = await fetch('http://localhost:5000/auth/req-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setResetData(prev => ({ ...prev, email }));
        return { success: true, message: data.message || 'Reset link sent to your email' };
      } else {
        throw new Error(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
      setResetError(error.message);
      return { success: false, message: error.message };
    }
  };

  // Handle token verification (when user clicks email link)
  const handleTokenVerification = async (token, userId) => {
    try {
      setResetError('');
      const response = await fetch(`http://localhost:5000/auth/verify-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setResetData(prev => ({ ...prev, token, userId }));
        switchAuthModal('resetPassword');
        return true;
      } else {
        throw new Error(data.message || 'Token verification failed');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setResetError(error.message);
      return false;
    }
  };

  // Handle password reset - Updated to match your API endpoint
  const handlePasswordReset = async (newPassword) => {
    try {
      setResetError('');
      const response = await fetch(`http://localhost:5000/auth/reset/${resetData.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: resetData.token,
          newPassword 
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        closeAuthModal();
        return { success: true, message: 'Password reset successfully' };
      } else {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      setResetError(error.message);
      return { success: false, message: error.message };
    }
  };

  // Handle Google authentication
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setGoogleError('');
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const user = result.user;
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const jsonResponse = await response.json();
      if (response.ok) {
        if (jsonResponse.user) {
          onAuthSuccess(jsonResponse.user);
          closeAuthModal();
        } else {
          throw new Error('No user data received');
        }
      } else {
        throw new Error(jsonResponse.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setGoogleError(error.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!authModal.show || !authModal.type) return null;

  return (
    <>
      {/* Sign In Modal */}
      {authModal.type === 'signin' && (
        <Signin
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={handleForgotPassword}
          darkMode={darkMode}
          onAuthSuccess={onAuthSuccess}
          onGoogleSignIn={handleGoogleSignIn}
          googleLoading={googleLoading}
          googleError={googleError}
        />
      )}

      {/* Sign Up Modal */}
      {authModal.type === 'signup' && (
        <Signup
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
          darkMode={darkMode}
          onGoogleSignIn={handleGoogleSignIn}
          googleLoading={googleLoading}
          googleError={googleError}
        />
      )}

      {/* Request Password Reset Modal */}
      {authModal.type === 'requestReset' && (
        <RequestResetEmail
          onBack={() => switchAuthModal('signin')}
          onSubmit={handlePasswordResetRequest}
          darkMode={darkMode}
          error={resetError}
        />
      )}

      {/* Verify Reset Token Modal */}
      {authModal.type === 'verifyResetToken' && (
        <VerifyResetToken
          email={resetData.email}
          onBack={() => switchAuthModal('requestReset')}
          onVerified={handleTokenVerification}
          darkMode={darkMode}
          error={resetError}
        />
      )}

      {/* Reset Password Modal */}
      {authModal.type === 'resetPassword' && (
        <ResetPassword
          onBack={() => switchAuthModal('verifyResetToken')}
          onSubmit={handlePasswordReset}
          darkMode={darkMode}
          error={resetError}
        />
      )}
    </>
  );
};

export default AuthModalManager;