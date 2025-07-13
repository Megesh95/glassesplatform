import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  ScanEye,
  Glasses,
  Calendar,
} from "lucide-react";
import "react-clock/dist/Clock.css";
import "react-time-picker/dist/TimePicker.css";

const TimeSelector = ({ appointmentTime, setAppointmentTime }) => {
  const [hour, setHour] = useState(appointmentTime.hour);
  const [minute, setMinute] = useState(appointmentTime.minute);
  const [ampm, setAmpm] = useState(appointmentTime.ampm);

  // Sync local state with parent prop
  useEffect(() => {
    setHour(appointmentTime.hour);
    setMinute(appointmentTime.minute);
    setAmpm(appointmentTime.ampm);
  }, [appointmentTime]);

  const updateTime = (newHour, newMinute = minute, newAmpm = ampm) => {
    setAppointmentTime({ hour: newHour, minute: newMinute, ampm: newAmpm });
  };

  const handleHourClick = (value) => updateTime(value);
  const handleMinuteChange = (e) => {
    const val = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setMinute(val);
    updateTime(hour, val);
  };

  const handleAmpmChange = (value) => {
    setAmpm(value);
    updateTime(hour, minute, value);
  };

  const clockHours = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="relative w-[180px] h-[180px] rounded-full border border-gray-300 flex items-center justify-center">
        {clockHours.map((h) => {
          const angle = ((h % 12) / 12) * 2 * Math.PI;
          const x = 70 * Math.sin(angle);
          const y = -70 * Math.cos(angle);
          const isSelected = hour === h;
          return (
            <button
              key={h}
              onClick={() => handleHourClick(h)}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer transition-colors duration-200 ${
                isSelected ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {h}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Minute:</label>
        <input
          type="number"
          value={minute}
          onChange={handleMinuteChange}
          min="0"
          max="59"
          className="w-16 px-2 py-1 border rounded-md text-center bg-white text-black placeholder-gray-400 dark:bg-black dark:text-white dark:placeholder-white"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleAmpmChange("AM")}
          className={`px-4 py-1 rounded-md text-sm font-medium transition ${
            ampm === "AM" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          AM
        </button>
        <button
          onClick={() => handleAmpmChange("PM")}
          className={`px-4 py-1 rounded-md text-sm font-medium transition ${
            ampm === "PM" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          PM
        </button>
      </div>
    </div>
  );
};

const Appointment = () => {
  const [appointmentTime, setAppointmentTime] = useState({ hour: null, minute: 0, ampm: "AM" });
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
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isTimeInPast = () => {
    if (!appointmentDate || appointmentTime.hour === null) return false;
    const selectedDateTime = new Date(appointmentDate);
    let hour = appointmentTime.hour % 12;
    if (appointmentTime.ampm === "PM") hour += 12;
    selectedDateTime.setHours(hour);
    selectedDateTime.setMinutes(appointmentTime.minute);
    selectedDateTime.setSeconds(0);
    return selectedDateTime < new Date();
  };

  const validateStep = () => {
    let valid = true;
    const newErrors = {};
    if (step === 1 && !/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter valid 10-digit number.";
      valid = false;
    }
    if (step === 2 && !address.trim()) {
      newErrors.address = "Address required.";
      valid = false;
    }
    if (step === 3) {
      if (!appointmentDate) {
        newErrors.date = "Select a date.";
        valid = false;
      }
      if (appointmentTime.hour === null) {
        newErrors.time = "Set a valid time.";
        valid = false;
      } else if (isTimeInPast()) {
        newErrors.time = "Cannot select past time.";
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => validateStep() && setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const formatTime = () =>
    appointmentTime.hour !== null
      ? `${appointmentTime.hour}:${appointmentTime.minute.toString().padStart(2, "0")} ${appointmentTime.ampm}`
      : "Not selected";

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
              {['Login', 'Address', 'Date & Time', 'Confirm'].map((label, i) => (
                <span
                  key={i}
                  className={step === i + 1 ? "font-bold text-indigo-600" : "text-gray-500"}
                >
                  {label}
                </span>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Enter Mobile Number</h3>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mb-2 bg-white text-black placeholder-gray-400 dark:bg-black dark:text-white dark:placeholder-white"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                />
                {errors.mobile && <p className="text-red-500 text-sm mb-2">{errors.mobile}</p>}
                <label className="flex items-center gap-2 text-sm mb-6">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={() => setWhatsappUpdates(!whatsappUpdates)}
                    className="accent-indigo-600"
                  />
                  Send me WhatsApp updates
                </label>
                <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-2 rounded-md">Proceed</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Enter Address</h3>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="w-full p-3 border rounded-md bg-white text-black placeholder-gray-400 dark:bg-black dark:text-white dark:placeholder-white"
                  placeholder="Your address"
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm">Back</button>
                  <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                {/* Hide native calendar icon */}
                <style>
                  {`
                    input[type="date"].custom-date::-webkit-calendar-picker-indicator {
                      opacity: 0;
                      display: none;
                    }
                    input[type="date"].custom-date::-ms-input-placeholder { color: #a0aec0; }
                    input[type="date"].custom-date::placeholder { color: #a0aec0; }
                  `}
                </style>
                <div className="relative w-full mb-2">
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="custom-date w-full p-2 pr-10 border rounded-md bg-white text-black placeholder-gray-400 dark:bg-black dark:text-white dark:placeholder-white appearance-none"
                    ref={input => window.dateInput = input}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => window.dateInput && window.dateInput.showPicker && window.dateInput.showPicker()}
                    tabIndex={-1}
                    aria-label="Open calendar"
                  >
                    <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                  </button>
                </div>
                {errors.date && <p className="text-red-500 text-sm mb-2">{errors.date}</p>}
                <TimeSelector appointmentTime={appointmentTime} setAppointmentTime={setAppointmentTime} />
                {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
                <p className="mt-3 text-sm text-gray-500">Selected Time: {formatTime()}</p>
                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm">Back</button>
                  <button onClick={handleNext} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">Next</button>
                </div>
              </div>
            )}

            {step === 4 && !isBooked && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Confirm Appointment</h3>
                <ul className="text-sm text-gray-700 dark:text-white space-y-2 mb-4">
                  <li className="dark:text-white"><strong>Mobile:</strong> {mobile}</li>
                  <li className="dark:text-white"><strong>WhatsApp:</strong> {whatsappUpdates ? "Yes" : "No"}</li>
                  <li className="dark:text-white"><strong>Address:</strong> {address}</li>
                  <li className="dark:text-white"><strong>Date:</strong> {appointmentDate}</li>
                  <li className="dark:text-white"><strong>Time:</strong> {formatTime()}</li>
                </ul>
                <div className="flex justify-between mt-6">
                  <button onClick={handleBack} className="text-sm">Back</button>
                  <button
                    onClick={() => setIsBooked(true)}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Payment & Book
                  </button>
                </div>
              </div>
            )}

            {step === 4 && isBooked && (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto text-green-600 mb-4 w-10 h-10" />
                <h3 className="text-xl font-semibold text-green-700">Appointment Booked!</h3>
                <p className="text-sm text-gray-600 mt-2">We'll contact you with the details.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Appointment;
