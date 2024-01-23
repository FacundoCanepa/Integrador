
import express from 'express';
import { CartManager } from '../services/CartManager.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        const allCarts = await CartManager.getInstance().getAllCarts();
        res.json({ allCarts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const nuevoCart = await CartManager.getInstance().addCart();
        res.json( {  nuevoCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get ('/:cid', async (req , res)=>{
    try {
        const id = parseInt(req.params.cid);
        const cart =  await CartManager.getInstance().getCartById(id);
        res.json( { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        
        const result = await CartManager.getInstance().addProduct(cartId, productId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;