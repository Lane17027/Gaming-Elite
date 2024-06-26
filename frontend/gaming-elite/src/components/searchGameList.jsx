import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/searchResult.css';
import baseUrl from "../api/api";

const SearchGameList = ({ games }) => {
  const [hiddenGames, setHiddenGames] = useState([]);
  const location = useLocation();

  const handleClick = (gameId) => {
    setHiddenGames([...hiddenGames, gameId]);
  };

  const isGameHidden = (gameId) => hiddenGames.includes(gameId);

  return (
    <div className="search-page-container">
      <div className="search-title-items-container">

        {location.pathname.startsWith("/search") &&
          <div className="search-title">

          </div>
        }

        <div className="search-items-container">

          {games.map((game) => (
            <Link to={`/games/${game._id}`} key={game._id}>
              <div className={`search-card ${isGameHidden(game._id) ? 'hidden' : ''}`}>
                <div className="search-image-container">
                  <img className='search-image' src={game.img_path} alt={game.title} />
                </div>




                  <div className="search-details-container">
                    <div className="search-title-container">
                      <h2 className='search-title'>{game.title}</h2>
                      <h3 className="search-price">${game.price}</h3>
                    </div>
                    <div className="search-details">
                      <div className='search-details-box'>
                        <p className='search-release-title'>Release Year: <span className='search-year-released'>{game.year_released}</span></p>
                        <p className='search-genres-title'>Genres</p>
                        <p className='search-game-genres'>{game?.genre.join(', ')}</p>
                      </div>
                      <div className='search-details-box'>
                        <p className='search-game-players'>Number of Players: <span className='search-player-number'> {game.number_of_players}</span></p>
                        <div className='search-online-container'>
                          <p className='search-game-online'>Online</p>
                          <p>{game?.online ? ( <p className="search-online-boolean">Yes</p> ) : (<p className="search-online-boolean">No</p>)}</p>
                        </div>
                      </div>
                      <div className='search-details-box'>
                        <img className='search-rating-img' src={game?.rating_img} alt=''/>
                      </div>
                    </div>
                  </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
            }
export default SearchGameList;
