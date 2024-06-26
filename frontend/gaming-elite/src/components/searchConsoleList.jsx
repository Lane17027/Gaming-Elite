import { useState } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from "../api/api";

const SearchConsoleList = ({ consoles }) => {
  const [hiddenConsoles, setHiddenConsoles] = useState([]);

  const handleClick = (consoleId) => {
    setHiddenConsoles([...hiddenConsoles, consoleId]);
  };

  const isConsoleHidden = (consoleId) => hiddenConsoles.includes(consoleId);

  return (

    <div className="search-page-container1">
      <div className="search-items-container">
        {consoles.map((console) => (
          <Link to={`/consoles/${console._id}`} key={console._id}>
            <div className={`search-card ${isConsoleHidden(console._id) ? 'hidden' : ''}`}>
              <div className="search-image-container">
                <img className="search-image" src={console.img_path} alt={console.title} />
              </div>
              <div className="search-details-container">
                <div className='search-console-title-container'>
                  <h2 className="search-title">{console.name}</h2>
                </div>
                <div className='search-details'>
                  <div className='search-details-box'>
                    <h3 className='search-price'>${console.price}</h3>
                  </div>
                  <div className='search-details-box'>
                    <p className='search-brand-title'>Brand: <span className='search-brand'>{console.brand}</span></p>
                    <p className='search-release-title'>Release Year: <span className='search-year-released'>{console.year_released}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default SearchConsoleList;
