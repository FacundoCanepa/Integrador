import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js"
import { Server } from 'socket.io';
import { connect } from 'mongoose';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport, { Passport } from 'passport';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js'
import socketProduct from './listeners/socketProducts.js';
import userRouter from './routes/user.router.js'
import initializePassport from './config/passport.config.js'


const app = express();
const PORT = 8080;


const publicPath = `${__dirname}/public`;
app.use(express.static(publicPath));

//handlebars
app.engine("handlebars", handlebars.engine({ runtimeOptions: { allowProtoPropertiesByDefault: true } }))
app.set("views", __dirname + '/views')
app.set('view engine', "handlebars")

//rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/user', userRouter)
app.use('/', viewRouter);
app.use(cookieParser("myParser"));

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://facundocanepach:vlfhpZLBo7Nk4IE3@cluster0.9qtafny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            ttl: 1000,
        }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize())
app.use(passport.session())
initializePassport()

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port http://localhost:${PORT}`);
        connectDb();
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProduct(socketServer)

const connectDb = async () => {
    try {
        await connect("mongodb+srv://facundocanepach:vlfhpZLBo7Nk4IE3@cluster0.9qtafny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Base de datos conectada");
    } catch (err) {
        console.log(err);
    }
};


