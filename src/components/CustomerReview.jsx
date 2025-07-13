import React from 'react';

const CustomerReview = ({ darkMode }) => {
  return (
    <section className={`py-16 ${darkMode ? "bg-neutral-800" : "bg-[#ede38f]"}`}>
      <h2 className={`text-3xl font- text-center mb-10 ${darkMode ? "text-white" : "text-black"}`}>MEET OUR HAPPY CUSTOMERS</h2>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        <div className={`w-[400px] ${darkMode ? "shadow-lg shadow-white/10" : "shadow-md"}`}>
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/HYPqf_eVvvM"
            title="Customer Review"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-[400px]">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/SQm3RxXRunw"
            title="Customer Testimonial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-[400px]">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/IZpUQ-S_LcM"
            title="Customer Diaries"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
