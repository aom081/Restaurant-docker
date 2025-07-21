import Restaurant from "../models/restaurant.model.js";
const restaurantController = {};
//Create and save a new restaurant
restaurantController.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;

  //validate data
  if (!name || !type || !imageUrl) {
    res
      .status(400)
      .send({ message: "Name, Type or ImageUrl can not be empty!" });
    return;
  }

  await Restaurant.findOne({ where: { name: name } }).then((restuarant) => {
    if (restuarant) {
      res.status(400).send({ message: "Restaurant already exists!" });
      return;
    }
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };
    console.log(newRestaurant);

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);

        res.status(500).send({
          message:
            error.message || "Something error while creating the restaurant",
        });
      });
  });
};
//Get All restaurant
restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error while getting all restaurants",
      });
    });
};

//Get Restaurant By Id
restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found restaurant with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error while getting restaurant with id" + id,
      });
    });
};

//Update a restaurant
restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { name, type, imageUrl } = req.body;
  //validate data
  if (!name && !type && !imageUrl) {
    res
      .status(400)
      .send({ message: "Name, Type and ImageUrl can not be empty!" });
    return;
  }
  await Restaurant.update(
    { name: name, type: type, imageUrl: imageUrl },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Restaurant update successfully!" });
      } else {
        res.status(404).send({
          message:
            "Cannot update restaurant with id " +
            id +
            ". Maybe restaurant was not found.",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error while updating restaurant with id" + id,
      });
    });
};

//Delete a restaurant by id
restaurantController.deleteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "Id is missing" });
    return;
  }
  await Restaurant.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Restaurant was deleted successfully" });
      } else {
        res.status(404).send({
          message: "Cannot delete restaurant with id " + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error while updating restaurant with id" + id,
      });
    });
};

export default restaurantController;
