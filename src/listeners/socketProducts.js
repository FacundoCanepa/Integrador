import { ProductManager } from "../services/ProductManager.js";

const socketProduct = async (socketServer) => {

    socketServer.on("connection", async (socket) => {
        const productManager = ProductManager.getInstance();

        const listaProduct = await productManager.getProducts();
        console.log("Usuario conectado", socket.id);

        socket.emit("enviosdeproductos", listaProduct);
        
        socket.on("addProduct", async (newProduct) => {
            try {
                const producto = {
                    ...newProduct 
                };
                await productManager.addProduct(producto);
                
                const listaProductActualizada = await productManager.getProducts();
                socketServer.emit("enviosdeproductos", listaProductActualizada);
            } catch (error) {
                console.error(error);
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                await productManager.deleteProduct(id);
                const listaProduct = await productManager.getProducts(); 
                socketServer.emit("enviosdeproductos", listaProduct); 
            } catch (error) {
                socket.emit("deleteProductError", error.message); 
            }
        });

        socket.on("updateProduct", async (updatedProductData) => {
            try {
                const { id, updatedFields } = updatedProductData;
                await productManager.updateProduct(id, updatedFields);
                const listaProduct = await productManager.getProducts(); 
                socketServer.emit("enviosdeproductos", listaProduct); 
            } catch (error) {
                console.error(error);
            }
        });
    });
};

export default socketProduct;
