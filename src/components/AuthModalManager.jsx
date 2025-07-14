import React from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Import your Firebase auth instance

const AuthModalManager = ({ 
  authModal, 
  closeAuthModal, 
  switchAuthModal, 
  handleOTPSent,
  darkMode,
  onGoogleAuthSuccess, // Callback for successful Google auth
  onGoogleAuthError    // Callback for Google auth errors
}) => {
  const [resetData, setResetData] = React.useState({
    email: '',
    userId: '',
    token: ''
  });

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token and user info
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      
      if (onGoogleAuthSuccess) {
        onGoogleAuthSuccess(user);
      }
      closeAuthModal();
    } catch (error) {
      console.error('Google auth error:', error);
      if (onGoogleAuthError) {
        onGoogleAuthError(error);
      }
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
        <SignIn
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={() => switchAuthModal('getotp')}
          onGoogleSignIn={handleGoogleSignIn} // Pass Google auth handler
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'signup' && (
        <SignUp
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
          onGoogleSignIn={handleGoogleSignIn} // Pass Google auth handler
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