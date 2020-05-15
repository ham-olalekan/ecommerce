const mongoose = require("mongoose");
const { cartItemSchema } = require("../cart/cartItem");

const cartSchema = new mongoose.Schema(
  {
    cartItems: [cartItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * this function computes the total price of
 * all items in the cart
 */
cartSchema.methods.getTotalPrice = function () {
  let total = 0;
  this.cartItems.forEach((cartItem) => {
    total += cartItem.itemPrice;
    return total;
  });
};

cartSchema.set("toJSON", {
  transform: function (doc, returnedResult, options) {
    returnedResult.id = returnedResult._id;
    delete returnedResult._id;
    delete returnedResult.__v;
    delete returnedResult.updatedAt;
  },
});

const Cart = new mongoose.model("Cart", cartSchema);

exports.Cart = Cart;
