import RestaurantController from "../controllers/restaurant.controller.js";
import express from "express";

const router = express.Router();
// POST http//:5000/api/v1/restaurants
router.post("/", RestaurantController.create);

// GET http//:5000/api/v1/restaurants
router.get("/", RestaurantController.getAll);

// GET http//:5000/api/v1/restaurants/:id
router.get("/:id", RestaurantController.getById);

// PUT http//:5000/api/v1/restaurants/:id
router.put("/:id", RestaurantController.update);

// DELETE http//:5000/api/v1/restaurants/:id
router.delete("/:id", RestaurantController.delete);
export default router;
