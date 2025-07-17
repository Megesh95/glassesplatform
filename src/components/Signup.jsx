import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, X, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Signup = ({ onClose, onSwitch, darkMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Use E.164 format, e.g., +14155552671';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, formData.email, formData.password
      );
      const idToken = await userCredential.user.getIdToken(true);
      await sendLoginToken(idToken, formData.fullName, formData.phone);
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!formData.phone) {
      setErrors({ submit: 'Phone number is required for Google signup' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);
      await sendLoginToken(idToken, result.user.displayName, formData.phone);
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginToken = async (idToken, fullName, phone) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, idToken, phone, isAdmin: false }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Signup failed');
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const handleFirebaseError = (error) => {
    const code = error.code || '';
    if (code === 'auth/email-already-in-use') {
      setErrors({ submit: 'Email already registered.' });
    } else if (code === 'auth/weak-password') {
      setErrors({ submit: 'Password is too weak.' });
    } else {
      setErrors({ submit: error.message || 'Signup failed.' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-lg shadow-xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold">Create Account</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                placeholder="Full name"
                disabled={isLoading}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                placeholder="Email"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                placeholder="+1234567890"
                disabled={isLoading}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-9 py-2 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                placeholder="Password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {errors.submit && <p className="text-red-500 text-xs">{errors.submit}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-2 px-4 text-sm rounded-md font-medium flex items-center justify-center ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading || !formData.phone}
            className={`w-full py-2 px-4 text-sm border rounded-md font-medium flex items-center justify-center space-x-2 ${
              isLoading || !formData.phone
                ? 'bg-gray-100 cursor-not-allowed'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            } ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitch}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
