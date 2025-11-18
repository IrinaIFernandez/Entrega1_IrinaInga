import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

let ioInstance;
ioInstance = io;

export const getIO = () => ioInstance;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

httpServer.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
});
