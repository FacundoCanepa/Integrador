    import express from 'express';
    import { Socket } from 'socket.io';
    import productModel from '../model/products.model.js';
    import cartsModel from '../model/carts.model.js';

    const router = express.Router();
    
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get('/', async (req, res) => {
        try {
            const sort = { price: 'asc' };
            const limit = req.query.limit || 10 ;
            const page = req.query.page || 1 ;
            const productManager = await productModel.paginate({},{limit , page , sort });
            
            res.render("home", { productManager });

        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).json({ error: error.message });
        }
    });
    
    
    router.get('/realTimeProducts', async (req, res) => {
        res.render("realTimeProducts" , Socket.id)
    });
        
    router.get('/products', async (req, res) => {
        const sort = { price: 'asc' };
        const limit = req.query.limit || 10 ;
        const page = req.query.page || 1 ;
        const productManager = await productModel.paginate({},{limit , page , sort });
        res.render("products" , { productManager })
    });
           
    router.get('/carts/:id', async (req, res) => {
        try {
            const cartId = req.params.id;
            const cart = await cartsModel.findById(cartId).populate('productos.productoid');

            console.log(cart)
            
            res.render('carts', { cart });
        } catch (error) {
            console.error('Error al obtener el carts:', error);
            res.status(500).json({ error: error.message });
        }
    });

    export default router;
