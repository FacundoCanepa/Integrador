const socketClient = io();

socketClient.on("connect", () => {
    const socketId = socketClient.id;
    document.getElementById("connectedUser").innerText = `Usuario Conectado: ${socketId}`;
    socketClient.emit("getInitialProducts");
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

socketClient.on("enviosdeproductos", (productos) => {
    const productList = productos;
    const selectElement = document.getElementById("editProductId");
    selectElement.innerHTML = "";
    productList.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto._id;
        option.textContent = producto.title;
        selectElement.appendChild(option);
    });
});

const editProductForm = document.getElementById("editProductForm");

editProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productId = document.getElementById("editProductId").value;
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const price = document.getElementById("editPrice").value;
    const stock = document.getElementById("editStock").value;
    const category = document.getElementById("editCategory").value;
    const thumbnails = document.getElementById("editThumbnails").value;

    const updatedProduct = {};

    if (title.trim() !== '') updatedProduct.title = title;
    if (description.trim() !== '') updatedProduct.description = description;
    if (price.trim() !== '') updatedProduct.price = price;
    if (stock.trim() !== '') updatedProduct.stock = stock;
    if (category.trim() !== '') updatedProduct.category = category;
    if (thumbnails.trim() !== '') updatedProduct.thumbnails = thumbnails;

    updatedProduct.status = true;

    socketClient.emit("updateProduct", { id: productId, updatedFields: updatedProduct });

});