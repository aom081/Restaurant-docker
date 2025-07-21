import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Restaurants from "../components/Restaurants";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filetedRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilteredRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.title.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredRestaurants(result);
    // console.log(result);
  };
  useEffect(() => {
    //call api: getAllRestaurants
    fetch("http://localhost:5000/api/v1/restaurants")
      .then((res) => {
        // convert to JSON format
        return res.json();
      })
      .then((response) => {
        //save to state
        setRestaurants(response);
        setFilteredRestaurants(response);
      })
      .catch((err) => {
        //catch error
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container mx-auto">
      {
        //Navigation Bar
      }

      {
        //Header
      }
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant
        </h1>
      </div>
      {
        //Search Box
      }
      <div className="mb-5 flex justify-center items-center ">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            required
            placeholder="Search"
          />
        </label>
      </div>

      {
        // Result
      }
      <Restaurants restaurants={filetedRestaurants} />
    </div>
  );
};

export default Home;
