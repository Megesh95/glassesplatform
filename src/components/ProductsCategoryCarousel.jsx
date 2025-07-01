import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsCategoryCarousel.css";

const ProductsCategoryCarousel = () => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  const eyeglasses = [
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7875_1b_28july23.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e12395-c2-eyeglasses_g_4493.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-geometric-vincent-chase-sleek-steel-vc-e13786-c2-eyeglasses_ccg_3318.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-silver-full-rim-square-vincent-chase-sleek-steel-vc-e16002-c2-eyeglasses_g_3149_09_21_23.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Transparent-Blue-Full-Rim-Rectangle-Vincent-Chase-Classic-Acetate-VC-E13676-C3-Eyeglasses_vincent-chase-vc-e13676-c3-c3-eyeglasses_G_924107_02_2022.jpg" },
  ];


  const sunglasses = [
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-grey-full-rim-round-vincent-chase-polarized-met-effect-vc-s15398-c2-sunglasses_g_0998_02_02_23.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-full-rim-round-vincent-chase-the-metal-edit-vc-s13112-c9-polarized-sunglasses_vincent-chase-vcs13112-c9-c9-sunglasses_sunglasses_g_8958_1_5july23.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-blue-full-rim-round-vincent-chase-the-metal-edit-vc-s13137-c3-sunglasses_vincent-chase-vc-s13137-c3-c3-sunglasses_sunglasses_g_8708_5july23.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Gold-Black-Grey-Gradient-Full-Rim-Square-Vincent-Chase-Polarized-VINTAGE-VC-S11748-C4-Polarized-Sunglasses_vincent-chase-vc-s11748-c4-sunglasses_sunglasses_G_126118_02_2022.jpg" },
    { img: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s16958-c1-sunglasses_dd_dsc6021_04_06_2024.jpg" },
  ];

  return (
    <div className="category-carousel-container px-4 py-10 max-w-7xl mx-auto">
      
      {/* Eyeglasses */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h2 className="text-2xl font- tracking-wide">EYEGLASSES</h2>
          <button className="text-teal-600 font-medium hover:underline">View Range</button>
        </div>
        <Slider {...settings}>
          {eyeglasses.map((item, index) => (
            <div key={index} className="image-wrapper flex justify-center p-2">
              <img src={item.img} alt="Eyeglass" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Sunglasses */}
      <div>
  <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
    <h2 className="text-2xl font- tracking-wide">SUNGLASSES</h2>
    <button className="text-teal-600 text-sm font-medium hover:underline">View Range</button>
  </div>
  <Slider {...settings}>
    {sunglasses.map((item, index) => (
      <div key={index} className="flex justify-center p-2">
        <img src={item.img} alt="Sunglass" className="sunglass-img object-contain" />
      </div>
    ))}
  </Slider>
</div>

    </div>
  );
};

export default ProductsCategoryCarousel;
