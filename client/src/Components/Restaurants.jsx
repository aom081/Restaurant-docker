import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";
const Restaurants = ({ restaurants }) => {
  const { user } = useAuthContext();
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants &&
          user &&
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
        {!user && <div>You don't have permission to access this content</div>}
        {!restaurants && <div>No content</div>}
      </div>
    </div>
  );
};

export default Restaurants;
