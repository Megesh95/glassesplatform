import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

const SignUp = ({ onClose, onSwitch, darkMode }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', password: '', gender: 'male'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => { setAnimate(true); }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) newErrors.fullName = 'Name too short';
    if (!formData.phone) newErrors.phone = 'Phone required';
    else if (formData.phone.length !== 10) newErrors.phone = 'Must be 10 digits';
    if (!formData.email) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '').slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const registerUserInBackend = async (userData, idToken) => {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userData,
        phone: userData.phone || `+91${formData.phone}`,
        idToken,
        isAdmin: false,
        gender: userData.gender || formData.gender
      }),
    });
    if (!response.ok) throw new Error('Backend registration failed');
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.fullName });
      await registerUserInBackend(formData, await userCredential.user.getIdToken());
      alert('Account created successfully!');
      onSwitch();
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Signup failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use': errorMessage = 'Email already registered.'; break;
        case 'auth/invalid-email': errorMessage = 'Invalid email address.'; break;
        case 'auth/weak-password': errorMessage = 'Password too weak.'; break;
        default: errorMessage = error.message || errorMessage;
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
      await registerUserInBackend({
        fullName: result.user.displayName || '',
        email: result.user.email,
        phone: result.user.phoneNumber || '',
        gender: 'other'
      }, await result.user.getIdToken());
      alert('Google signup successful!');
      onClose();
    } catch (error) {
      console.error('Google signup error:', error);
      alert(error.code === 'auth/popup-closed-by-user' 
        ? 'Popup closed. Try again.' 
        : error.code === 'auth/account-exists-with-different-credential' 
          ? 'Account exists. Please sign in.' 
          : 'Google signup failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white'} rounded-xl shadow-lg p-6 w-full max-w-md mx-4 transform transition-all duration-300 ${
        animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}>
        <button onClick={onClose} className={`absolute top-4 right-4 text-xl ${darkMode ? 'text-zinc-400' : 'text-gray-400'}`}>
          &times;
        </button>

        <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Sign Up</h2>

        <button
          onClick={handleGoogleSignUp}
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
              Signing Up...
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
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
                darkMode ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'
              } ${errors.fullName ? 'border-red-500' : ''}`}
              required
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div className="relative">
            <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none rounded-l-md border border-r-0 ${
              darkMode ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-100 border-gray-300'
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
                darkMode ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'
              } ${errors.phone ? 'border-red-500' : ''}`}
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

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

          <div>
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
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 w-full ${
              darkMode ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400' : 'border-gray-300 focus:ring-blue-500'
            }`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up with Email'}
          </button>
        </form>

        <p className={`text-center text-sm mt-4 ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <button onClick={onSwitch} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;