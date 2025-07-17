import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; 

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Restaurant.sync({ force: true }) 
  .then(() => {
    console.log("Restaurant table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Restaurant table:", error);
  });

export default Restaurant;