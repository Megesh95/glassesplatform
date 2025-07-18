import React, { useState, useEffect } from "react";
import "./AccountInfo.css";

function AccountInfo({ user }) {
    console.log("AccountInfo.jsx: Received user prop:", user);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
  });

  // Update form data when user prop changes
  useEffect(() => {
    console.log("AccountInfo.jsx: useEffect called. Current user prop:", user);

    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        gender: user.gender || "",
      });
      console.log("AccountInfo.jsx: formData set from user:", {
        fullName: user.fullName || "",
        email: user.email || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      console.log(`AccountInfo.jsx: Changed ${name} to`, value);
      return updated;
    });
  };

  return (
    <div className="accinfo-container">
      <h1 className="accinfo-title">Edit Account Information</h1>
      <h3 className="accinfo-subtitle">Account Information</h3>

      <form className="accinfo-form">
        <label className="accinfo-label">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="accinfo-input"
          />
        </label>

        <label className="accinfo-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="accinfo-input"
            disabled // usually we don't allow changing email
          />
        </label>

        <label className="accinfo-label">
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="accinfo-select"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        {/* Submit button can go here if you want to PATCH */}
      </form>
    </div>
  );
}

export default AccountInfo;
