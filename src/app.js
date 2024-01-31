import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js'
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import { Server } from 'socket.io';

const PORT = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);
app.use(express.static(path.join(__dirname,'/public')))


app.engine("handlebars" , handlebars.engine())
app.set("views",__dirname + '/views')
app.set ('view engine' , "handlebars")



const httpServer = app.listen(PORT, () => 
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
);

const socketServer = new Server(httpServer);

