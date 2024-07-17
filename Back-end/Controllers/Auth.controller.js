import asyncHandler from "express-async-handler";
import Auth from "../Models/Auth.model.js";
import generateToken from "../utils/generatetoken.js";
import { z } from "zod";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const input  = req.body;

  const parsedInput = schema.safeParse(input);

  if (parsedInput.success === false) {
    return res.status(400).json({
      success: false,
      message: "Invalid Input",
    });
  }

  const { email, password } = parsedInput.data;

  const user = await Auth.findOne({
    email: email.toLowerCase(),
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user);
    return res.status(200).json({
      sucess: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "User Logged In",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const  input  = req.body;
  console.log(input)
  const parsedInput = schema.safeParse(input);


  if (parsedInput.success === false) {
    return res.status(400).json({
      success: false,
      message: "Invalid Input",
    });
  }

  const { email, password } = parsedInput.data;


  const userExists = await Auth.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await Auth.create({
    email,
    password,
  });

  if (user) {
    generateToken(res, user);
    return res.status(201).json({
      sucess: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "User Created",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid user data",
    });
  }
});

// @desc  Logout user
// @route POST /api/users/logout
// @access Private

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "User Logged Out",
  });
});

export { authUser, registerUser, logout };
