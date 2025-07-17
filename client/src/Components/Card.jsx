import React, { useState } from "react";

const Card = ({ id, title, type, img }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/restaurants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setAlertMsg("Restaurant deleted successfully!");
          setShowAlert(true);
          setShouldReload(true);
        } else {
          setAlertMsg("Failed to delete restaurant. Please try again.");
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting restaurant:", error);
        setAlertMsg(
          "An error occurred while deleting the restaurant. Please try again."
        );
        setShowAlert(true);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 h-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
        <figure>
          <img
            src={img}
            alt={title}
            className="rounded-t-lg object-cover w-full h-56"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{type}</p>
          <div className="card-actions justify-end gap-2">
            <button
              className="btn btn-error"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
            <a className="btn btn-warning" href={`/edit/${id}`}>
              Edit
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-500">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete <b>{title}</b>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => {
                  handleDelete(id);
                  setShowModal(false);
                }}
              >
                Yes, Delete
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Card;
