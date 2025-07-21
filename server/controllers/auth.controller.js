import db from "../models/index.js";
const { User, Role } = db;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { use } from "react";

const authController = {};

authController.register = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  await User.findOne({ where: { username } })
    .select("password")
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const newUser = {
        username,
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      };
      User.create(newUser).then((Role) => {
        Role.findAll({
          where: { name: "user" },
        })
        .then((role) => {
          User.setRoles(role).then(() => {
            res.status(201).json({ message: "User registered successfully" });
          });
        });
      });
    });
};

export default authController;
