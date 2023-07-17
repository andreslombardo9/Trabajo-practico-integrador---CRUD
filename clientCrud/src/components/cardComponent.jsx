import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CardComponent.css";
import { deleteCar } from "../functions/delete";
import CarSearch from "../functions/filter";

function CardComponent() {
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars");
        const data = await response.json();
        setCarData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);


  const filterCars = (filteredData) => {
    setFilteredData(filteredData);
  };

  return (
    <div>
      <CarSearch carData={carData} filterCars={filterCars} />
      <div className="card-container">
        {isLoading ? (
          <p>Cargando datos de los autos...</p>
        ) : (filteredData || carData).length === 0 ? (
          <p>No hay autos cargados</p>
        ) : (filteredData || carData).map((car) => (
          <div className="car-card" key={car._id}>
            <img src={car.carImage} alt="Car" />
            <h2>Marca: {car.carMake}</h2>
            <p>Modelo: {car.carModel}</p>
            <p>Año: {car.carModelYear}</p>
            <p>Precio: $ {car.carPrice}</p>
            <div className="buttons-container">
              <Link to={`/cars/${car._id}`} className="details">
                Ver detalles
              </Link>
              <button onClick={() => deleteCar(car._id, carData, setCarData)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardComponent;

