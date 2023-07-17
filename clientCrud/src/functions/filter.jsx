import React, { useState, useEffect } from "react";

const CarSearch = ({ carData, filterCars }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (carData) {
      const filteredCars = carData.filter((car) =>
        car.carModel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filterCars(filteredCars);
    }
  }, [searchTerm, carData]); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Buscar por nombre del auto"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      {loading ? (
        <p>Cargando resultados...</p>
      ) : searchTerm.trim() !== "" && carData?.length === 0 ? (
        <p>No se encontraron autos</p>
      ) : null}
    </div>
  );
};

export default CarSearch;

