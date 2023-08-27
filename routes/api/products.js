const express = require("express");
const cors = require("cors");

const upload = require("../../middleware/multer");

const Product = require("../../models/Product");

const router = express.Router();

// middle ware
express().use(express.static("public")); //to access the files in public folder
express().use(cors()); // it enables all cors requests

router.post("/register", upload.single("file"), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename
  });

  product.save();

  res.json(product);
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

router.post("/update", upload.single("file"), async (req, res) => {
  const id = req.body.id;

  await Product.findByIdAndUpdate(id, {
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
    date_u: Date.now()
  });

  res.json("success");
});

router.post("/delete", async (req, res) => {
  try {
    const id = req.body.id
    await Product.findByIdAndDelete(id);

    res.send("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
