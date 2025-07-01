import React, { useState } from 'react';

const images = [
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_134722_1_23_06_2025.png',
    alt: 'Aqualens 10H Dailies',
    name: 'Aqualens 10H Dailies',
    price: '₹ 499',
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-daily-disposable-contact-lenses--30-lenses-box_aqualens-daily-disposable-contact-lenses--30-lenses-box_csvfile-1681129631044-134723.png.png',
    alt: 'Aqualens Daily Disposable 30',
    name: 'Aqualens Daily Disposable 30',
    price: '₹ 1299',
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-dailies_118538_1_23_06_2025.png',
    alt: 'Aqualens 24H Dailies',
    name: 'Aqualens 24H Dailies',
    price: '₹ 599',
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_144128_1_23_06_2025.png',
    alt: 'Aqualens 24H Toric Dailies',
    name: 'Aqualens 24H Toric Dailies',
    price: '₹ 799',
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_144127_1_23_06_2025.png',
    alt: 'Aqualens NXT Monthly',
    name: 'Aqualens NXT Monthly',
    price: '₹ 999',
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_134538_1_23_06_2025.png',
    alt: 'Aqualens 10H Monthly',
    name: 'Aqualens 10H Monthly',
    price: '₹ 899',
  },
];

const VISIBLE_COUNT = 3;

const ContactLensesCarousel = () => {
  const [startIdx, setStartIdx] = useState(0);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(prev + 1, images.length - VISIBLE_COUNT));
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-12 mb-16 px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-wide">CONTACT LENSES</h2>
        <a href="#" className="text-teal-600 font-medium hover:underline">View Range</a>
      </div>
      <hr className="mb-8" />
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={startIdx === 0}
          className={`absolute left-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Previous"
        >
          <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        {/* Images */}
        <div className="flex justify-center w-full gap-12">
          {images.slice(startIdx, startIdx + VISIBLE_COUNT).map((img, idx) => (
            <div key={img.src} className="min-w-[200px] transition-transform duration-300 cursor-pointer text-center p-3 hover:scale-105">
              <img
                src={img.src}
                alt={img.alt}
                className="object-contain w-full h-32 rounded"
                style={{ maxWidth: 240 }}
              />
              <h3 className="mt-3 mb-1 text-base font-semibold">{img.name}</h3>
              <p className="text-gray-700 font-bold">{img.price}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={startIdx >= images.length - VISIBLE_COUNT}
          className={`absolute right-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Next"
        >
          <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
};

export default ContactLensesCarousel; 