const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  //Pass control to next middleware function which is the route handler.
  next();
};
