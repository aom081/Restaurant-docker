import api from "./api";
const REST_API = import.meta.env.VITE_REST_API || "/restaurants";

//get all restaurants
const getAllRestaurants = async () => {
    return await api.get(REST_API)
}