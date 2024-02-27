const socketClient = io();

socketClient.on("enviosdeproductos", (productos) => {
    const productList = document.getElementById("productList");
    if (productList) {
        productList.innerHTML = "";
        productos.forEach(producto => {
            const listItem = document.createElement("li");
            listItem.className = "liHome";
            listItem.innerHTML = `
                <h3>${producto.title}</h3>
                <p>ID: ${producto._id}</p>
                <p>Descripción: ${producto.description}</p>
                <p>Precio: ${producto.price}</p>
                <p>Stock: ${producto.stock}</p>
                <img src="${producto.thumbnails}">'
            `;
            productList.appendChild(listItem);
        });
    } else {
        console.error("El elemento con id 'productList' no se encontró en el documento.");
    }
});