import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {hashPassword, comparePassword} from './authPassowrd/authPassword.js'
import User from '../models/user.js'


dotenv.config();

export const Register = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // all fields require validation
      if (!firstName.trim()) {
        return res.json({ error: "FirstName is required" });
      }
      if (!lastName.trim()) {
        return res.json({ error: "LastName is required" });
      }
      if (!email) {
        return res.json({ error: "Email is required" });
      }
      if (!password || password.length < 5) {
        return res.json({ error: "Password is required and it must be at least 5 characters long" });
      }
      // check if email is taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ error: "Email is already taken" });
      }
      // hash password
      const hashedPassword = await hashPassword(password);
      //  register user on Database
      const user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save();
      // create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // send response
      res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  ///Login 
  export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // all fields require validation
      if (!email ||!password) {
        return res.json({ error: "Login Credential" });
      }
      if( password.length < 5){
        return res.json({ error: "Password must be at least 5 characters long" });
      }
      // check if email is taken
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ error: "User not found" });
      }
      // compare password
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.json({ error: "Please enter currect email or password" });
      }
      // create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      //send response
      res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
    } catch (err) {
      console.log(err);
    }
  };
  




