import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import RetroHeader from "./RetroHeader";
import RetroNavBar from "./RetroNavBar";
import RetroFooter from "./RetroFooter";
import styles from "../style/Retro.module.css";
import baseUrl from "../api/api";

export default function Retro() {
  const [game, setGame] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  let showConsole = (id) => {
    navigate(`/retro/console/${id}`);
  };

  let showGame = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const gamesResponse = await axios.get(`${baseUrl}/games`);
      setGame(gamesResponse.data);

      const consolesResponse = await axios.get(`${baseUrl}/consoles`);
      setConsoles(consolesResponse.data);
    };

    fetchData();
  }, []);

  return (
    <body className={styles.retroBody}>
      {location.pathname === "/retro" && <RetroHeader />}
      <h1 className={styles.retroGame}> Retro Games </h1>
      <a href='https://play.runescape.com/' target='_blank'>
      <img className={styles.runescapeAd} src='https://cdn2.steamgriddb.com/logo_thumb/2feb75fc9b86f959e54a9cc501e190e3.png' />
      </a>
      <div className={styles.retroCard}>
        {game.map((game, index) =>
          game.year_released <= 1998 && (
            <div key={game._id} onClick={() => showGame(game._id)}>
              <h1 className={styles.retroGameTitle}>{game.title}</h1>
              <img className={styles.retroGameCover} src={game.img_path} alt="" />
              <h2 className={styles.retroGamePrice}>${game.price}</h2>
            </div>
          )
        )}
      </div>
      <h1 className={styles.retroConsole}> Consoles </h1>
      <div className={styles.retroConsoleCard}>
        {consoles.map((console, index) =>
          console.year_released <= 1999 && (
            <div key={console._id} onClick={() => showConsole(console._id)}>
              <h1 className={styles.retroConsoleTitle}>{console.name}</h1>
              <img className={styles.retroConsoleCover} src={console.img_path} alt="" />
              <h2 className={styles.retroConsolePrice}>${console.price}</h2>
            </div>
          )
        )}
      </div>

      {location.pathname === "/retro" && <RetroFooter />}
    </body>
  );
}
