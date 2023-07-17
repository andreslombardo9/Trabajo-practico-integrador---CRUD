import React, { useState } from "react";
import "./loadCar.css";

const CarForm = () => {
  const [newCars, setNewCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [carData, setCarData] = useState({
    carMake: "",
    carModel: "",
    carModelYear: "",
    carPrice: "",
    carImage: null, 
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCarData({ ...carData, carImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("carMake", carData.carMake);
      formData.append("carModel", carData.carModel);
      formData.append("carModelYear", carData.carModelYear);
      formData.append("carPrice", carData.carPrice);
      formData.append("carImage", carData.carImage); 

      const response = await fetch("http://localhost:3000/api/cars", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        const newCarData = await response.json();
        setNewCars((prevCars) => [newCarData, ...prevCars]);
        setCarData({
          carMake: "",
          carModel: "",
          carModelYear: "",
          carPrice: "",
          carImage: null,
        });
        console.log("¡Auto creado con éxito!");
      } else {
        console.error("Error al crear el auto:", response.status);
      }
    } catch (error) {
      console.error("Error al crear el auto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form-container"
        encType="multipart/form-data"
      >
        <label>
          Marca del auto:
          <input
            type="text"
            name="carMake"
            value={carData.carMake}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Modelo del auto:
          <input
            type="text"
            name="carModel"
            value={carData.carModel}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Año del modelo del auto:
          <input
            type="number"
            name="carModelYear"
            value={carData.carModelYear}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Precio del auto:
          <input
            type="number"
            name="carPrice"
            value={carData.carPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen del auto:
          <input
            type="file"
            name="carImage" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <br />
        <button type="submit">Crear Auto</button>
      </form>
  
    </>
  );
};

export default CarForm;
