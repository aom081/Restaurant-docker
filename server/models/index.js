import sequelize from "./db";
import { DataTypes } from "sequelize";

import User from "./user.model";
import Role from "./role.model";

const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize;

db.User = User;
db.Role = Role;

//Associations
db.User.belongsTo(db.Role, {
  through: "user_roles",
});

db.Role.belongsToMany(db.User, {
  through: "user_roles",
});

export default db;