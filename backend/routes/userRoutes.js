import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

// GENERATE TOKEN
const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER USER
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {

      res.status(200).json({
        message: "Login Successful",
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } else {

      res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;