import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

const SignIn = ({ onClose, onSwitch, onForgotPassword, darkMode }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => { setAnimate(true); }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          email: formData.email,
          fullName: userCredential.user.displayName || '',
          phone: '',
          isAdmin: false
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Authentication failed');
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/user-not-found':
        case 'auth/wrong-password': errorMessage = 'Invalid email or password.'; break;
        case 'auth/too-many-requests': errorMessage = 'Too many attempts. Try again later.'; break;
        case 'auth/email-not-verified': errorMessage = 'Please verify your email first.'; break;
        default: errorMessage = error.message || errorMessage;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken,
          email: result.user.email,
          fullName: result.user.displayName || '',
          phone: result.user.phoneNumber || '',
          isAdmin: false
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error || 'Authentication failed');
      onClose();
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert(error.code === 'auth/popup-closed-by-user' 
        ? 'Sign-in popup was closed. Please try again.' 
        : error.code === 'auth/account-exists-with-different-credential' 
          ? 'Account exists. Please sign in with your password.' 
          : 'Google sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white'} rounded-xl shadow-lg w-96 max-w-full transform transition-all duration-300 ${
        animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}>
        <div className="w-full h-48 relative">
          <img
            src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
            alt="Welcome"
            className="w-full h-full object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 ${darkMode ? 'text-zinc-200' : 'text-white'} text-xl ${darkMode ? 'bg-zinc-700/80' : 'bg-black/40'} rounded-full w-8 h-8 flex items-center justify-center`}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Sign In</h2>
          
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className={`w-full py-3 rounded-md mb-4 flex items-center justify-center gap-2 ${
              darkMode ? 'bg-white text-gray-800' : 'bg-gray-100'
            } ${isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isGoogleLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <span className="flex items-center">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Continue with Google
              </span>
            )}
          </button>

          <div className="flex items-center my-4">
            <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-600' : 'bg-gray-300'}`}></div>
            <span className={`px-3 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>or</span>
            <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-600' : 'bg-gray-300'}`}></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                  darkMode ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'
                } ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                  darkMode ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'
                } ${errors.password ? 'border-red-500' : ''}`}
                required
              />
              <button
                type="button"
                onClick={onForgotPassword}
                className={`absolute right-2 top-3 text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
              >
                Forgot?
              </button>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In with Email'}
            </button>
            
            <p className={`text-center text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <button
                onClick={onSwitch}
                className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;