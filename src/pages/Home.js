import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

import screenshot1 from "../assets/screenshot1.jpg";
import screenshot2 from "../assets/screenshot2.webp";
import screenshot3 from "../assets/screenshot3.webp";
import screenshot4 from "../assets/screenshot4.webp";

const Home = () => {
  const images = [screenshot1, screenshot2, screenshot3, screenshot4];

  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Ласкаво просимо на сайт нашої гри!</h1>
      <p className="home-text">
        Відкрийте для себе неймовірний світ нашої відеогри, де пригоди та
        виклики чекають на вас на кожному кроці.
      </p>

      {randomImage && <img src={randomImage} alt="Random Screenshot" className="home-image" />}

      <Link to="/gallery">
        <button className="animated-button">Переглянути галерею</button>
      </Link>
    </div>
  );
};

export default Home;
