const socket = io();

socket.on("updateProducts", (products) => {
  console.log("Productos actualizados:", products);

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});

