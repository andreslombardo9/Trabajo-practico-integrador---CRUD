export const deleteCar = async (carId, carData, setCarData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
        method: "DELETE",
      });
      if (response.ok) {    
        const updatedData = carData.filter((car) => car._id !== carId);
        setCarData(updatedData);
      } else {
        console.error("Error deleting car:", response.status);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
