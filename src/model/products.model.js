import mongoose from "mongoose";

const productCollection = "productos"; 

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    code: { type: String, required: true },
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true },
    status: { type: Boolean, required: true},
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], required: true }
});

const productModel = mongoose.model(productCollection, productSchema); 

export default productModel;
