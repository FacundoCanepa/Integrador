    import express from 'express';
    import { ProductManager } from '../services/ProductManager.js';
    import { Socket } from 'socket.io';

    const router = express.Router();
    
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get('/', async (req, res) => {
        try {
            const productManager = await ProductManager.getInstance().getProducts();
            res.render("home", { productManager }); 
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).json({ error: error.message });
        }
    });
    
    
    router.get('/realTimeProducts', async (req, res) => {
        res.render("realTimeProducts" , Socket.id)
    });
    
    export default router;
