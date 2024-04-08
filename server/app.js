import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./DB/const.js";
import passport from "passport";
import session from "express-session";
import MongoDBStoreImport from "connect-mongodb-session"; // Import MongoDBStore

import "./oauth.js";

function isLogignIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
const PORT = process.env.PORT || "3000";
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
connectDB(MONGODB_URI);

const MongoDBStore = MongoDBStoreImport(session); // Correct syntax for initializing MongoDBStore

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/dashboard",
    failureRedirect: "/login",
  })
);

app.get("/", (req, res) => {
  res.send("running successfully");
});

app.get("/google/dashboard", isLogignIn, (req, res) => {
  res.send("create a room");
});

app.get("/login", (req, res) => {
  res.send("login again");
});

app.use("/google/logout", (req, res) => {
  req.session.destroy();
  res.send("see you again");
});

app.listen(PORT, console.log(`server started on port ${PORT}`));
