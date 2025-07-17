import React from "react";
import Card from "./Card";

const Restaurant = ({ restaurants }) => {
  const handleDelete = (id) => {
    // Add your delete logic here
    console.log("Delete restaurant with id:", id);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              title={restaurant.title}
              type={restaurant.type}
              img={restaurant.img}
            />
          ))}
      </div>
    </div>
  );
};

export default Restaurant;
