const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../services/productService");
const validateObjectId = require("../middlewares/validateObjectId");

router.get("/", async (req, res) => {
  let { page, size } = req.query;

  page = page ? page : 1;
  size = size ? size : 20;

  try {
    let allProducts = await getAllProducts({ page, size });
    allProducts = allProducts ? allProducts : [];
    return res.status(200).send({ status: true, data: allProducts });
  } catch (error) {
    console.log(`Error occurred while trying to fetch all products: `, error);
    return res.status(500).send({
      status: false,
      message:
        "Oops we were unable to fetch products at the moment, this will be fixed shortly...",
    });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {

  const { id } = req.params;

  try {
    let productDetails = await getProductById(id);
    productDetails = productDetails ?  productDetails: {};
    return res.status(200).send({
      status: true,
      data: productDetails,
    });
  } catch (error) {
    console.log(
      `Error occured while trying to fetch product by Id ${id}`,
      error
    );
    return res.status(500).send({
      status: false,
      message:
        "Oops we were unable to fetch products at the moment, this will be fixed shortly...",
    });
  }
});

module.exports = router;
