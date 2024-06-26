import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { useCart } from '../CartContext'
import axios from "axios";
import RetroHeader from "./RetroHeader"
import RetroFooter from './RetroFooter'
import styles from '../style/RetroGameDetails.module.css'
import baseUrl from "../api/api";

export default function RetroConsoleDetails () {

  let { id } = useParams()
    const [console, setConsole] = useState('')
    const location = useLocation()
    const { addToCart } = useCart()

    useEffect(() => {
        const getConsole = async () => {
            const response = await axios.get(`${baseUrl}/consoles/${id}`)
            setConsole(response.data)
        }
        getConsole()
    }, [id])

    const handleAddToCart = () => {
        const newItem = { id: console._id, img: console?.img_path, name: console.name, price: console.price, }
        addToCart(newItem)
        alert(`${console.title} x1 added to cart`)
    }


    return(
    <body className={styles.retroConsoleDetailsBody}>
        <div className={styles.retroConsoleDetailsCard}>
            {location.pathname.startsWith("/retro/") && <RetroHeader />}
            <h1>{console.name}</h1>
            <img className={styles.consolesCover} src={console.img_path} alt="" />
            <h3 className={styles.retroConsoleYear}> Release Year: {console.year_released}</h3>
            <h3 className={styles.retroBrandConsoles}> Brand {console.brand}</h3>
            <h2 className={styles.retroConsolePrice}> ${console.price}</h2>
            <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
            <Link className={styles.returnLink} to='/retro'> Pixelate! </Link>
        </div>
        <div className={styles.retroGameFooter}>
            {location.pathname.startsWith("/retro/") && <RetroFooter />}
            </div>
    </body>
    )
}
