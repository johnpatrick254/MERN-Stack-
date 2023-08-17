import { Router } from "express";
import { createToDo, deleteTodo, getTodos, updateTodo } from "../controllers/TodoController";

const router = Router();

router.post("/",createToDo)

router.get("/",getTodos)
router.patch("/:id",updateTodo)
router.delete("/:id",deleteTodo)


export default router