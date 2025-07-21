import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import restaurantRouter from "./routers/restaurant.router.js";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/db.js";
const role = db.Role;
const initRoles = async () => {
role.create({ id: 1, name: "user" });
role.create({ id: 2, name: "moderator" });
role.create({ id: 3, name: "admin" });
};
db.sequelize.sync().then(() => {
  console.log("Database synced");
  initRoles();
}).catch((err) => {
  console.error("Failed to sync database:", err);
});

app.get("/", (req, res) => {
  res.send("Restaurant Restful API Completed");
});

//use routers
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
