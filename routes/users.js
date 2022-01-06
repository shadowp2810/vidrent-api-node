const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    /*
    If we want client to be able to read this header 
    we need to set an additional header,
    which is a standard http header.
    We add line .header("access-control-expose-headers", "x-auth-token")
    This header lets webserver whitelist, 
    that is header browser or server is allowed to access.
    */
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
