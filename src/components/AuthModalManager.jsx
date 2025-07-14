import React from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';

const AuthModalManager = ({ 
  authModal, 
  closeAuthModal, 
  switchAuthModal, 
  handleOTPSent,
  darkMode
}) => {
  const [resetData, setResetData] = React.useState({
    email: '',
    userId: '',
    token: ''
  });

  if (!authModal.show || !authModal.type) return null;

  const handleOTPVerified = (userId, token) => {
    setResetData(prev => ({ ...prev, userId, token }));
    switchAuthModal('newpassword');
  };

  const handlePasswordResetComplete = () => {
    setResetData({ email: '', userId: '', token: '' });
    closeAuthModal();
  };

  return (
    <>
      {authModal.type === 'signin' && (
        <SignIn
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signup')}
          onForgotPassword={() => switchAuthModal('getotp')}
          darkMode={darkMode}
        />
      )}

      {authModal.type === 'signup' && (
        <SignUp
          onClose={closeAuthModal}
          onSwitch={() => switchAuthModal('signin')}
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