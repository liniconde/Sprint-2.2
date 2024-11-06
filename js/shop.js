// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  //verifico si el producto ya existe en la db cart
  // Si existe en la db cartt, le agrego a cant + 1
  // Sim no existe entonces busco el producto en products
  //Le añado cant = 1
  // Lo arego al arraynde cart con el push //

  const cartproductos = cart.find((prodAdd) => prodAdd.id === id);

  if (cartproductos) {
    cartproductos.quantity++;
  } else {
    const productsbuscar = products.find((prodAdd) => prodAdd.id === id);
    productsbuscar.quantity = 1;
    cart.push(productsbuscar);
  }
  subtotal();
  calculateTotal();
  cart = applyPromotionsCart(cart);
  console.log(cart);

  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array
}

function refreshCartButton(totalE) {
  const total_items = document.getElementById("count_product");
  total_items.innerHTML = totalE;
}

// Exercise 2
// LIMPIEZA DEL CARRITO CON EL BOTON CLEAN CART (HECHO POR LINI)//

function cleanCart() {
  // Necesito vaciar el carrito completamente //
  cart.splice(0, cart.length);
  // Debo actualizar la pantalla mostrando el carrito vacío y total en 0 //
  printCart();
  console.log("Carrito vacio", cart);
}

// Exercise 3
function calculateTotal() {
  //agregar una función para el precio//
  // Calculate total price of the cart using the "cartList" array
  let total = 0;
  for (let index = 0; index < cart.length; index++) {
    total = total + cart[index].total;
  }

  refreshCartButton(cart.length);

  return total.toFixed(2);
}

function subtotal() {
  // agregar las cantidades por el precio utilizar los parce.float //
  cart.forEach((cartproductos) => {
    const total = parseFloat(
      (cartproductos.quantity * cartproductos.price).toFixed(2)
    );
    cartproductos.total = total;
  });
}

// Exercise 4
function applyPromotionsCart(cartProducts) {
  // Apply promotions to each item in the array "cart" //

  // tengo que encontrar el id del caeite que es = id 1 //
  // si el usuario compra 3 o más se aplicara un descuento del 20 % //
  const ofertas = products.filter((product) => product.offer != undefined);

  //IDS de los productos que tienen ofertas (listado de los id de los productos de la tienda que tienen la oferta)//
  const idsConOfertas = ofertas.map((oferta) => oferta.id);
  //buscar en mi carrotio cuales son las productos que tienen las ofertas

  return cartProducts.map((productoDelCarrito) => {
    // id del producto que esta en mi carrito //
    const idProducto = productoDelCarrito.id;
    // el producto buscado es el productos de la tienda que tiene el mismo id del producto del carrito//
    const productoBuscado = products.find(
      (producto) => producto.id === idProducto
    );
    // es la oferta del producto de la tienda //
    const oferta = productoBuscado.offer;

    //comprobo si mi id del producto se encuentra en la lista de mis productos con oferta

    if (
      idsConOfertas.includes(idProducto) &&
      // después compruebo si la cantidad de mi productocto del carrito cumple con la condición de la cantidad de mi oferta //
      productoDelCarrito.quantity >= oferta.number
    ) {
      productoDelCarrito.subtotalWithDiscount =
        (productoDelCarrito.total * (100 - oferta.percent)) / 100;
    }
    return productoDelCarrito;
  });
}

// Exercise 5   /////////   OJO REVISAR ////
function printCart() {
  const cartList = document.getElementById("cart_list");
  const total_price = document.getElementById("total_price");

  cartList.innerHTML = "";

  let listProduct;
  cart.forEach((product, index) => {
    listProduct += `
              <tr>
								<th scope="row">${product.name}</th>
								<td>${product.price}</td>
								<td>${product.quantity}</td>
								<td>${product.total}</td>
                <td>                
                <button 
                onclick= "añadir(${index})"
                type="button"
                class="btn btn-outline-dark">
                +
                </button>
                <button 
                onclick= "restar(${index})"
                type="button"
                class="btn btn-outline-dark">
                -
                </button>
                </td>
							</tr>`;
  });

  cartList.innerHTML = listProduct;
  total_price.textContent = calculateTotal();
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  const cartProduct = cart.fiind((item) => item.id === id);

  //Necesito saber si el producto se encuentra en el carrito //
  if (cartProduct) {
    // Necesito calcular si la cantidad del carrito es mayo > a 1 para que me redusca de 1 en 1 en el carrito//
  }
  if (cartProduct.quantity > 1) {
    cartProduct.quantity--;
  }
  // Ahora si en mi carrito solo hay un producto necesito que este quede en Cero=0//
  else {
    const productIndex = cart.indexOf(cartProduct);
    cart.splice(productIndex, 1);
  }

  console.log(`Producto con Id ${id} no encontrado en el carrito.`);

  //Aora debo actualizar los montos de mi carrito, como el subtotal, precios y descuentos //
  subtotal();
  calculateTotal();
  cart = applyPromotionsCart(cart);

  console.log(cart);
}

function open_modal() {
  printCart();
}

function añadir(index) {
  cart[index].quantity = cart[index].quantity + 1;
  subtotal();
  printCart();
  calculateTotal();
}

function restar(index) {
  cart[index].quantity = cart[index].quantity - 1;

  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }
  subtotal();
  printCart();
  calculateTotal();
}

