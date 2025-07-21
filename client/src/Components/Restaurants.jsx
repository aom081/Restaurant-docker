import React from "react";
import Card from "./Card";
const Restaurants = ({ restaurants }) => {
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          restaurants.map((restaurant) => {
            return (
              <Card
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                type={restaurant.type}
                imageUrl={restaurant.imageUrl}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Restaurants;
