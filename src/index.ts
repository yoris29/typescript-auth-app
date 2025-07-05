const express = require("express");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();

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
