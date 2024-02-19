import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js"
import { Server } from 'socket.io';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js'
import socketProduct from './listeners/socketProducts.js';

const app = express();
const PORT = 8080;


const publicPath = `${__dirname}/public`;
app.use(express.static(publicPath));

//handlebars
app.engine("handlebars" , handlebars.engine())
app.set("views",__dirname + '/views')
app.set ('view engine' , "handlebars")

//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

app.use(express.static(`${__dirname}/assets`));

const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Listening to the port http://localhost:${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProduct(socketServer)
