import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import RestaurantService from "../services/restaurtant.service";
import Swal from "sweetalert2";

const Update = () => {
  //1.Get Id from URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  //2. Get Restaurant by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await RestaurantService.getRestaurantById(id);
        if (response.status === 200) {
          setRestaurant(response.data);
        }
      } catch (error) {
        console.log(error.message);
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message || "Failed to fetch restaurant",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await RestaurantService.editRestaurantById(id, restaurant);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Restaurant updated successfully!",
          icon: "success",
        }).then(() => {
          navigate("/"); // Redirect to home page
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update restaurant",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to home
  };
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Update Restaurant</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
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
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-[500px]">
            Restaurant Type:
            <input
              type="text"
              name="type"
              value={restaurant.type}
              onChange={handleChange}
              className="grow w-80"
              placeholder="Restaurant Type"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-[500px]">
            Restaurant ImageUrl:
            <input
              type="url"
              className="grow"
              value={restaurant.imageUrl}
              onChange={handleChange}
              placeholder="Restaurant ImageUrl"
              name="imageUrl"
            />
          </label>
          {restaurant.imageUrl && (
            <div className="flex items-center gap-2">
              <img 
                className="h-32 w-32 object-cover rounded-lg" 
                src={restaurant.imageUrl} 
                alt="Restaurant preview"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="space-x-2">
            <button
              className="btn btn-outline btn-success"
              onClick={handleSubmit}
              disabled={loading || !restaurant.name || !restaurant.type}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
            <button 
              className="btn btn-outline btn-error"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
