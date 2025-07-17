import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Update = () => {
  //1.Get Id from URL
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    img: "",
  });

  //2. Get Restaurant by ID
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/restaurants/" + id)
      .then((res) => {
        // convert to JSON format
        return res.json();
      })
      .then((response) => {
        //save to state
        setRestaurant(response);
      })
      .catch((err) => {
        //catch error
        console.log(err.message);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/" + id,
        {
          method: "PUT",
          body: JSON.stringify(restaurant),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Restaurant updated successfully!!");
        setRestaurant({
          title: "",
          type: "",
          img: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Update restaurant</h1>
      </div>
      <div className="space-y-2 flex items-center flex-col my-2 w-full">
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Title:
          <input
            type="text"
            name="title"
            value={restaurant.title}
            className="grow w-80"
            placeholder="Restaurant Title"
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
          Restaurant Img:
          <input
            type="text"
            className="grow"
            value={restaurant.img}
            onChange={handleChange}
            placeholder="Restaurant Img"
            name="img"
          />
        </label>
        {restaurant.img && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.img} />
          </div>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-success"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button className="btn btn-outline btn-error">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Update;
