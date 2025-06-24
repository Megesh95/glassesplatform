import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import img1 from '../assets/slider_pics/img1.png';
import img2 from '../assets/slider_pics/img2.png';
import img3 from '../assets/slider_pics/img3.png';
import img4 from '../assets/slider_pics/img4.png';
import img5 from '../assets/slider_pics/img5.png';
import img6 from '../assets/slider_pics/img6.png';
import img7 from '../assets/slider_pics/img7.png';
import img8 from '../assets/slider_pics/img8.png';
import img9 from '../assets/slider_pics/img9.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const SliderAnimation = () => {
  const [curIndex, setCurIndex] = useState(0);
  const indexRef = useRef(curIndex);


  useEffect(() => {
    indexRef.current = curIndex;
  }, [curIndex]);

  const prev = () => {
    const isFirst = curIndex === 0;
    setCurIndex(isFirst ? images.length - 1 : curIndex - 1);
  };

  const next = () => {
    const isLast = curIndex === images.length - 1;
    setCurIndex(isLast ? 0 : curIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-[1680px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${images[curIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-700 "
      />
      
  
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer'
        onClick={prev}
      >
        <FaChevronLeft size={30} />
      </div>

      
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer'
        onClick={next}
      >
        <FaChevronRight size={30} />
      </div>
    </div>
  );
};

export default SliderAnimation;
