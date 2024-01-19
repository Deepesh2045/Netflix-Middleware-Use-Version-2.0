import mongoose from "mongoose";

const dbName = "Netflix"
const userName = "rddesign64"
const userPassword = "Deepesh123"

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0.t0nfroa.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database connection established... ");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

export default connectDatabase;
