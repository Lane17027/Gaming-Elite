import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Games.css";
import baseUrl from "../api/api";

export default function Games() {
  const [games, setGames] = useState([]);
  const [consoles, setConsoles] = useState([]);

  const [ads, setAds] = useState([]);

  const navigate = useNavigate();
  let showItem = (id) => {
    navigate(`consoles/${id}`);
  };

  let showGame = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get(`${baseUrl}/games`);

      let filteredGames = [];

      for (let game of response.data) {
        if (game.year_released > 1998) {
          filteredGames.push(game);
        }
      }

      setGames(filteredGames);
    };
    getGames();

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

  const pick1RandomAd = () => {
    const shuffledArray = ads.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 1);
  };

  const mainConsoles = [];

  for (let console of consoles) {
    if (
      console.name == "Playstation 5" ||
      console.name == "Xbox Series X/S" ||
      console.name == "Nintendo Switch" ||
      console.name == "PC"
    ) {
      mainConsoles.push(console);
    }
  }

  const pick2RandomItems = () => {
    const shuffledArray = games.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 2);
  };

  const pick5RandomItems = () => {
    const shuffledArray = games.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 5);
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
      <div className="random-games-container">
        <div className="random-cards-container">
          {pick2RandomItems().map((game, index) => (
            <div
              className="game-icon"
              key={game._id}
              onClick={() => showGame(game._id)}
            >
              <img
                className="random-game-icon-image"
                src={game.img_path}
                alt=""
              />
              <h3 className="random-game-name">{game.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="platforms-container">
        <h3>Browse Games by Platform</h3>
        <div className="platform-cards-container">
          {mainConsoles.map((item, index) => (
            <div
              className="platform-card"
              key={item._id}
              onClick={() => showItem(item._id)}
            >
              <img className="platform-image" src={item.img_path} alt="" />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="suggested-games-container">
        <h3>Suggested Games</h3>
        <div className="suggested-cards-container">
          {pick5RandomItems().map((game, index) => (
            <div
              className="game-icon"
              key={game._id}
              onClick={() => showGame(game._id)}
            >
              <img className="suggested-image" src={game.img_path} alt="" />
              <h3 className="suggested-game-name">{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
