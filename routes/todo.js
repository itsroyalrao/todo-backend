import express from "express";
import {
  postTodo,
  // editTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router
  .route("/")
  .post(postTodo)
  .get(getTodos)
  // .put(updateTodo)
  .delete(deleteTodo);

router.route("/:id").get(updateTodo);

export default router;
