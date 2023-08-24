const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const upload = require("../../middleware/multer");
const Product = require("../../models/Product");

const router = express.Router();

// middle ware
express().use(express.static("public")); //to access the files in public folder
express().use(cors()); // it enables all cors requests
express().use(fileUpload());

// @route    POST api/products
// @desc     Register product
// @access   private

router.post("/register", upload.single("file"), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename
  });
  product.save();
  res.json("success");
});

router.get("/get", async (req, res) => {
  try {
    const filter = {};
    const products = await Product.find(filter);

    if (products) {
      return res.send(products);
    } 
    res.send("no products");   
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}); 

router.post(
  "/update",
  upload.single("file"),async (req, res) => {
        const id = req.body.id;
       const product = await Product.findByIdAndUpdate(id,{
          name: req.body.name,
          description: req.body.description,
          image: req.file.filename
        });
        console.log(req.body); 
        console.log(product);
        product.save();
        res.json("success"); 
    } 
);

router.post("/delete", async (req, res) => {
  try {

    let product = await Product.findByIdAndDelete(req.body.id);
    console.log("product:: => ", product);
    if (!product) {
      res.send("no product");
      return;
    }
    res.send("success"); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
