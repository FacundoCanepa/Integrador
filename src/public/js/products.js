const socketClient = io();

const addproduct = document.getElementById("addproduct")

addproduct.addEventListener("click" , async (event)=>{
    event.preventDefault()
    const quantityInput = document.getElementById("quantity");
    const quantityValue = quantityInput.value
    const productId = event.target.getAttribute('data-productId');
    socketClient.emit("addProductCart" , productId , quantityValue)
})