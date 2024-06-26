import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/GamesByPlatform.css";
import baseUrl from "../api/api";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../style/Games.css";

export default function GamesByPlatform() {
  let { id } = useParams();
  const [games, setGames] = useState([]);
  const [ads, setAds] = useState([]);
  const [consoles, setConsoles] = useState([]);

  const navigate = useNavigate();
  let showGame = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  useEffect(() => {
    const getGames = async () => {
      const response = await axios.get(`${baseUrl}/games`);
      let allGames = response.data;
      //creating an empty array to push games that only have the consoleId, to later set the useState to
      let consoleGames = [];
      //iterating through all the games
      for (let game of allGames) {
        //iterating through each game's array of console Id's
        for (let consoleId of game.consoleId) {
          //checking if the game's array of consoles includes the console id from params, and if so, pushing to my consoleGames array made earlier
          if (consoleId == id) {
            consoleGames.push(game);
          }
        }
      }
      //setting the use state games array to only have the games if the game has the console id
      setGames(consoleGames);
    };
    getGames();

    const getAds = async () => {
      const adResponse = await axios.get(`${baseUrl}/bannerAds`);
      setAds(adResponse.data);
    };

    getAds();

    const getConsole = async () => {
      const response = await axios.get(`${baseUrl}/consoles/${id}`);
      setConsoles(response.data);
    };
    getConsole();
  }, []);

  const pick1RandomAd = () => {
    const shuffledArray = ads.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, 1);
  };

  let consoleName = consoles.name;


  return (
    <div className="games-page-container">
      <h1></h1>
      <div className="consoles-top-ad-section">
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


      <div className="games-container">
        <div className="title-cards-container">
          <div className="title-container">
            <h1 className="console-title">{consoleName} Games</h1>
          </div>
          <div className="cards-container">
            {games.map((game, index) => (
              <div
                className="game-card"
                key={game._id}
                onClick={() => showGame(game._id)}>
                <img className="game-image" src={game.img_path} alt="" />
                <h1>{game.title}</h1>
                <h3>${game.price}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
