import React, { useState, useEffect } from "react"; 
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";

import {
  CheckCircle,
  XCircle,
  Eye,
  ScanEye,
  Glasses,
} from "lucide-react";

const Appointment = () => {
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isBooked, setIsBooked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isTimeInPast = (selectedTimeStr) => {
    if (!appointmentDate || !selectedTimeStr) return false;

    const [hours, minutes] = selectedTimeStr.split(":").map(Number);
    const selectedDateTime = new Date(appointmentDate);
    selectedDateTime.setHours(hours);
    selectedDateTime.setMinutes(minutes);
    selectedDateTime.setSeconds(0);

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (appointmentDate === today) {
      return selectedDateTime < now;
    }

    return false;
  };

  const validateStep = () => {
    let valid = true;
    const newErrors = {};

    if (step === 1) {
      if (!/^[0-9]{10}$/.test(mobile)) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number.";
        valid = false;
      }
    }

    if (step === 2) {
      if (!address.trim()) {
        newErrors.address = "Address is required.";
        valid = false;
      }
    }

    if (step === 3) {
      if (!appointmentDate) {
        newErrors.date = "Please select a date.";
        valid = false;
      }
      if (!appointmentTime || typeof appointmentTime !== "string") {
        newErrors.time = "Please set a valid time.";
        valid = false;
      } else if (isTimeInPast(appointmentTime)) {
        newErrors.time = "You cannot select a past time.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center gap-8 px-6 py-12 md:px-12 lg:px-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-md">
        <video
          src="/navpics/EyeTest-Square-LK@Home.mp4"
          className="w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 border dark:border-gray-700">
        {!showForm ? (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold mb-1">V-Lens at Home</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Eye Test & Frame Trial Service</p>

            <div className="flex items-center text-sm text-green-600 mb-4">
              ★ 4.9 <span className="text-gray-500 dark:text-gray-400 ml-1">(17k)</span>
            </div>

            <h3 className="text-lg font-medium mb-2">Eye test eligibility</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> A well-lit room with 10 ft space is required
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Required age for eye test is 14 - 75 years
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5" /> Not for Diabetics or those with High BP
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-2">What to expect?</h3>
            <ul className="space-y-4 text-sm mb-6">
              <li className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-indigo-500" /> 12 Step Eye Checkup by certified professionals
              </li>
              <li className="flex items-center gap-3">
                <ScanEye className="w-5 h-5 text-sky-500" /> Latest Eye Test Equipments
              </li>
              <li className="flex items-center gap-3">
                <Glasses className="w-5 h-5 text-teal-500" /> Try 150+ frames at home
              </li>
            </ul>

            <div className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
              <div className="text-sm">
                <p className="text-gray-500 line-through">₹120</p>
                <p className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">₹99</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-500 dark:text-gray-300 flex justify-between">
              <span className={step >= 1 ? "font-bold text-indigo-600" : ""}>Login/Signup</span>
              <span className={step >= 2 ? "font-bold text-indigo-600" : ""}>Address</span>
              <span className={step >= 3 ? "font-bold text-indigo-600" : ""}>Date & Time</span>
              <span className={step >= 4 ? "font-bold text-indigo-600" : ""}>Confirm</span>
            </div>

            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-2">Enter Mobile Number</h3>
                <p className="text-sm text-gray-500 mb-4">Enter a valid 10 digit number to get the OTP</p>
                <div className="flex items-center border rounded-md overflow-hidden mb-2">
                  <span className="bg-gray-100 px-3 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">IN(+91)</span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 px-3 py-2 outline-none dark:bg-gray-900 dark:text-white"
                    placeholder="8834678909"
                    maxLength={10}
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-sm mb-2">{errors.mobile}</p>}
                <label className="flex items-center space-x-2 text-sm mb-6">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={() => setWhatsappUpdates(!whatsappUpdates)}
                    className="accent-indigo-600"
                  />
                  <span>Send me text updates on WhatsApp</span>
                </label>
                <button
                  onClick={handleNext}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-medium"
                >
                  Proceed
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Enter Address</h3>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your address"
                  rows={4}
                  className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white"
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm text-gray-600 dark:text-gray-300">Back</button>
                  <button
                    onClick={handleNext}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full mb-2 p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                />
                {errors.date && <p className="text-red-500 text-sm mb-2">{errors.date}</p>}

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>

                <div className="flex flex-col items-center mb-6">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">Set Time</p>
                  <TimePicker
                    onChange={setAppointmentTime}
                    value={appointmentTime}
                    disableClock={false}
                    format="hh:mm a"
                  />
                  {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    Selected Time: {appointmentTime || "Not selected"}
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm text-gray-600 dark:text-gray-300">Back</button>
                  <button
                    onClick={handleNext}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 4 && !isBooked && (
              <>
                <h3 className="text-lg font-semibold mb-4">Confirm Appointment</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li><strong>Mobile:</strong> {mobile}</li>
                  <li><strong>WhatsApp:</strong> {whatsappUpdates ? "Yes" : "No"}</li>
                  <li><strong>Address:</strong> {address}</li>
                  <li><strong>Date:</strong> {appointmentDate}</li>
                  <li><strong>Time:</strong> {appointmentTime || "Not selected"}</li>
                </ul>
                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm text-gray-600 dark:text-gray-300">Back</button>
                  <button
                    onClick={() => setIsBooked(true)}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                    Payment & Book
                  </button> 
                </div>
              </>
            )}

            {step === 4 && isBooked && (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto text-green-600 mb-4 w-10 h-10" />
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  You have successfully booked your appointment!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  We'll contact you shortly with the details.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Appointment;
