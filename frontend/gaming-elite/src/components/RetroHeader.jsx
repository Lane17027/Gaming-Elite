import Nav from "./Nav"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from '../style/RetroHeader.module.css'
import baseUrl from "../api/api";

const RetroHeader = ({ setSearchTerm, setSearchType, loggedIn, username, setLoggedIn, title }) => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleChange = (event) => {
        setSearch(event.target.value)
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSearchTerm(search)
        navigate('/searchResults')
    }

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value)
    }

    const handleSignOut = () => {
        setLoggedIn(false)
        localStorage.removeItem('loggedIn')

    }

    return (
      <div className={styles.header}>
        <div className={styles.titleAndButtons}>
            <Link to="/" className={styles.title}>
              <h1 className={styles.gamingElite}>Gaming Elite</h1>
            </Link>
          <div className={styles.searchBarContainer}>
            <form onSubmit={handleSubmit}>
              <input type="text" value={search} onChange={handleChange} placeholder="Search games, consoles, and more" />
              <select onChange={handleSearchTypeChange}>
                <option>Type</option>
                <option value="games">Game</option>
                <option value="consoles">Console</option>
              </select>
              <button className={styles.searchButton} type="submit">Search</button>
            </form>
          </div>
          <div className={styles.topRightButtons}>
            {loggedIn ? (
              <div>
                  <span style={{ color: 'red' }}>Welcome, {username}</span>
                  <button type="button" onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <Link to="/signup" className={styles.signupContainer}>
                  <img className={styles.signupIcon}
                      src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
                      alt="login_img" />
              </Link>
            )}
            <Link to="/cart" className={styles.cartContainer}>
                <img className={styles.cartIcon}
                    src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
                    alt="Shopping_Cart"/>
            </Link>
          </div>
        </div>
        <div className={styles.navbar}>
            <Nav />
        </div>
      </div>
  )
}

export default RetroHeader
