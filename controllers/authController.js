const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../models/user');
require("dotenv").config();


router.get("/", (req, res) => {
  res.send("login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  let userToLogin = await User.findOne({ username: req.body.username });
  console.log(userToLogin);
  if (userToLogin) {
    bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
      if (result) {
        const id = userToLogin._id.toHexString();
        req.session.userid = id
        res.json({
          userid: req.session.userid
        });
      } else {
        res.json("Incorrect Password");
      }
    });
  }
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  if (req.body.username && req.body.password) {
    let plainTextPassword = req.body.password;
    bcrypt.hash(plainTextPassword, 5 , async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let newUser = await User.create(req.body);
    
      res.send(newUser);
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("failed logout");
    }
    res.clearCookie("connect.sid"); 
    return res.send("successful logout!");  
  });
});

module.exports = router;