import express from "express";
import connectDB from "./db/connect.ts";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(compression());

const port = process.env.PORT;

const server = async () => {
  await connectDB(process.env.CONN_STR);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
server();
