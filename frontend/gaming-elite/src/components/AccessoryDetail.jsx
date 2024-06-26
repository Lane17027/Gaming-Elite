import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from "axios";
import '../style/AccessoryDetail.css'
import baseUrl from "../api/api";

import { useCart } from '../CartContext';

export default function AccessoryDetail ({ user_id }) {
    const { addToCart } = useCart();
    let { id } = useParams()
    const [accessories, setAccessories] = useState('')


    useEffect(() => {
        const getAccessories = async () => {
            const response = await axios.get(`${baseUrl}/accessories/${id}`)
            setAccessories(response.data)
        }
        getAccessories()

    }, [id])


    const handleAddToCart = () => {
        const newItem = { id: accessories._id, img: accessories.image, name: accessories.name, price: accessories.price };
        addToCart(newItem);
        alert(`${accessories.name} x1 added to cart`);
      };

      console.log(accessories)


    return(
        <div className="accessories-details-page">
            <div className="promo-container">
                <h4 className="promo-text">Save 10% When You Buy $250+ In Store or Online</h4>
            </div>
            <div className="accessories-details-container">
                <div className="accessories-top-container">
                    <div className="accessories-image-container">
                        <img className='accessories-image' src={accessories.image} alt="" />
                    </div>
                    <div className="accesories-details-section">
                        <h2 className="accessories-type"> {accessories.type}</h2>
                        <h2 className="accessories-name">{accessories.name}</h2>
                        <h2 className="accessories-price"> ${accessories.price}</h2>

                        <button className="accessory-add-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
