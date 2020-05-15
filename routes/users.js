const express = require("express");
const config = require('config');
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require("lodash");
const { createUser } = require("../services/userService");
/**
 * endpoint to create a new user
 */
router.post("/register", async (req, res) => {
  const user = req.body;

  try {
    const dataObj = await createUser(user);
    res
      .status(201)
      .send({ status: true, data: _.pick(dataObj.data, [ "id", "firstName", "lastName", "phoneNumber", "address", "email", "dateRegistered"])});
  } catch (error) {
      console.log(`Error occured while trying to create user `, error);
    res
    .status(error.statusCode || 400)
    .send({
      status: false,
      message: error.message,
    });
  }
});
module.exports = router;
