import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from "axios";
import '../style/ConsoleDetails.css'
import { useCart } from '../CartContext';
import baseUrl from "../api/api";

export default function ConsoleDetails ({ user_id }) {
    const { addToCart } = useCart();
    let { id } = useParams()
    const [consoles, setConsoles] = useState('')


    useEffect(() => {
        const getConsole = async () => {
            const response = await axios.get(`${baseUrl}/consoles/${id}`)
            setConsoles(response.data)
        }
        getConsole()

    }, [id])


    const handleAddToCart = () => {
        const newItem = { id: consoles._id, img: consoles?.img_path, name: consoles.name, price: consoles.price };
        addToCart(newItem);
        alert(`${consoles.name} x1 added to cart`);
      };


    return(
        <div className="console-details-page">
            <div className="promo-container">
                <h4 className="promo-text">Save 10% When You Buy $250+ In Store or Online</h4>
            </div>
            <div className="console-details-container">
                <div className="console-top-container">
                    <div className="console-image-container">
                        <img className='console-image' src={consoles.img_path} alt="" />
                    </div>
                    <div className="details-section">
                        <Link className="brand-name" to={'/brands/'+ consoles.brandId}>{consoles.brand}</Link>
                        <h2 className="console-name">{consoles.name}</h2>
                        <h2 className="console-price"> ${consoles.price}</h2>
                        <h3 className="console-release"> Release Year: <span className="year-released">{consoles.year_released}</span></h3>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
