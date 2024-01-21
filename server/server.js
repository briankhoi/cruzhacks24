const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// enable cors to allow requests from the client
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
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
app.get("/api/user", (req, res) => {
  console.log("bruh1");
  console.log(req.oidc);
  if (req.oidc.isAuthenticated()) {
    console.log("bruh");
    console.log(req.oidc);
      res.json({
          isAuthenticated: true,
          user: req.oidc.user,
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