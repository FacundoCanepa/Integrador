import fs from 'fs';

export class ProductManager {
    static _instance;

    constructor() {
        this.path = './src/data/products.json';
    }

    static getInstance() {
        if (!ProductManager._instance) {
            ProductManager._instance = new ProductManager();
        }
        return ProductManager._instance;
    }

    async getProducts(limit) {
        try {
            const response = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(response);

            if (limit !== undefined) {
                if (isNaN(limit) || limit <= 0) {
                    throw new Error("El valor de 'limit' debe ser un número positivo.");
                }
                return productos.slice(0, limit );
            }
            return productos;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            if (isNaN(id)) {
                throw new Error("El id debe ser un número .");
            }
            if(id <= 0){
                throw new Error("El id debe ser un número positivo .");
            }
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(array);
            const producto = productos.find(product => product.id === id);
            if (!producto) {
                throw new Error(`el id: ${id} es inexistente.`);
            }
            return producto;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(array);
            if (!newProduct.title || !newProduct.description  || !newProduct.price ||  !newProduct.     stock ) {
                throw new Error('Datos incompletos .');
            }
            if (typeof newProduct.status === 'undefined') {
                newProduct.status = true;
            }

            if (newProduct.id !== undefined) {
                throw new Error('No se permite proporcionar un ID desde body .');
            }

            const lastProduct = productos[productos.length - 1];
            const nextId = lastProduct ? lastProduct.id + 1 : 1;
            const nextCode = `P${nextId.toString().padStart(3, '0')}`;
            const producto = {
                id: nextId,
                code: nextCode,
                ...newProduct
            };

            productos.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null,'\t'));
            return producto;
        } catch (error) {
            throw error;
        }
    }
    
    async updateProduct(id, updatedFields) {
        try {

            if (Object.keys(updatedFields).length === 0) {
                throw new Error('Ningun campos fue actualizado.');
            }

            const array = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(array);
    
            const producto = productos.findIndex(product => product.id === id);
            if (producto === -1) {
                throw new Error(`No se encontró el producto con id ${id}`);
            }
    
            if (updatedFields.code && updatedFields.code !== productos[producto].code) {
                throw new Error(`No se permite actualizar el CODE del producto.`);
            }
    
            if (updatedFields.id && updatedFields.id !== productos[producto].id) {
                throw new Error(`No se permite actualizar el ID del producto.`);
            }
    
            const productoActualizado = {
                ...productos[producto],
                ...updatedFields
            };
    
            productos [producto] = productoActualizado;
    
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
    
            return productoActualizado;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const array= await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(array);

            if (isNaN(id) || id <= 0) {
                throw new Error(`ID inválido`);
            }
            const idProducto = productos.findIndex(product => product.id === id);
            if (idProducto === -1) {
                throw new Error(`No se encontró el producto con id ${id}`);
            }
            
            productos.splice(idProducto, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}  
