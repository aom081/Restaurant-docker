import Restaurant from "../models/restaurant.model.js";
const RestaurantController = {};
RestaurantController.create = async (req, res) => {
  const { name, type, img } = req.body;

  if (!name || !type || !img) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const restaurant = await Restaurant.findOne({ where: { name } });

    if (restaurant) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const newRestaurant = await Restaurant.create({ name, type, img });

    return res
      .status(201)
      .json({
        message: "Restaurant created successfully",
        data: newRestaurant,
      });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

RestaurantController.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    return res.status(200).json({
      message: "Restaurants retrieved successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

RestaurantController.getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Restaurant ID is required" });
  }

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({
      message: "Restaurant retrieved successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error retrieving restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

RestaurantController.update = async (req, res) => {
  const { id } = req.params;
  const { name, type, img } = req.body;
  if (!id && !name && !type && !img) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.name = name;
    restaurant.type = type;
    restaurant.img = img;

    await restaurant.save();

    return res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

RestaurantController.delete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Restaurant ID is required" });
  }

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.destroy();

    return res.status(200).json({
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export default RestaurantController;
