import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Games.css";
import baseUrl from "../api/api";

export default function Consoles() {
  const [ads, setAds] = useState([]);
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();

  let showBrand = (id) => {
    navigate(`/brands/${id}`);
  };

  useEffect(() => {
    const getAds = async () => {
      const adResponse = await axios.get(`${baseUrl}/bannerAds`);
      setAds(adResponse.data);
    };

    getAds();

    const getBrands = async () => {
      const brandResponse = await axios.get(`${baseUrl}/brands`);
      setBrands(brandResponse.data);
    };
    getBrands();
  }, []);

  const mainBrands = [];

  for (let brand of brands) {
    if (brand.name == "Sony") {
      brand.img_path =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/PlayStation_App_Icon.jpg/800px-PlayStation_App_Icon.jpg";
      mainBrands.push(brand);
    }
    if (brand.name == "Microsoft") {
      brand.img_path =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Xbox_app_logo.svg/1200px-Xbox_app_logo.svg.png";
      mainBrands.push(brand);
    }
    if (brand.name == "Nintendo") {
      brand.img_path =
        "https://upload.wikimedia.org/wikipedia/commons/9/95/Nintendo_Logo_2017.png";
      mainBrands.push(brand);
    }
  }

  console.log(brands);

  const pick1RandomAd = () => {
    const shuffledArray = ads.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 1);
  };

  return (
    <div className="games-page-container">
      <div className="top-ad-section">
        <div className="top-ad-container">
          {pick1RandomAd().map((ad, index) => (
            <div className="ad-card" key={index}>
            {ad._id == "65f20cd13bca3e1777f5175a" ? (
              <a
                href="https://youtu.be/xvFZjo5PgG0?si=fVXJ0RLAmpGwk6ac"
                target="_blank"
              >
                <img className="ad-image" src={ad.image_path} alt="" />
              </a>
            ) : (
              <img className="ad-image" src={ad.image_path} alt="" />
            )}
          </div>
          ))}
        </div>
      </div>
      <div className="platforms-container">
        <h3>Browse Brands</h3>
        <div className="platform-cards-container">
          {mainBrands.map((item, index) => (
            <div
              className="platform-card"
              key={item._id}
              onClick={() => showBrand(item._id)}
            >
              <img className="platform-image" src={item.img_path} alt="" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="home-bottom-ad-section">
        <div className="home-bottom-ad-container">
          {pick1RandomAd().map((ad, index) => (
            <div className="ad-card" key={index}>
            {ad._id == "65f20cd13bca3e1777f5175a" ? (
              <a
                href="https://youtu.be/xvFZjo5PgG0?si=fVXJ0RLAmpGwk6ac"
                target="_blank"
              >
                <img className="ad-image" src={ad.image_path} alt="" />
              </a>
            ) : (
              <img className="ad-image" src={ad.image_path} alt="" />
            )}
          </div>
          ))}
        </div>
      </div>

    </div>
  );
}
