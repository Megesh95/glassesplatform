import React, { useEffect, useState } from 'react';

const SignUp = ({ onClose, onSwitch, darkMode }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '', 
    email: '',
    password: '',
    gender: 'male', // default
    firebaseUID: '', // will be set programmatically (e.g., after Firebase sign-up)
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      phone: `+91${formData.phone}`,
      loginMethod: 'email',
    };

    console.log('Submitting:', payload);
    // TODO: Send `payload` to backend (after Firebase sign-up, attach firebaseUID)
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-black/70' : 'bg-black/30'} z-50`}>
      <div
        className={`${darkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'} rounded-xl shadow-lg p-8 w-96 max-w-full transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
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
            className={`py-2 rounded-md transition-all ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Sign Up
          </button>

          <p className={`text-center text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <span
              onClick={onSwitch}
              className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} cursor-pointer hover:underline`}
            >
              Sign In
            </span>
          </p>
        </form>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-xl ${
            darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignUp;
