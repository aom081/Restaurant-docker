import React, { useState } from "react";
import NavBar from "../Components/Navbar";
import RestaurantService from "../services/restaurtant.service";
import Swal from "sweetalert2";

const Add = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(restaurant);

    try {
      const response = await RestaurantService.addRestaurant(restaurant);
      
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Restaurant added successfully!",
          icon: "success",
        });
        setRestaurant({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Add new restaurant</h1>
      </div>
      <div className="space-y-2 flex items-center flex-col my-2 w-full">
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Name:
          <input
            type="text"
            name="name"
            value={restaurant.name}
            className="grow w-80"
            placeholder="Restaurant Name"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Type:
          <input
            type="text"
            name="type"
            value={restaurant.type}
            onChange={handleChange}
            className="grow  w-80"
            placeholder="Restaurant Type"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant ImageUrl:
          <input
            type="text"
            className="grow"
            value={restaurant.imageUrl}
            onChange={handleChange}
            placeholder="Restaurant ImageUrl"
            name="imageUrl"
          />
        </label>
        {restaurant.imageUrl && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.imageUrl} />
          </div>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-success"
            onClick={handleSubmit}
          >
            Add
          </button>
          <button className="btn btn-outline btn-error">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
