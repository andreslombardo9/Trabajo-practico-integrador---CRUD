import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardComponent from "./components/cardComponent";
import { CarProvider } from "./context/CarContext";
import SingleCar from "./pages/SingleCarPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <CarProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listCars" element={<CardComponent />} />
          <Route path="/cars/:id" element={<SingleCar />} /> 
        </Routes>
      </CarProvider>
    </BrowserRouter>
  );
}

export default App;

