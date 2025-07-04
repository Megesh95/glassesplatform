import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig'; // Your Firebase config file

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
  const auth = getAuth(app);

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

  const registerUserInBackend = async (firebaseUser, idToken) => {
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: `+91${formData.phone}`,
          idToken,
          isAdmin: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user in backend');
      }

      const data = await response.json();
      return data;
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
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2. Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      // 3. Get the Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // 4. Register user in your backend
      const backendResponse = await registerUserInBackend(userCredential.user, idToken);

      // 5. Handle successful registration
      console.log('User registered successfully:', backendResponse);
      alert('Account created successfully! You can now login.');
      onSwitch(); // Switch to login form
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

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div
        className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg p-8 w-full max-w-md mx-4 transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
        {/* ... (rest of the JSX remains the same as in the previous example) ... */}
        {/* ❌ Close Button */}
  <button
    onClick={onClose}
    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-200 text-xl font-bold"
    aria-label="Close"
  >
    ×
  </button>
        <h2 className={`text-2xl font-semibold text-center mb-4 ${darkMode ? 'text-zinc-100' : 'text-gray-800'}`}>Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          />

          {/* Phone Number */}
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
              }`}
              required
              pattern="\d{10}"
              title="Enter a 10-digit phone number"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode 
                ? 'bg-zinc-700 border-zinc-600 focus:ring-blue-400 placeholder-zinc-400 text-zinc-100' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          />

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
            'Sign Up'
          )}
        </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;