"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = require("../controllers/TodoController");
const router = (0, express_1.Router)();
router.post("/", TodoController_1.createToDo);
router.get("/", TodoController_1.getTodos);
router.patch("/:id", TodoController_1.updateTodo);
router.delete("/:id", TodoController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=Todos.js.map