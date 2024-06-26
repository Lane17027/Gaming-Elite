import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/BrandDetails.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import baseUrl from "../api/api";


export default function BrandDetails() {
  let { id } = useParams();
  const [consoles, setConsoles] = useState([]);
  const [ads, setAds] = useState([]);
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();
  let showItem = (id) => {
    navigate(`/consoles/${id}`);
  };

  useEffect(() => {
    const getConsoles = async () => {
      const response = await axios.get(`${baseUrl}/consoles`);

      setConsoles(response.data);
    };
    getConsoles();

    const getAds = async () => {
      const adResponse = await axios.get(`${baseUrl}/bannerAds`);
      setAds(adResponse.data);
    };

    getAds();
  }, []);

  let consoleBrands = [];

  for (let system of consoles) {
    if (system.brandId == id && system.year_released > 1999) {
      consoleBrands.push(system);
    }
  }

  const pick1RandomAd = () => {
    const shuffledArray = ads.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 1);
  };

  return (
    <div className="browse-platforms-page-container">
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
      <div className="browse-platforms-container">
        <div className="browse-title-cards-container">
          <div className="browse-title-container">
            <h1 className="browse-title">Browse by Console</h1>
          </div>
        <div className="browse-cards-container">
          {consoleBrands.map((item, index) => (
            <div
              className="browse-card"
              key={item._id}
              onClick={() => showItem(item._id)}>
              <img className="browse-image" src={item.img_path} alt="" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
