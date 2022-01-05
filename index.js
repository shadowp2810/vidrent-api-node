const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*
+ mongoimport --db mongo-exercises --collection cources --file exercise-data.json --jsonArray
+ Fawn for a group of operations to perform as a unit (Transactions/ 2 Phase Technique)
+ _id: 507f191e810c19729de860ea has 12 bytes where 
    4 bytes are timestamp, 3 are machine identifier, 2 are process identifier, 3 are counter. 
    Each byte has 8 bits, so counter has 2 ^ (8*3) or 16M bits.
    The _id is generated by the MongoDB Driver and not MongoDB, so you don't have to wait.
    Mongoose is an abstraction over mongoDB driver. 
    Can use joi-objectid to validate client _id inputs to avoid promise rejection.
*/
