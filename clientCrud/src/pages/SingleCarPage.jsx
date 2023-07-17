import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleCarPage.css";

function SingleCar() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingPrice, setIsEditingPrice] = useState(false); 
  const [newPrice, setNewPrice] = useState(""); 

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cars/${id}`);
        const data = await response.json();
        setCarData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [id]);

  const handlePriceUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carPrice: newPrice }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const updatedCarData = { ...carData, carPrice: newPrice };
      setCarData(updatedCarData);
      setIsEditingPrice(false);
    } catch (error) {
      console.error("Error updating car price:", error);
    }
  };

  if (isLoading) {
    return <p>Cargando datos del auto...</p>;
  }

  if (!carData) {
    return <p>No se encontraron datos del auto</p>;
  }

  return (
    <div className="details-container">
      <div>
        <h3>Marca: {carData.carMake}</h3>
        <p>Modelo: {carData.carModel}</p>
        <img src={carData.carImage} alt="Car" />
        <p>Año: {carData.carModelYear}</p>
        {isEditingPrice ? (
          <>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button onClick={handlePriceUpdate}>Guardar</button>
            <button onClick={() => setIsEditingPrice(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <p>Precio: $ {carData.carPrice}</p>
            <button onClick={() => setIsEditingPrice(true)}>Modificar Precio</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleCar;
