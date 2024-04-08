import mongoose from "mongoose";

//connecting database
const connectDB = async (MONGODB_URI) => {
  try {
    const DB_OPTION = {
      dbname: "oauth",
    };
    await mongoose.connect(MONGODB_URI, DB_OPTION);
    console.log("connect sucessfully");
  } catch (error) {
    console.log("somthing went wrong", error);
  }
};

export default connectDB;
