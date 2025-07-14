import React, { useState } from 'react';
import GetOTP from './GetOTP';
import VerifyOTP from './VerifyOTP';
import NewPassword from './NewPassword';

const PasswordResetFlow = ({ darkMode, onClose }) => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'newPassword'
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const handleOTPSent = (email) => {
    setEmail(email);
    setStep('otp');
  };

  const handleOTPVerified = (userId, token) => {
    setUserId(userId);
    setToken(token);
    setStep('newPassword');
  };

  const handlePasswordReset = () => {
    onClose();
  };

  return (
    <>
      {step === 'email' && (
        <GetOTP onBack={onClose} onOTPSent={handleOTPSent} darkMode={darkMode} />
      )}
      {step === 'otp' && (
        <VerifyOTP
          email={email}
          onBack={() => setStep('email')}
          onVerified={handleOTPVerified}
          darkMode={darkMode}
        />
      )}
      {step === 'newPassword' && (
        <NewPassword
          userId={userId}
          token={token}
          onBack={() => setStep('otp')}
          onComplete={handlePasswordReset}
          darkMode={darkMode}
        />
      )}
    </>
  );
};

export default PasswordResetFlow;