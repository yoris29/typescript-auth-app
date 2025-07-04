const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

const server = async () => {
  await connectDB(process.env.CONN_STR);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
server();
