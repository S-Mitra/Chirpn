const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const TodoController = require("../controllers/todo");

router.post(
  "",
  checkAuth,
  TodoController.createTodo
);

router.get("", TodoController.getAllTodos);

router.get("/:id", TodoController.getTodoById);

router.put(
  "/:id",
  checkAuth,
  TodoController.updateTodo
);

router.delete("/:id", checkAuth, TodoController.deleteTodo);

module.exports = router;