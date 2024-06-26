import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Accessory.css";
import baseUrl from "../api/api";

export default function Accessory() {
  const [accessories, setAccessories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/accessories`);
        setAccessories(response.data);
      } catch (error) {
        console.error("Error fetching accessories: ", error);
      }
    };

    getAccessories();
  }, []);

  const showAccessoryDetails = (id) => {
    navigate(`/accessories/${id}`);
  };

  return (
    <div className="accessory-page-container">
      <h1>Accessories</h1>
      <div className="accessory-list">
        {accessories.map((accessory) => (
          <div
            key={accessory._id}
            className="accessory-item"
            onClick={() => showAccessoryDetails(accessory._id)}
          >
            <img
              className="accessory-img"
              src={accessory.image}
              alt={accessory.name}
            />
            <h3 className="accessory-name">{accessory.name}</h3>
            <p>{accessory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
