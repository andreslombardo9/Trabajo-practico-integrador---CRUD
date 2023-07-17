import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://AndresLombardo:contracluster@cluster0.8pykkjk.mongodb.net/');
    console.log(">>>> DB is connected");
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectar a la base de datos");
  }
};