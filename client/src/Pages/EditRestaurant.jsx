import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const EditRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    img: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/restaurants/${id}`)
      .then((res) => res.json())
      .then((response) => setRestaurant(response))
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/restaurants/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
      });

      if (response.ok) {
        setAlertMsg("Restaurant updated successfully!");
        setShowAlert(true);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setAlertMsg("Failed to update restaurant. Please try again.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error update restaurant:", error);
      setAlertMsg(
        "An error occurred while updating the restaurant. Please try again."
      );
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    setAlertMsg("Cancelled. Returning to home page.");
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="mx-auto min-h-screen ">
      <div>
        {/* Header Section */}
        <h1 className="font-bold text-3xl text-center mt-8 mb-4 text-primary">
          Update Restaurant
        </h1>

        {/* Form Section */}
        <form
          className="card w-full max-w-md mx-auto shadow-xl rounded-lg p-8 bg-img"
          onSubmit={handleSubmit}
        >
          <div className="card-body items-center">
            <label className="w-full mb-2 text-left font-semibold">
              Menu Name
            </label>
            <input
              type="text"
              name="title"
              value={restaurant.title}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              className="input input-bordered input-lg w-full mb-4"
              required
            />

            <label className="w-full mb-2 text-left font-semibold">
              Food Type
            </label>
            <input
              type="text"
              name="type"
              value={restaurant.type}
              onChange={handleChange}
              placeholder="e.g. ชาไข่มุก, กาแฟ"
              className="input input-bordered input-lg w-full mb-4"
              required
            />

            <label className="w-full mb-2 text-left font-semibold">
              Picture URL
            </label>
            <input
              type="text"
              name="img"
              value={restaurant.img}
              onChange={handleChange}
              placeholder="Paste image URL here"
              className="input input-bordered input-lg w-full mb-4"
              required
            />

            {restaurant.img && (
              <img
                src={restaurant.img}
                alt="Preview"
                className="w-100 h-50 object-cover rounded-lg border mb-4"
              />
            )}

            <div className="flex w-full gap-2 mt-2">
              <button type="submit" className="btn btn-primary flex-1">
                Update Restaurant
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <button
              type="button"
              className="btn btn-link w-full mt-4 text-blue-600"
              onClick={handleCancel}
            >
              &larr; Return to Home
            </button>
          </div>
        </form>
      </div>
      {/* daisyUI Alert */}
      {showAlert && (
        <dialog className="modal modal-open">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg text-primary mb-2">
              Notification
            </h3>
            <p className="py-2 text-base">{alertMsg}</p>
            <div className="modal-action justify-center">
              <form method="dialog">
                <button className="btn btn-primary" onClick={handleAlertClose}>
                  OK
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EditRestaurant;
