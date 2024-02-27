    import express from 'express';
    import { ProductManager } from '../services/ProductManager.js';
    import { Socket } from 'socket.io';
import productModel from '../model/products.model.js';

    const router = express.Router();
    
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get('/', async (req, res) => {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;
            limit = parseInt(limit);
            page = parseInt(page);
    
            let options = {
                limit,
                page,
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
            };
    
            let filter = query ? { category: query } : {};
    
            const productManager = await productModel.paginate();
            
            console.log(productManager)

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
