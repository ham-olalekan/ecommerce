const mongoose = require("mongoose");
const { productSchema } = require("../models/product");
const cartSchema = new mongoose.Schema(
  {
    product: [productSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = new mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
