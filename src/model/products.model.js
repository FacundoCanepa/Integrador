import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "productos"; 

const productSchema = new mongoose.Schema({
    id: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true },
    status: { type: Boolean, required: true},
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], required: true }
});


productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema); 

export default productModel;
