/* user modeling */
import { Schema, model } from 'mongoose';
const carSchema = new Schema(
    {
        carMake: {
            type: String,
            required: true
        },
        carModel: {
            type: String,
            required: true,
        },
        carModelYear: {
            type: Number,
            required: true
        },
        carPrice:{
            type:Number,
            required:true
        },
        carImage: {
            type: String, 
          },
    }
);
export default model('Cars', carSchema);