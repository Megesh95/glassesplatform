// src/pages/HomePage.jsx
import React from 'react';
import SliderAnimation from '../components/SliderAnimation';
import Products from '../components/Products/Products';

const HomePage = () => {
  return (
    <>
      <SliderAnimation />
      <SectionDivider title="New Models" />
      <div className="py-16 px-4 flex items align-middle">
        <Products />
      </div>
      <SectionDivider title="Free Lens Replacement at Stores" />
      <BannerImage 
        src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-hustlrswitch-GJ-150525.png"
        alt="Replacement"
      />
      <SectionDivider title="Premium Eyewear" />
      <BannerImage 
        src="https://static1.lenskart.com/media/desktop/img/16-sep-24/r1.jpeg"
        alt="Premium Eyewear"
      />
    </>
  );
};

const SectionDivider = ({ title }) => (
  <div className="flex items-center justify-center py-5 my-10">
    <div className="flex-grow h-px bg-gray-300"></div>
    <h1 className="px-4 text-3xl font-bold text-gray-800 tracking-wide">
      {title}
    </h1>
    <div className="flex-grow h-px bg-gray-300"></div>
  </div>
);

const BannerImage = ({ src, alt }) => (
  <div className="w-full flex justify-center py-6">
    <img
      src={src}
      alt={alt}
      className="max-w-[1200px] w-full h-auto shadow"
    />
  </div>
);

export default HomePage;