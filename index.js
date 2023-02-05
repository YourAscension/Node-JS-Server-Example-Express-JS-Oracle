import express from "express";
import todoRouter from "./routes/todo.routes.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log("Server is starting! :0");
});
