import productModel from '../model/products.model.js';

export class ProductManager {
    static _instance;

    constructor() {}

    static getInstance() {
        if (!ProductManager._instance) {
            ProductManager._instance = new ProductManager();
        }
        return ProductManager._instance;
    }

    async getProducts(limit) {
        try {
            const productos = await productModel.find().limit(limit ? parseInt(limit) : undefined);
            return productos;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const producto = await productModel.findOne({ _id: id });
            if (!producto) {
                throw new Error(`El producto con id ${id} no fue encontrado.`);
            }
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            newProduct.code = await generateUniqueCode();

            newProduct.status = true;
            
            const producto = await productModel.create(newProduct);
            return producto;
        } catch (error) {
            throw error;
        }
    }
    
    async updateProduct(id, updatedFields) {
        try {
            const updatedProduct = await productModel.findOneAndUpdate(
                { _id: id }, 
                { $set: updatedFields }, 
                { new: true } 
            );
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteProduct(id) {
        try {
            const productoEliminado = await productModel.findOneAndDelete({ _id: id });
            if (!productoEliminado) {
                throw new Error(`No se encontró el producto con id ${id}.`);
            }
        } catch (error) {
            throw error;
        }
    }
}
  
        function generateUniqueCode() {
        let code = '';
        while (code.length < 9) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
    }
    