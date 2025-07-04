const mongoose = require("mongoose");

const connectDB = (url: string): void => {
  return mongoose.connect(url);
};

module.exports = connectDB;
