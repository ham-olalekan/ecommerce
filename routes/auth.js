const express = require("express");
const router = express.Router();
const { login } = require("../services/authService");

router.post("/login", async (req, res) => {
  const { body } = req;
  try {
    const loginObj = await login(body);
    return res
    .status(200)
    .send({
      status: true,
      data : loginObj.data,
    });
  } catch (error) {
    console.log(
      `Login failed for user with phone ${body.phoneNumber} with error `,
      error
    );
    return res.status(error.statusCode || 400).send(error.message);
  }
});

module.exports = router;
