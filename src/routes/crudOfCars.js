import { Router } from "express";
import { create, deleteCar, getCar, getCarByName, getCars,patchCar } from "../controllers/controllers.js";
import multer from "multer";

const router = Router();

//Obtener todos los autos
router.get("/cars", getCars);

//Obtener un auto en especifico
router.get("/cars/:id", getCar);

//Obtener auto por su nombre
//URL: http://localhost:3000/api/search?carModel=(nombredelmodelo)
router.get("/search",getCarByName);

//Crear auto
const upload = multer({ dest: "temp/" });

router.post("/cars", upload.single("carImage"), create);

//Actualizar precio de un auto
router.patch("/cars/:id",patchCar);

//Borrar un auto
router.delete("/cars/:id",deleteCar);

export default router;