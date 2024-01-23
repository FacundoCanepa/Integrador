import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const PORT = 8080;
const app = express();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});