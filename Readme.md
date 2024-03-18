<h1 align="left">Proyecto de coder house</h1>

###

<h4 align="left">Programación Backend</h4>

###

<h2 align="left">Descripción del Proyecto</h2>

###

<p align="left">El proyecto  es una aplicación web diseñada para ayudar a gestionar un negocio de pastas caseras. Este sistema proporciona herramientas para administrar productos, carritos de compra y realizar pedidos de manera eficiente.</p>

###

<h3 align="left">Características Principales</h3>

###

<p align="left">Gestión de Productos: Permite agregar, actualizar y eliminar productos del catálogo. Cada producto puede tener información detallada como nombre, descripción, precio, stock y categoría.<br><br>Carritos de Compra: Los clientes pueden crear y gestionar carritos de compra donde pueden agregar productos para realizar pedidos. El sistema proporciona funcionalidades para agregar, eliminar y actualizar la cantidad de productos en el carrito.<br><br>Pedidos: Permite a los clientes realizar pedidos basados en los productos agregados a su carrito de compra. Los pedidos pueden ser gestionados por el personal del negocio para su preparación y entrega.<br><br>Paginación y Ordenamiento: El sistema proporciona funcionalidades de paginación y ordenamiento para una mejor navegación y organización de los productos disponibles.</p>

###

<h3 align="left">Tecnologías Utilizadas</h3>

###

<p align="left">Express.js: Un marco de aplicación web para Node.js que facilita la creación de API y aplicaciones web.<br><br>Express Handlebars: Un motor de plantillas para Express que simplifica la creación de vistas HTML dinámicas.<br><br>MongoDB: Una base de datos NoSQL utilizada para almacenar los datos del negocio, como productos, carritos y pedidos.<br><br>Mongoose: Una biblioteca de modelado de objetos MongoDB para Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación.<br><br>Mongoose Paginate V2: Una extensión de paginación para Mongoose que facilita la implementación de la paginación en las consultas de la base de datos.<br><br>Socket.IO: Una biblioteca que permite la comunicación bidireccional en tiempo real entre clientes web y servidores. Se utiliza para actualizar automáticamente la información del carrito y otros eventos en tiempo real.</p>

###

<h3 align="left">Dependencias</h3>

###

<p align="left">Express: ^4.18.2<br>Express Handlebars: ^7.1.2<br>Mongoose: ^8.1.3<br>Mongoose Paginate V2: ^1.8.0<br>Nodemon: ^3.0.3<br>Socket.IO: ^4.7.4</p>

###

<h3 align="left">EndPoint's</h3>

###

<h4 align="left">--Metodo GET</h4>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/Fs5k7LbN/product.png"  />
</div>

###

<p align="left">El endpoint GET /api/products devuelve una lista de productos disponibles en el catálogo del negocio de pastas. Esta lista incluye detalles sobre cada producto, como su identificador único (_id), código, título, descripción, precio, disponibilidad en stock, categoría y una URL de imagen en miniatura , la respuesta incluye información sobre la paginación.Esta puede ser modificada mediantes params</p>

###

<p align="left"></p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/QC0LG5h1/paginate.png"  />
</div>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/LsnjzMJp/prodcutid.png"  />
</div>

###

<p align="left">El endpoint GET /api/products/:id devuelve los detalles de un producto específico en el catálogo.</p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/X7YKVFnq/Carts.png"  />
</div>

###

<p align="left">GET /api/carts devuelve una lista de todos los carritos disponibles en el sistema. Cada objeto en la lista contiene el identificador único (_id) del carrito y una lista de productos en el carrito. Para cada producto, se incluye el identificador único del producto (productId) y la cantidad de ese producto en el carrito.</p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/8CLwF6sv/CartId.png"  />
</div>

###

<p align="left">GET /api/carts/:id se encarga de devolver únicamente el carrito correspondiente al identificador proporcionado (:id). Este</p>

###

<h3 align="left">--Metodo POST</h3>

###

<div align="center">
  <img height="600" src="https://i.postimg.cc/wBX6vwzd/putproduct.png"  />
</div>

###

<p align="left">POST /api/products se encarga de agregar un nuevo producto .Este método espera recibir los detalles del producto a agregar a través del cuerpo de la solicitud (req.body).</p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/t4fKjWVG/cartpost.png"  />
</div>

###

<p align="left">POST /api/carts se encarga de crear un nuevo carrito en el sistema, sin incluir ningún producto en él inicialmente.</p>

###

<div align="center">
  <img height="150" src="https://i.postimg.cc/v8Vpd3rY/cartpost2.png"  />
</div>

###

<p align="left">POST /api/carts/:cartId/products/:productId se encarga de agregar un producto específico (:productId) al carrito identificado por :cartId. Además, este endpoint permite opcionalmente especificar la cantidad del producto a través del cuerpo de la solicitud (req.body). Al enviar una solicitud POST a este endpoint, se agrega el producto deseado al carrito especificado y se actualiza la cantidad si se proporciona en el cuerpo de la solicitud. Este endpoint devuelve una respuesta con los detalles actualizados del carrito, incluyendo la lista actualizada de productos en el carrito y sus respectivas cantidades.</p>

###

<h3 align="left">--Metodo put</h3>

###

<div align="center">
  <img height="300" src="https://i.postimg.cc/qMkqhhM3/putproductox.png"  />
</div>

###

<p align="left">PUT /api/products/:id se encarga de actualizar un producto específico . Al enviar una solicitud PUT a este endpoint con el identificador único del producto (:id) y los nuevos detalles en el cuerpo de la solicitud, el producto correspondiente se actualiza en la base de datos con la nueva información proporcionada. Luego de la actualización, se devuelve una respuesta indicando el éxito de la operación y los detalles actualizados del producto.</p>

