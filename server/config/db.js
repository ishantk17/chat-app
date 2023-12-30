const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://chat-app:bs1Xo4WqLvTWBSGk@cluster0.uea3kh2.mongodb.net/?retryWrites=true&w=majority",
    );
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// bs1Xo4WqLvTWBSGk
module.exports = connectDB;