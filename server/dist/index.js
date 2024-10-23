"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", authRoute_1.default);
app.get("/", (req, res) => {
    res.send("hello how are you");
});
app.listen(port, () => {
    console.log("server is listening on port", port);
});
