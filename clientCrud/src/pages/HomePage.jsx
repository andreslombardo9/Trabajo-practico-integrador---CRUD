import { Link } from "react-router-dom";
import CarForm from "../components/loadCar";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la página de carga de autos</h1>
      <Link to="/listCars">
        <button className="autos-button">Ver lista de autos</button>
      </Link>
      <CarForm />
     
    </div>
  );
}

export default HomePage;
