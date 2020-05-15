const mongoose = require("mongoose");
const OrderStatus = require("../models/utils/orderStatus");
const { productSchema } = require("../models/product");

const orderSchema = new mongoose.Schema(
  {
    product: [productSchema],
    status: {
      type: String,
      enum: [
        OrderStatus.NEW,
        OrderStatus.IN_PROGRESS,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
      ],
      default: OrderStatus.NEW,
    },
    deliveryDate: {
      type: Date,
    },
    cancelDate: {
      type: Date,
    },
    shippedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.set("toJSON", {
  transform: function (doc, returnedResult, options) {
    returnedResult.id = returnedResult._id;
    delete returnedResult._id;
    delete returnedResult.__v;
    delete returnedResult.updatedAt;
  },
});

orderSchema.methods.isOrderNew = function () {
  return this.status === "NEW";
};
orderSchema.methods.isOrderCancellable = function () {
  return this.status === "NEW" || this.status == IN_PROGRESS;
};
const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
