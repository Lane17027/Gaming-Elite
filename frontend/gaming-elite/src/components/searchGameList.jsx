import { Link } from 'react-router-dom';

const SearchGameList = ({ games }) => {
  return (
    <div>
      {games.map(game => (
        <div key={game._id}>
          <h3>{game.title}</h3>
          <p>Genre: {game.genre}</p>
          <p>Year Released: {game.year_released}</p>
          <p>Price: {game.price}</p>
          <p>Quantity: {game.quantity}</p>
          <p>Number of Players: {game.number_of_players}</p>
          <p>Online: {game.online ? 'Yes' : 'No'}</p>
          <p>Rating: {game.rating}</p>
          <img src={game.img_path} alt={game.title} style={{ width: '100px', height: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default SearchGameList;
