import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    oauth: {
      googleId: String,
      displayName: String,
      email: String,
    },
  },
  { timestamps: true }
);

const Userdb = new mongoose.model("Userdb", userSchema);

export default Userdb;
