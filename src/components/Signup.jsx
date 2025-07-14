import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

const SignUp = ({ onClose, onSwitch, darkMode }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    gender: 'male',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const registerUserInBackend = async (userData, idToken) => {
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          phone: userData.phone || `+91${formData.phone}`,
          email: userData.email,
          idToken,
          isAdmin: false,
          gender: userData.gender || formData.gender
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user in backend');
      }

      return await response.json();
    } catch (error) {
      console.error('Backend registration error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      const idToken = await userCredential.user.getIdToken();
      await registerUserInBackend(formData, idToken);

      alert('Account created successfully! You can now login.');
      onSwitch();
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Signup failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const userData = {
        fullName: user.displayName || '',
        email: user.email,
        phone: user.phoneNumber || '',
        gender: 'other' // Default for Google signups
      };

      const backendResponse = await registerUserInBackend(userData, idToken);

      console.log('Google signup successful:', backendResponse);
      alert('Account created successfully with Google!');
      onClose();
    } catch (error) {
      console.error('Google signup error:', error);
      let errorMessage = 'Google signup failed. Please try again.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Signup popup was closed. Please try again.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email. Please sign in instead.';
      }
      
      alert(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div
        className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg p-8 w-full max-w-md mx-4 transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-xl ${
            darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Sign Up</h2>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
          className={`w-full py-3 rounded-md mb-4 flex items-center justify-center gap-2 ${
            darkMode 
              ? 'bg-white text-gray-800 hover:bg-gray-200' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } ${isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isGoogleLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing Up...
            </>
          ) : (
            <>
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5" 
              />
              Continue with Google
            </>
          )}
        </button>

        <div className="flex items-center my-4">
          <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-600' : 'bg-gray-300'}`}></div>
          <span className={`px-3 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>or</span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-600' : 'bg-gray-300'}`}></div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                darkMode 
                  ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                  : 'border-gray-300 focus:ring-blue-500'
              } ${errors.fullName ? 'border-red-500' : ''}`}
              required
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none rounded-l-md border border-r-0 ${
                darkMode 
                  ? 'bg-zinc-900 border-zinc-900 text-zinc-300' 
                  : 'bg-gray-100 border-gray-300 text-gray-600'
              }`}>
                <span>+91</span>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full pl-14 ${
                  darkMode 
                    ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                    : 'border-gray-300 focus:ring-blue-500'
                } ${errors.phone ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                darkMode 
                  ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                  : 'border-gray-300 focus:ring-blue-500'
              } ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                darkMode 
                  ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                  : 'border-gray-300 focus:ring-blue-500'
              } ${errors.password ? 'border-red-500' : ''}`}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md transition-all flex items-center justify-center ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Sign Up with Email'
            )}
          </button>
        </form>

        <p className={`text-center text-sm mt-4 ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <span
            onClick={onSwitch}
            className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} cursor-pointer hover:underline`}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;