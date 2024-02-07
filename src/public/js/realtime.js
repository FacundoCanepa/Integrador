const socketClient = io();
socketClient.on("connect", () => {
    const socketId = socketClient.id;
    document.getElementById("connectedUser").innerText = `Usuario Conectado: ${socketId}`;
    socketClient.emit("getInitialProducts");
});

socketClient.on("enviosdeproductos", (productos) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    productos.forEach(producto => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${producto.title}</h3>
            <p>ID: ${producto.id}</p>
            <p>Descripción: ${producto.description}</p>
            <p>Precio: ${producto.price}</p>
            <p>Stock: ${producto.stock}</p>
        `;
        productList.appendChild(listItem);
    });
});
