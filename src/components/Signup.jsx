import React, { useEffect, useState } from 'react';

const SignUp = ({ onClose, onSwitch }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '', // Stores only the user-entered digits (without +91)
    email: '',
    password: '',
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure phone input only contains digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepend +91 to the phone number before sending to the backend
    const payload = {
      ...formData,
      phone: `+91${formData.phone}`, // Full E.164 format
    };
    console.log('Submitting:', payload);
    // TODO: Send payload to your API (e.g., via fetch/axios)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div
        className={`bg-white rounded-xl shadow-lg p-8 w-96 max-w-full transform transition-all duration-300 ${
          animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        } relative`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Phone Number (with +91 prefix) */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
              <span className="text-gray-600">+91</span>
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pl-14"
              required
              pattern="\d{10}" // Ensures 10 digits (without +91)
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
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={onSwitch}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignUp;