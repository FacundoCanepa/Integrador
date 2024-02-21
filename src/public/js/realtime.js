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
        listItem.className = "liHome" ;
        listItem.innerHTML = `
            <h3>${producto.title}</h3>
            <p>ID: ${producto.id}</p>
            <p>Descripción: ${producto.description}</p>
            <p>Precio: ${producto.price}</p>
            <p>Stock: ${producto.stock}</p>
            <img src="${producto.thumbnails}">
        `;
        productList.appendChild(listItem);
    });
});

const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const thumbnails = document.getElementById("thumbnails").value;
    const newProduct = {
        title: title,
        description: description,
        price: price,
        stock: stock,
        category: category,
        thumbnails: thumbnails,
    };
    console.log(newProduct);
    socketClient.emit("addProduct", newProduct);
});


const deleteProductForm = document.getElementById("deleteProductForm");

deleteProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();     
    const productId = document.getElementById("productId").value;
    socketClient.emit("deleteProduct", productId);
});

socketClient.on("deleteProductError", (errorMessage) => {
    const deleteIDElement = document.getElementById("deleteID");
    deleteIDElement.textContent = errorMessage;
});
