import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Gallery.css";

import screenshot1 from "../assets/screenshot1.jpg";
import screenshot2 from "../assets/screenshot2.webp";
import screenshot3 from "../assets/screenshot3.webp";
import screenshot4 from "../assets/screenshot4.webp";

const Gallery = () => {
  const images = [screenshot1, screenshot2, screenshot3, screenshot4];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="gallery-container">
      <h1>Галерея</h1>
      <div className="gallery-slider">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Screenshot ${index + 1}`} className="gallery-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
