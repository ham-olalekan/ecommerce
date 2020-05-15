const { Product } = require("../models/product");
var mongoosePaginate = require("mongoose-paginate");

async function getAllProducts(queryParams) {
  const { page, size } = queryParams;

  Product.paginate({}, { page, size })
    .then((products) => {
      return Promise.resolve(products);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

async function getProductById(productId) {
  Product.findById(productId)
    .then((productDetails) => {
      return Promise.resolve(productDetails);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

exports.getAllProducts = getAllProducts,
exports.getProductById = getProductById

