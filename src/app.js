import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js"
import { Server } from 'socket.io';
import mongoose from "mongoose"

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js'
import socketProduct from './listeners/socketProducts.js';

const app = express();
const PORT = 8080;


const publicPath = `${__dirname}/public`;
app.use(express.static(publicPath));

//handlebars
app.engine("handlebars" , handlebars.engine({runtimeOptions:{allowProtoPropertiesByDefault: true}}))
app.set("views",__dirname + '/views')
app.set ('view engine' , "handlebars")

//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

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


mongoose.connect("mongodb+srv://facundocanepach:vlfhpZLBo7Nk4IE3@cluster0.9qtafny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conectado a la base de datos" )
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error)
    })
