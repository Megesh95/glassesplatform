// src/components/AuthModalManager.jsx
import React from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';

const AuthModalManager = ({ authModal, closeAuthModal, switchAuthModal, handleOTPSent }) => {
  if (!authModal.show || !authModal.type) return null;

  return (
    <>
      {authModal.type === 'signin' && (
        <SignIn
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={() => switchAuthModal('getotp')}
        />
      )}

      {authModal.type === 'signup' && (
        <SignUp
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
        />
      )}

      {authModal.type === 'getotp' && (
        <GetOTP
          onBack={closeAuthModal}
          onOTPSent={handleOTPSent}
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
        />
      )}
    </>
  );
};

export default AuthModalManager;