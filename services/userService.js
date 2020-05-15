const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

async function createUser(user) {
  if (!user) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: `request body is required`,
    });
  }

  const { error } = validate(user);

  if (error) {
    return Promise.reject({
      statusCode: 400,
      message: error.details[0].message,
    });
  }
  
  let existingUser;
  try {
     existingUser = await User.findOne({ phoneNumber: user.phoneNumber });
  } catch (error) {
    console.log(`Error occured while trying to get existing user: `, error);
  }
  //if phone number already exists. don't create
  if (existingUser) {
    return Promise.reject({
      statusCode: 409,
      message: `User with this phone number ${user.phoneNumber} already exists`,
    });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  console.log(`Attempting to create user `, user);
  return User.create(user)
    .then((createUser) => {
      return Promise.resolve({
        statusCode: 201,
        data: createUser,
      });
    })
    .catch((error) => {
      console.log(`Error occured while creating user : `, error);
      return Promise.reject({
        statusCode: 400,
        message: `Failed to create user with phone number ${phoneNumber} due to error`,
      });
    });
}

exports.createUser = createUser;
