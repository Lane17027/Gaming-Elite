import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { useCart } from '../CartContext'
import axios from "axios"
import RetroHeader from "./RetroHeader"
import RetroFooter from './RetroFooter'
import styles from '../style/RetroGameDetails.module.css'
import baseUrl from "../api/api";

export default function RetroGameDetails () {

  let { id } = useParams()
  const [game, setGame] = useState('')
  const location = useLocation()
  const { addToCart } = useCart()

  useEffect(() => {
    const getGame = async () => {
        const response = await axios.get(`${baseUrl}/games/${id}`)
        setGame(response.data)
        console.log(response.data)
    }
    getGame()
}, [id])

const renderLogos = () => {
    if (!game.consoleId || game.consoleId.length === 0) return null

    return (
    <div className={styles.centeredContainer}>
        <div className={styles.logoContainer}>
            {game.consoleId.map(id => {
                switch(id) {
                    case '65ee24dce1aef071e5d7668f':
                        return (
                            <div key={id}>
                                <img className={styles.pcLogo} src='https://anlucas.neocities.org/win98_89.gif' alt="Windows 98" />
                                <img className={styles.pcLogoApple} src='https://anlucas.neocities.org/apple.gif' alt="Apple" />
                            </div>
                        )
                    case '65eb6b07c8b65edfb58066e3':
                        return <img className={styles.playstation} key={id} src='https://cdn.iphoneincanada.ca/wp-content/uploads/2019/04/PlayStation-Logo.png' alt="PlayStation" />
                    case '65ee2bd3c6a5308ebee04e2e':
                        return <img className={styles.nintendo} key={id} src='https://cdn.optipic.io/site-105077/media/com_eshop/categories/resized/NES%20Logo-210x145.png' alt="Nintendo" />
                    case '65f05f9bc0643c7f97323f3b':
                        return <img className={styles.atari} key={id} src='https://logoblink.com/static/85f986d0cdd759a866810b5829d9c91c/b0544/atari-logo.webp' alt="Atari" />
                    case '65f2f88aa13bd3d29057019f':
                        return <img className={styles.sega} key={id} src='https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/02/Sega-Genesis-Logo.jpg' alt="Sega Genesis" />
                    case '65f2fa56a13bd3d2905701a1':
                        return <img className={styles.superNintendo} key={id} src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SNES_logo.svg/296px-SNES_logo.svg.png' alt="Super Nintendo" />
                    case '65f2f99ca13bd3d2905701a0':
                        return <img className={styles.nintendo64} key={id} src='https://logowik.com/content/uploads/images/n64-nintendo-642475.jpg' alt="Nintendo64" />

                    default:
                        return null
                }
            })}
        </div>
    </div>
    )
}

const handleAddToCart = () => {
    const newItem = { id: game._id, img: game?.img_path, name: game.title, price: game.price, }
    addToCart(newItem)
    alert(`${game.title} x1 added to cart`)
}

return(
    <body className={styles.retroGameDetailsBody}>
        <div className={styles.retroDetailsCard}>
            {location.pathname.startsWith("/retro/") && <RetroHeader />}
            <h1 className={styles.retroGameTitle}>{game.title}</h1>
            <img className={styles.gameCover} src={game.img_path} alt="" />
            {renderLogos()}
            <h3 className={styles.retroYear}> Release Year: {game.year_released}</h3>
            <h3 className={styles.retroGenre}> Genres {game.genre}</h3>
            <img className={styles.ratingImg} src={game.rating_img} alt=''/>
            <h2 className={styles.retroPrice}> ${game.price}</h2>
            <h2 className={styles.retroGameDescription}> Description {game.description}</h2>
            <h3 className={styles.retroNumberOfPlayers}> Number of Players: {game.number_of_players}</h3>
            <h3 className={styles.retroOnline}> Online capabilities: {game.online}</h3>
            <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
            <Link className={styles.returnLink} to="/retro"> Pixelate! </Link>

        </div>
            <div className={styles.retroGameFooter}>
            {location.pathname.startsWith("/retro/") && <RetroFooter />}
            </div>
    </body>
)
}
