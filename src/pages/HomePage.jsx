import React from 'react';
import SliderAnimation from '../components/SliderAnimation';
import Products from '../components/Products/Products';
import TrendingCarousel from "../components/TrendingCarousel";
import ContactLensesCarousel from "../components/ContactLensesCarousel";
import EyeglassesSunglassesCarousel from '../components/EyeglassesSunglassesCarousel';

const HomePage = ({ addToCart, addToWishlist, wishlistItems, removeFromWishlist, cartItems }) => {
  return (
    <>
      <SliderAnimation />
      <SectionDivider title="New Models" />
      <div className="py-16 px-4 flex items align-middle">
        <Products 
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
        />
      </div>

      <TrendingCarousel />
      <ContactLensesCarousel 
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlistItems={wishlistItems}
        removeFromWishlist={removeFromWishlist}
        cartItems={cartItems}
      />

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

      <SectionDivider title="BUY ONE GET ONE FREE" />
      <BannerImage 
      src="https://static5.lenskart.com/media/uploads/1920x520-desktop-banner.png"
      alt="BUY ONE GET ONE FREE"
      />

      <SectionDivider title="AS SEEN ON SHARK TANK" />
      <BannerImage 
      src="https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif"
      alt="AS SEEN ON SHARK TANK"
      />

      <SectionDivider title="Trending Sunglasses" />
      <BannerImage 
      src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif"
      alt="Trending Sunglasses"
      />

      <SectionDivider title="OUR BRANDS" />
      <BannerImage 
      src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/VC-Banner.jpg"
      alt="OUR BRANDS"
      />

<EyeglassesSunglassesCarousel
  addToCart={addToCart}
  addToWishlist={addToWishlist}
  wishlistItems={wishlistItems}
  removeFromWishlist={removeFromWishlist}
  cartItems={cartItems}
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
  <div className="w-full">
    <img
      src={src}
      alt={alt}
      className="w-full h-auto block"
    />
  </div>
);

export default HomePage;
