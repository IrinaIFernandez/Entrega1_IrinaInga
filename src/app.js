import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//mongoo

mongoose.connect(
  "mongodb+srv://fernandezirina14_db_user:SSS7tMP6FDAd6N37@irina.dkufbvc.mongodb.net/entregaFinal?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true&appName=Irina"
)
  .then(() => console.log("Mongo Atlas conectado ✔"))
  .catch(err => console.log("Error al conectar Atlas:", err));


app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080");
});
