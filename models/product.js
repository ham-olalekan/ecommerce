const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      maxlength: 500,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: String,
      maxlength: 50,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
    percentageDiscount: {
      required: false,
      default: ((this.price - this.discountedPrice) / this.price) * 100,
    },
    colour: {
      required: false,
    },
    size: {
      required: false,
    },
    imagesUrl: [{
      type: String
    }]
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);//enable data pagination

productSchema.set("toJSON", {
  transform: function (doc, returnedResult, options) {
    returnedResult.id = returnedResult._id;
    delete returnedResult._id;
    delete returnedResult.__v;
    delete returnedResult.updatedAt;
  },
});

const Product = mongoose.model("Product", productSchema);

function validate(product) {
  const Schema = {
    productName: Joi.string().maxlength(500).require(),
    description: Joi.string().maxlength(500),
    category: Joi.string().maxlength(100).min(5),
    price: Joi.number().max(1000000000).min(10).require(),
    colour: Joi.string().maxlength(100).min(2),
    size: Joi.string(),
  };

  return Joi.validate(product, Schema);
}

exports.Product = Product;
exports.validateProduct = validate;
exports.productSchema = productSchema;
