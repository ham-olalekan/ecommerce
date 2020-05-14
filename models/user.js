const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 11,
      minlength: 11,
      unique: true,
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    dateRegistered: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: function (doc, returnedResult, options) {
    returnedResult.id = returnedResult._id;
    delete returnedResult._id;
    delete returnedResult.__v;
    delete returnedResult.updatedAt;
  },
});

const User = mongoose.model("User", userSchema);

function validateUserObject(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phoneNumber: Joi.string().min(11).max(15).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    address: Joi.string().min(5).max(255),
    gender: Joi.string().min(4).max(6)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUserObject;
