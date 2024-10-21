import express from "express";

const app = express();

// app.use(
//   cors({
//     origin: ["https://friends-flock.vercel.app", "http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// )
const port = process.env.PORT || 5555;
 app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
