import React, { useState } from "react";
import NavBar from "../components/NavBar";

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
      const response = await fetch("http://localhost:5000/api/v1/restaurants", {
        method: "POST",
        body: JSON.stringify(restaurant),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (response.ok) {
        alert("Restaurant added successfully!!");
        setRestaurant({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
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
