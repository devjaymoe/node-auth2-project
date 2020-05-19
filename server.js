const express = require("express");
const session = require('express-session')

const server = express();
// should be configed elsewhere
const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60, // one hour in milliseconds
    secure: process.env.SECURE_COOKIE || false, // send the cookie only over https, true in production
    httpOnly: true, // true means, javascript cannot access the cookie
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOW_COOKIES || true, // GDPR compliance
  name: 'monster', // name change of cookie
  secret: process.env.COOKIE_SECRET || 'keepitsecret,keepitsafe!',
}
// create a session and send a cookie back (the cookie will store the session id)
server.use(session(sessionConfig)); // turn on sessions for the API
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
