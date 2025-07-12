import React from "react";

const faqs = [
  {
    q: "What is Lenskart Home Eye Test?",
    a: "A professional eye test and frame trial service at your home by certified experts."
  },
  {
    q: "Why Should I Opt for the Lenskart Home Eye Test?",
    a: "It is convenient, accurate, and lets you try 150+ frames at home."
  },
  {
    q: "What Cities Is this Service Available In?",
    a: "Available in major cities. Check with Lenskart for your location."
  },
  {
    q: "Where to Go for an Eye Check-Up?",
    a: "You can book a home visit or visit a Lenskart store."
  },
  {
    q: "How Much Does the Lenskart Eye Check Up Cost?",
    a: "The home eye test costs ₹99 (discounted from ₹120)."
  },
  {
    q: "How to Test Eye Power at Home?",
    a: "A certified professional will use the latest equipment to test your eyes at home."
  },
  {
    q: "How to Check Your Eyesight at Home?",
    a: "Book an appointment and a professional will visit you for a complete checkup."
  },
  {
    q: "How to Check the Eye Number at Home?",
    a: "The professional will provide your eye number after the test."
  }
];

const reviews = [
  {
    name: "Neha Kapoor",
    rating: 5,
    text: "Top-notch service, convenient and accurate."
  }
];

const HomeEyeTestPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-2">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Video and Image Section */}
        <div className="flex-1 flex justify-center">
          <video
            src="https://static.lenskart.io/video/yt-videos/EyeTest-Square-LK@Home.mp4#t=0.1"
            controls
            className="rounded-2xl w-full max-w-xl shadow-lg"
            poster="https://static.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg"
          />
        </div>
        {/* Info Card */}
        <div className="flex-1 max-w-md bg-white rounded-2xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold mb-1">Lenskart at Home</h2>
          <div className="text-gray-600 mb-2">Eye Test & Frame Trial Service</div>
          <div className="flex items-center mb-4">
            <span className="text-green-600 font-bold mr-1">4.9</span>
            <span className="text-green-600">★</span>
            <span className="ml-1 text-gray-500 text-sm">(17k)</span>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-lg mb-1">Eye test eligibility</div>
            <ul className="text-sm space-y-1">
              <li>✅ A well-lit room with 10 ft space is required</li>
              <li>✅ Required age for eye test is 14 - 75 years</li>
              <li>❌ Not for Diabetics or those with High BP (Clinical eye test is required)</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-lg mb-1">What to expect?</div>
            <ul className="text-sm space-y-1">
              <li>👁️ 12 Step Eye Checkup by certified professionals</li>
              <li>🔬 Latest Eye Test Equipments</li>
              <li>👓 Try 150+ frames at home</li>
            </ul>
          </div>
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <span className="font-semibold">Lenskart at Home</span>
            <span>
              <span className="line-through text-gray-400 mr-2">₹120</span>
              <span className="text-lg font-bold text-green-700">₹99</span>
            </span>
          </div>
          <button className="w-full mt-6 bg-blue-900 text-white font-bold py-3 rounded-lg text-lg hover:bg-blue-800 transition">BOOK APPOINTMENT</button>
        </div>
      </div>
      {/* FAQ and Reviews Section */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">FAQs About Home Eye Tests</h2>
          <div className="divide-y divide-gray-200 bg-white rounded-2xl shadow p-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="py-3">
                <summary className="font-semibold cursor-pointer text-lg">{faq.q}</summary>
                <div className="text-gray-600 mt-2 text-base">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
        <div className="flex-1 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-6">
            <h3 className="text-xl font-bold mb-2">Rating & Reviews</h3>
            <div className="flex items-center mb-2">
              <span className="text-green-600 font-bold mr-1">4.9</span>
              <span className="text-green-600">★</span>
              <span className="ml-1 text-gray-500 text-sm">(17k)</span>
            </div>
            {reviews.map((review, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-blue-900">{review.name[0]}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-green-600">★</span>
                    ))}
                  </div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-gray-600 text-sm">{review.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEyeTestPage; 