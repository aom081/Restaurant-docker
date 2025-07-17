import restaurantController from "../controllers/restaurant.controller.js";

import express from "express";
const router = express.Router();

//POST http://localhost:5000/api/v1/restaurants
router.post("/", restaurantController.create);

//GET http://localhost:5000/api/v1/restaurants
router.get("/", restaurantController.getAll);

//GET http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", restaurantController.getById);

//PUT http://localhost:5000/api/v1/restaurants/:id
router.put("/:id", restaurantController.update);

//DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete("/:id", restaurantController.deleteById);

export default router;
