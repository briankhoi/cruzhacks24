const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");

// enable cors to allow requests from the client
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let usersCollection;

client.connect(err => {
  if (err) console.error(err);
  console.log("Connected to MongoDB");
  const db = client.db("study");
  usersCollection = db.collection("users");
});

// for oauth0
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:5000",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.BASE_URL,
  afterCallback: (req, res, session, state) => {
    return {
      ...session,
      returnTo: "/home",
    };
  },
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/home");
});

// send info back to client regarding auth state of user
app.get("/api/user", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const user = req.oidc.user;
    const existingUser = await usersCollection.findOne({ sub: user.sub });
    if (!existingUser) {
      // User does not exist, create a new user
      await usersCollection.insertOne(user);
    }
    res.json({
      isAuthenticated: true,
      user: user,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  // redirect to homepage after logout
  res.redirect("http://localhost:3000/home");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});