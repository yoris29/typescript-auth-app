import express from "express";
import { Request, Response } from "express";
import User from "../models/Users";
import { random } from "../helpers/auth";

export const signup = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ err: true, msg: "You have to enter all of the required fields" });
  }
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.json({
        error: true,
        msg: "A user is already linked with this email address",
      });
    }
    // const salt = random
    return res.status(200).json({ err: true, msg: "Internal server error" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};