###

<div align="center">
  <img height="250" src="https://i.postimg.cc/02DNBYWF/cartput.png"  />
</div>

###

<p align="left">PUT /api/carts/:cartId se encarga de actualizar el carrito identificado por :cartId. Al enviar una solicitud PUT a este endpoint y proporcionar los nuevos detalles del carrito a través del cuerpo de la solicitud (req.body), el carrito correspondiente se actualiza en la base de datos con la información proporcionada.</p>

###

<div align="center">
  <img height="180" src="https://i.postimg.cc/k5fGy715/Putquaintii.png"  />
</div>

###

<p align="left">PUT /api/carts/:cartId/products/:productId se encarga de actualizar la cantidad del producto específico (:productId) que está dentro del carrito identificado por :cartId. Al enviar una solicitud PUT a este endpoint y proporcionar el nuevo valor de cantidad a través del cuerpo de la solicitud (req.body), la cantidad del producto en el carrito se actualiza en la base de datos con la cantidad proporcionada.</p>

###

<p align="left">--Metodo delete</p>

###

<div align="center">
  <img height="125" src="https://i.postimg.cc/26Lwp9Bn/Deletproduct.png"  />
</div>

###

<p align="left">DELETE /api/products/:id se encarga de eliminar el producto con el identificador único proporcionado (:id). Al enviar una solicitud DELETE a este endpoint con el identificador del producto que se desea eliminar, el producto correspondiente se elimina de la base de datos.</p>

###

<div align="center">
  <img height="125" src="https://i.postimg.cc/kXLwsm6q/Delteproductcart.png"  />
</div>

###

<p align="left">DELETE /api/carts/:cartId/products/:productId se utiliza para eliminar un producto específico de un carrito determinado. Al realizar una solicitud DELETE a este endpoint y proporcionar los identificadores del carrito (:cartId) y del producto (:productId) que se desea eliminar, el producto correspondiente se elimina de la lista de productos dentro del carrito especificado.</p>

###

<div align="center">
  <img height="125" src="https://i.postimg.cc/J7NXyHZN/Deltecart.png"  />
</div>

###

<p align="left">DELETE /api/carts/:cartId se utiliza para eliminar un carrito específico identificado por :cartId. Al realizar una solicitud DELETE a este endpoint y proporcionar el identificador del carrito que se desea eliminar, el carrito correspondiente se elimina de la base de datos.</p>

###

<h3 align="left">--Views</h3>

###

<p align="left">http://localhost:8080/</p>

###

<div align="center">
  <img height="550" src="https://i.postimg.cc/Z5xBRGNJ/Viewhome.png"  />
</div>

###

<p align="left">http://localhost:8080/realTimeProducts</p>

###

<div align="center">
  <img height="550" src="https://i.postimg.cc/qRb2799N/realtime.png"  />
</div>

###

<p align="left">http://localhost:8080/products</p>

###

<div align="center">
  <img height="550" src="https://i.postimg.cc/TYrqVHb4/productsview.png"  />
</div>

###

<p align="left">http://localhost:8080/carts/c:id</p>

###

<div align="center">
  <img height="475" src="https://i.postimg.cc/FH6yN5X1/cartdidwie.png"  />
</div>

###

<h2 align="center">Implementacion de login</h2>

###

<h3 align="left">Metodo Post</h3>

###

<div align="center">
  <img height="550" src="https://i.postimg.cc/Hs8140Gn/postuser.png"  />
</div>

###

<p align="left">POST /api/user/register<br>Descripción<br>Este endpoint se utiliza para crear un nuevo usuario en la base de datos MongoDB. Al realizar una solicitud POST a esta ruta y proporcionar los datos del usuario en el cuerpo de la solicitud, se crea un nuevo usuario con los detalles especificados.</p>

###

<div align="center">
  <img height="300" src="https://i.postimg.cc/pdW2Z9YS/Postlogin.png"  />
</div>

###

<p align="left">POST /api/user/login<br>Este endpoint se utiliza para iniciar sesión en el sistema. Al realizar una solicitud POST a esta ruta y proporcionar las credenciales de inicio de sesión (correo electrónico y contraseña) en el cuerpo de la solicitud, el usuario correspondiente será autenticado en el sistema.</p>

###

<h3 align="left">View login</h3>

###

<p align="left">al entrar http://localhost:8080/ tenes que hacer un form para poder hacer el login (el header va a ser eliminado en un futuro ) :</p>

###

<div align="center">
  <img height="150" src="https://i.postimg.cc/J4zvPb9Z/Viewlogin1.png"  />
</div>

###

<p align="left">Tengo el problema que al poner el email y password , este me lleva a http://localhost:8080/api/session/login , mientras en el codigo le estoy dando res.redirect("/profile") :</p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/Gty8CBfQ/codeform.png"  />
</div>

###

<p align="left">Form de http://localhost:8080/</p>

###

<div align="center">
  <img height="500" src="https://i.postimg.cc/wBR1CfGN/POstlogincode.png"  />
</div>

###

<p align="left"></p>

###

<h2 align="left">Refactor a nuestro login</h2>

###

<p align="left">se agrego un hasheo de contraseña</p>

###

<p align="left">implementación de passport</p>

###

<div align="center">
  <img height="900" src="https://i.postimg.cc/8CxKQgBW/Screenshot-6.png"  />
</div>

###

<p align="left">autenticación de GitHub</p>

###

<div align="center">
  <img height="200" src="https://i.postimg.cc/430Mf9ZY/Screenshot-5.png"  />
</div>

###

<div align="center">
  <img height="" src="https://i.postimg.cc/kg4f2gTK/Screenshot-7.png"  />
</div>

###