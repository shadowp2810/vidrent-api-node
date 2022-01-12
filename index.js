const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

/*
+ mongoimport --db mongo-exercises --collection cources --file exercise-data.json --jsonArray
+ Fawn for a group of operations to perform as a unit (Transactions/ 2 Phase Technique)
+ _id: 507f191e810c19729de860ea has 12 bytes where 
    4 bytes are timestamp, 3 are machine identifier, 2 are process identifier, 3 are counter. 
    Each byte has 8 bits, so counter has 2 ^ (8*3) or 16M bits.
    The _id is generated by the MongoDB Driver and not MongoDB, so you don't have to wait.
    Mongoose is an abstraction over mongoDB driver. 
    Can use joi-objectid to validate client _id inputs to avoid promise rejection.
+ Lodash is an optimized version of underscore, and has a lot of utility functions for working with objects, strings, arrays..
+ JSON Web Token is a long string that identifies a user. 
  Sent back from server to client after a client makes a login request.
  HEADER.PAYLOAD.VERIFYSIGNATURE , Payload contains public properties about user.
+ We set environemnt variable in terminal, 
  export vidly_PrivateKey=mySecureKey
+ We use the OOP Information Expert Principle which means an object that has enough information 
  and is an expert in that area, should be responsible for making decisions and performing tasks.
  So we encapsule the token logic in the mongoose models.
+ In middlewear functions we either terminate reqest response life cycle 
  or pass control to next middlewear function in our request process pipeline.
+ We want to apply the middleware function selectively to certain endpoints.
+ We have a route for authnticating users, for Logging out we don't need another route 
  and on client side we simply delete the token. Never store tokens in a database, and if you are hash it and use https. 
+ We use another middleware admin for role based authorization.
+ We need to handle rejected promises if our mongodb server can't be accessed. 
+ In a real world scenario you want to use a different database to log errors, here we log to same database. 
+ As a best practice when dealing with uncaught exceptions or unhandled rejections,
  we should terminate the process, because it can be in an unclean state,
  so we restart it with a clean state. In production we use tools called process managers,
  which are responsible for automatically restarting a node process.
+ It is a best practice to throw error objects instead of strings because a stack trace will be avaiable.
+ A test framework gives us a library of utitlity functions which we use to write tests and also a test runner for command line.
+ npm i jest --save-dev , as it is a development dependency and we don't want to deploy to production bundle.
*/
