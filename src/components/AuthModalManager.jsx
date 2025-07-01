import React from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';

const AuthModalManager = ({ 
  authModal, 
  closeAuthModal, 
  switchAuthModal, 
  handleOTPSent,
  darkMode // Add darkMode prop
}) => {
  if (!authModal.show || !authModal.type) return null;

  return (
    <>
      {authModal.type === 'signin' && (
        <SignIn
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={() => switchAuthModal('getotp')}
          darkMode={darkMode} // Pass to SignIn
        />
      )}

      {authModal.type === 'signup' && (
        <SignUp
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
          darkMode={darkMode} // Pass to SignUp
        />
      )}

      {authModal.type === 'getotp' && (
        <GetOTP
          onBack={closeAuthModal}
          onOTPSent={handleOTPSent}
          darkMode={darkMode} // Pass to GetOTP
        />
      )}

      {authModal.type === 'verifyotp' && (
        <VerifyOTP
          email={authModal.email}
          onBack={closeAuthModal}
          onSuccess={() => {
            alert('OTP verified! Redirecting to password reset...');
            closeAuthModal();
          }}
          darkMode={darkMode} // Pass to VerifyOTP
        />
      )}
    </>
  );
};

export default AuthModalManager;