import { ProductManager } from "../services/ProductManager.js";

const socketProduct = async (socketServer) => {
    socketServer.on("connection", async (socket) => {
        const productManager = ProductManager.getInstance();
        const listaProduct = await productManager.getProducts();
        console.log("Usuario conectado", socket.id);
        socket.emit("enviosdeproductos", listaProduct);

        // Escuchar evento para agregar un nuevo producto
        socket.on("addProduct", async (newProduct) => {
            try {
                const producto = await productManager.addProduct(newProduct);
                listaProduct.push(producto);
                socketServer.emit("enviosdeproductos", listaProduct);
            } catch (error) {
                console.error(error);
            }
        });

        // Escuchar evento para eliminar un producto
        socket.on("deleteProduct", async (productId) => {
            try {
                await productManager.deleteProduct(productId); // Eliminar el producto
                const listaProduct = await productManager.getProducts(); // Obtener la lista actualizada de productos
                socketServer.emit("enviosdeproductos", listaProduct); // Emitir la lista actualizada de productos
            } catch (error) {
                console.error(error);
            }
        });
    });
};

export default socketProduct;
