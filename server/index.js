import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import restaurantRouter from "./routers/restaurant.router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});
//use router
app.use("/api/v1/restaurants", restaurantRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});