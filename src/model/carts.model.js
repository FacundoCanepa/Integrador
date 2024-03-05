import mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = "Carts"; 

const cartsSchema = new mongoose.Schema({
    productos: [{
        productoid: { type: Schema.Types.ObjectId, ref: 'productos' , required: true },
        quantity: { type: Number, default: 1 , required: true} 
    }]
});

cartsSchema.plugin(mongoosePaginate);

const cartsModel = mongoose.model(cartsCollection, cartsSchema); 

export default cartsModel;
