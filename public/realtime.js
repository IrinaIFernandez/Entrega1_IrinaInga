console.log("Realtime cargado!");

const socket = io();

const form = document.getElementById("productForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const product = Object.fromEntries(formData.entries());

  product.price = Number(product.price);
  product.stock = Number(product.stock);

  socket.emit("newProduct", product);

  form.reset();
});

socket.on("updateProducts", (products) => {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - $${p.price} - ${p.description} - stock: ${p.stock} - categoría: ${p.category}`;
    list.appendChild(li);
  });
});
