import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./TrendingCarousel.css"; 

const sampleTrending = [
  {
    id: 1,
    name: 'Grey Transparent Square',
    price: 2000,
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e13520-n-c1-eyeglass_dsc3741_16_12_2024.jpg'
  },
  {
    id: 2,
    name: 'Black Full Rim Rectangle',
    price: 2000,
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-s15598-c1-sunglasses_g_8363_16_may23.jpg'
  },
  {
    id: 3,
    name: 'Gold Brown Rectangle',
    price: 2000,
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/gold-brown-half-rim-rectangle-lenskart-air-essentials-la-e13852-c1-eyeglasses_lenskart-air-la-e13852-c1-eyeglasses_g_2523_28july23.jpg'
  },
  {
    id: 4,
    name: 'Black Full Rim Geometric',
    price: 1500,
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-gold-black-full-rim-geometric-vincent-chase-polarized-pilot-collection-vc-s15403-c2-sunglasses_g_0716_01_02_2023.jpg'
  }
];

const TrendingCarousel = () => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="trending-carousel">
      <h2>Trending Products</h2>
      <Slider {...settings}>
        {sampleTrending.map((product) => (
          <div key={product.id} className="carousel-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCarousel;
