    import express from 'express';
    import { ProductManager } from '../services/ProductManager.js';
    const router = express.Router();
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get('/', async (req, res) => {
        try {
            const productManager = await ProductManager.getInstance().getProducts();
            res.render("index", { productManager});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    router.get('/realtimeproducts', async (req, res) => {
    });
    
    export default router;
