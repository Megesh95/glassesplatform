import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthModalManager = ({ 
  authModal, 
  closeAuthModal, 
  switchAuthModal, 
  handleOTPSent,
  darkMode,
  onGoogleAuthSuccess,
  onGoogleAuthError
}) => {
  const [resetData, setResetData] = React.useState({
    email: '',
    userId: '',
    token: ''
  });

  const handleGoogleSignIn = async (phone = '') => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const fullName = result.user.displayName || '';
      const email = result.user.email || '';

      // Send to backend
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone, // from user input on Signup modal
          idToken,
          isAdmin: false
        })
      });

      if (response.ok) {
        const user = await response.json();
        if (onGoogleAuthSuccess) onGoogleAuthSuccess(user);
        closeAuthModal();
      } else {
        const errorData = await response.json();
        if (onGoogleAuthError) onGoogleAuthError(errorData);
      }
    } catch (error) {
      console.error('Google auth error:', error);
      if (onGoogleAuthError) onGoogleAuthError(error);
    }
  };

  const handleOTPVerified = (userId, token) => {
    setResetData(prev => ({ ...prev, userId, token }));
    switchAuthModal('newpassword');
  };

  const handlePasswordResetComplete = () => {
    setResetData({ email: '', userId: '', token: '' });
    closeAuthModal();
  };

  if (!authModal.show || !authModal.type) return null;

  return (
    <>
      {authModal.type === 'signin' && (
        <Signin
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={() => switchAuthModal('getotp')}
          onGoogleSignIn={handleGoogleSignIn}
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'signup' && (
        <Signup
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
          onGoogleSignIn={handleGoogleSignIn}
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'getotp' && (
        <GetOTP
          onBack={() => switchAuthModal('signin')}
          onOTPSent={(email) => {
            setResetData(prev => ({ ...prev, email }));
            handleOTPSent(email);
            switchAuthModal('verifyotp');
          }}
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'verifyotp' && (
        <VerifyOTP
          email={resetData.email}
          onBack={() => switchAuthModal('getotp')}
          onVerified={handleOTPVerified}
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'newpassword' && (
        <NewPassword
          userId={resetData.userId}
          token={resetData.token}
          onBack={() => switchAuthModal('verifyotp')}
          onComplete={handlePasswordResetComplete}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default AuthModalManager;
