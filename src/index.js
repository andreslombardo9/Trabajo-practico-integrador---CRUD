import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./db.js";
import carRoutes from './routes/crudOfCars.js'
import cors from 'cors';
import path from "path";
dotenv.config();
connectDB();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.json());
app.use('/api', carRoutes);
app.use("/temp", express.static(path.join(__dirname, "../temp")));

app.get("/", async (req, res) => {
    try {
      res.send("Bienvenido a la API de Autos");
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
  });

app.listen(port, () => console.log('Escuchando puerto:',port))

