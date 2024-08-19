document.getElementById("loginForm").addEventListener("submit", handleLogin);

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    localStorage.setItem("isLoggedIn", true);
    showProducts();
  } else {
    document.getElementById("loginMessage").textContent =
      "يجب إدخال البريد الإلكتروني وكلمة المرور!";
  }
}

function showProducts() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("cartContainer").style.display = "none";
  document.getElementById("productsContainer").style.display = "block";

  fetchProducts();
}

function showCart() {
  document.getElementById("productsContainer").style.display = "none";
  document.getElementById("cartContainer").style.display = "block";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  fetchProductsInCart(cart);
}

function fetchProducts() {
  const apiUrl = "https://fakestoreapi.com/products";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function displayProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <span>Price: $${product.price}</span>
      <button onclick="addToCart(${product.id})">add to cart</button>
    `;

    productsContainer.appendChild(productElement);
  });
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

function fetchProductsInCart(cart) {
  const apiUrl = "https://fakestoreapi.com/products";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      const cartProducts = products.filter((product) =>
        cart.includes(product.id)
      );
      displayCartProducts(cartProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function displayCartProducts(cartProducts) {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  cartProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <span>Price: $${product.price}</span>
    `;

    cartItemsContainer.appendChild(productElement);
  });
}

function clearCart() {
  localStorage.removeItem("cart");
  showCart();
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("cart");
  document.getElementById("productsContainer").style.display = "none";
  document.getElementById("cartContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
}

document.getElementById("cartContainer").style.display = "none";
document.getElementById("productsContainer").style.display = "none";
document.getElementById("loginContainer").style.display = "block";

if (localStorage.getItem("isLoggedIn")) {
  showProducts();
}
