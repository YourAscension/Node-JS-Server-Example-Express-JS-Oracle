import { Router } from "express";
import { todoController } from "../controllers/todo.controller.js";

const router = new Router();

router.post("/todo", todoController.createTodo);
router.get("/todo", todoController.getTodos);
router.get("/todo/:id", todoController.getOneTodo);
router.put("/todo", todoController.updateTodo);
router.delete("/todo/:id", todoController.deleteTodo);

export default router;
