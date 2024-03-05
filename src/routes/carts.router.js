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
        res.json( { nuevoCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get ('/:cid', async (req , res)=>{
    try {
        const id = req.params.cid;
        const cart =  await CartManager.getInstance().getCartById(id);
        res.json( { cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        console.log(quantity)
        const result = await CartManager.getInstance().addProductCart(cartId, productId, quantity);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid.toString();
        const productId = req.params.pid;
        const result = await CartManager.getInstance().deleteProduct(cartId, productId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body.products; 
        const result = await CartManager.getInstance().updateCart(cartId, products);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity; 

        const result = await CartManager.getInstance().updateProductQuantity(cartId, productId, quantity);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const result = await CartManager.getInstance().deleteAllProducts(cartId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;