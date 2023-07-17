import carSchema from "../models/carSchema.js";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = path.resolve(__dirname, "../temp/");
    cb(null, destinationFolder); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "carImage" + ext); 
  },
});

const upload = multer({ storage: storage });

export const create = async (req, res) => {
  try {
    const { carMake, carModel, carModelYear, carPrice } = req.body;

    let carImage = ""; 

    if (req.file) {
 
      carImage = req.file.path; 
    }

    const newCar = new carSchema({
      carMake,
      carModel,
      carModelYear,
      carPrice,
      carImage,
    });

    const totalCars = await carSchema.countDocuments();
    const code = totalCars + 1;

    newCar.carCode = code;
    
    const savedCar = await newCar.save();
    
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await carSchema.find();
  
    const carsWithImageUrl = cars.map((car) => ({
      ...car._doc,
      carImage: `http://localhost:3000/${car.carImage}`,
    }));
    res.status(200).json(carsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carSchema.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    car.carImage = `http://localhost:3000/${car.carImage}`;
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const patchCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { carPrice } = req.body;
    const updatedCar = await carSchema.findByIdAndUpdate(
      id,
      { $set: { carPrice } },
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarByName = async (req, res) => {
  try {
    const { carModel } = req.query;
    const regex = new RegExp(carModel, 'i');

    let filteredCars = await carSchema.find({ carModel: regex });

    if (filteredCars.length === 0) {
      return res.status(404).json({ message: 'No matching cars found' });
    }

    res.status(200).json(filteredCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await carSchema.deleteOne({ _id: id });

    if (deletedCar.deletedCount === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

