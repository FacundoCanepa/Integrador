import express from 'express';
import { ProductManager } from '../services/ProductManager.js';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await ProductManager.getInstance().getProducts(limit);
        res.json({ productos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await ProductManager.getInstance().getProductById(id);
        res.json({ producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        let nuevoProducto = req.body;
        nuevoProducto = await ProductManager.getInstance().addProduct(nuevoProducto);
        res.json({ nuevoProducto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        let updatedProduct = req.body;
        updatedProduct = await ProductManager.getInstance().updateProduct(id, updatedProduct);
        res.json({ updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        await ProductManager.getInstance().deleteProduct(id);
        res.json({  Delete: `El producto con id : ${id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


);

export default router;