import express from "express";
import { Request, Response } from "express";
import User from "../models/Users";
import { random, auth } from "../helpers/auth";

const signup = async (req: Request, res: Response): Promise<any> => {
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
    const salt = random();
    const user = await User.create({
      email,
      username,
      authentication: { salt, password: auth(salt, password) },
    }).then((user) => user.toObject());

    return res.status(200).json({ err: false, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ err: true, msg: "You have to enter all of the required fields" });
  }

  try {
    const user = await User.findOne({ email }).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res
        .status(400)
        .json({ err: true, msg: "No email linked with this address" });
    }

    const expectedHash = auth(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(403).json({ error: true, msg: "Incorrect password" });
    }

    const salt = random();
    user.authentication.sessionToken = auth(salt, user._id.toString());

    res.cookie("token", user.authentication.sessionToken);

    return res
      .status(200)
      .json({ error: false, msg: "Login Successful", user });
  } catch (err) {
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};

export default { signup, login };
