import fs from 'fs';
import { ProductManager } from './ProductManager.js';

export class CartManager {
    static _instance;

    constructor() {
        this.path = './src/data/carts.json';
    }

    static getInstance() {
        if (!CartManager._instance) {
            CartManager._instance = new CartManager();
        }
        return CartManager._instance;
    }

    async getAllCarts() {
        try {
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(array);
            return carts;
        } catch (error) {
            throw error;
        }
    }
    
    async addCart() {
        try {
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(array);
            const nuevoCart = {
                id: carts[carts.length - 1].id + 1,
                productos: []
            };
            carts.push(nuevoCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return nuevoCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(array);
            if (isNaN(id)) {
                throw new Error('El ID no es un number.');
            }
            id = parseInt(id);
            const cart = carts.find(cart => cart.id === id);
            if (!cart) {
                throw new Error(`El carrito ${id} no es valido`);
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cartId, productId) {
        try {
            if (isNaN(cartId) || isNaN(productId)) {
                throw new Error('Los ID de carrito y producto deben ser números válidos.');
            }
    
            const cart = await CartManager.getInstance().getCartById(cartId);
    
            if (!cart) {
                throw new Error(`El carrito ${cartId} es invalido`);
            }
    
            cart.productos = cart.productos || [];
    
            const existingProductIndex = cart.productos.findIndex(product => product.producto === productId);
    
            if (existingProductIndex !== -1) {
                cart.productos[existingProductIndex].quantity++;
            } else {
                const product = await ProductManager.getInstance().getProductById(productId);
    
                if (!product) {
                    throw new Error(`No se encontró el producto con ID ${productId}`);
                }
    
                cart.productos.push({
                    producto: productId,
                    quantity: 1
                });
            }
    
            const array = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(array);
    
            const existingCartIndex = carts.findIndex(existingCart => existingCart.id === cart.id);
    
            if (existingCartIndex !== -1) {
                carts[existingCartIndex] = cart;
            } else {
                throw new Error(`No se encontró el carrito con ID ${cart.id}`);
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
    
            return cart ;
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw error; 
        }
    }
    
    
    
    
}