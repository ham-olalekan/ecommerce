const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/user");

async function login(loginRequestBody) {
  if (!loginRequestBody) {
    return new Promise.reject({
      statusCode: 400,
      message: `Login request body is required`,
    });
  }

  const { error } = validate(loginRequestBody);

  if (error) {
    return Promise.reject({
      statusCode: 400,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({
    phoneNumber: loginRequestBody.phoneNumber,
  });
  if (!user) {
    return Promise.reject({
      statusCode: 404,
      message: `No user found with phoneNumber ${loginRequestBody.phoneNumber}`,
    });
  }

  const validPassword = await bcrypt.compare(
    loginRequestBody.password,
    user.password
  );
  if (!validPassword) {
    return Promise.reject({
      statusCode: 403,
      message: `Invalid phone number of password`,
    });
  }

  const token = user.generateAuthToken();

  const userInfo = _.pick(user, [ "id", "firstName", "lastName", "phoneNumber", "address", "email", "dateRegistered"]);

  return Promise.resolve({
    statusCode: 200,
    data: {
      token,
      userInfo
    },
  });
}

function validate(loginRequestBody) {
  const schema = {
    phoneNumber: Joi.string().min(11).max(15).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(loginRequestBody, schema);
}


exports.login = login;