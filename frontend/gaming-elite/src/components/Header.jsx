import Nav from "./Nav";
import { useState ,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from "../api/api";



const Header = ({  loggedIn, username, setLoggedIn, setGames, setConsoles }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('game');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        // Update search term as user types

    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setGames([])
        setConsoles([])
        executeSearch()
        setShowSearchResults(true);
        navigate('/searchResults');
        setSearchTerm('')

    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSignOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('loggedIn');

    };

        function executeSearch () {
            let url = '';
            if (searchType === 'games') {
                url = `${baseUrl}/games/search?search=${searchTerm}`;
            } else if (searchType === 'consoles') {
                url = `${baseUrl}/consoles/search?search=${searchTerm}`;
            }
            console.log(url)

            axios.get(url)
                .then(response => {
                    if (searchType === 'games') {
                        setGames(response.data || []);
                    } else if (searchType === 'consoles') {
                        setConsoles(response.data || []);
                    }
                })
                .catch(error => console.error('Error fetching data: ', error));
        }


    return (
        <div className="header">
            <div className="title-and-buttons">
                <Link to="/" className="title">
                    <h1 className="gaming-elite">Gaming Elite</h1>
                </Link>
                <div className="search-bar-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search games, consoles, and more" />
                        <select onChange={handleSearchTypeChange}>
                            <option>Choose Type</option>
                            <option value="games">Game</option>
                            <option value="consoles">Console</option>
                        </select>
                        <button className="search-button" type="submit">Search</button>
                    </form>
                </div>
                <div className="top-right-buttons">
                    {loggedIn ? (
                        <div>
                            <span className="welcome-message">Welcome, {username}</span>
                            <button type="button" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    ) : (
                        <Link to="/signup" className="signup-container">
                            <img className="signup-icon"
                                src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                                alt="login_img" />
                        </Link>
                    )}
                    <Link to="/cart" className="cart-container">
                        <img className="cart-icon"
                            src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
                            alt="Shopping_Cart"/>
                    </Link>
                </div>
            </div>
            <div className="navbar">
                <Nav />
            </div>
        </div>
    );
}

export default Header;
