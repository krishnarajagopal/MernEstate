import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Invalid email or password"));
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(400, "Invalid email or password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...otherUserInfo } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true })
      .status(200)
      .json({ message: "Login Successful", otherUserInfo });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  const { name, email, picture } = req.body;
  const userName=name.split(" ").join("").toLowerCase()+`_${Math.round(Math.random()*10000)}`
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherUserInfo } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true
        })
        .status(200)
        .json({ message: "Login Successful", otherUserInfo });
    } else {
      const password = email + process.env.JWT_SECRET;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        username: userName,
        email,
        password: hashedPassword,
        profilePic: picture
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherUserInfo } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true
        })
        .status(200)
        .json({ message: "Login Successful", otherUserInfo });
} 
} catch (error) {
    next(error);
}}