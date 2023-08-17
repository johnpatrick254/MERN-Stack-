"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const Todos_1 = __importDefault(require("./Routes/Todos"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/todos", Todos_1.default);
app.use((err, _req, res, _next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000, () => {
    console.log("Server Running");
});
//# sourceMappingURL=index.js.map