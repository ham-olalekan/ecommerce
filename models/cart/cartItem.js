const mongoose = require("mongoose");
const { productSchema } = require("../product");

const cartItemSchema = new mongoose.Schema({
  product: {
    productSchema,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  itemPrice: {
    type: Number,
    default: (this.product.price * this.quantity),
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

exports.CartItem = CartItem;
exports.cartItemSchema = cartItemSchema;
