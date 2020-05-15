const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        maxlength: 500,
        required:true
    },
    description: {
        type: String,
        maxlength: 500,
    },
    category:{
        type:String,
        maxlength: 50 
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice:{
        type:Number,
        required: false
    },
    percentageDiscount:{
        required: false,
        default: ((price - discountedPrice)/price) * 100
    },
    colour: {
        required: false,
    },
    size: {
        required:false
    }
},{
    timestamps: true
});

productSchema.set("toJSON", {
    transform: function (doc, returnedResult, options) {
      returnedResult.id = returnedResult._id;
      delete returnedResult._id;
      delete returnedResult.__v;
      delete returnedResult.updatedAt;
    },
  });

const Product = mongoose.model('Product', productSchema);

exports.Product = Product;


