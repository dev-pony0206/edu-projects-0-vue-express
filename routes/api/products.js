const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const { check, validationResult } = require('express-validator');

const Product = require('../../models/Product');

const router = express.Router();

// middle ware
express().use(express.static('public')); //to access the files in public folder
express().use(cors()); // it enables all cors requests
express().use(fileUpload());

// @route    POST api/products
// @desc     Register product
// @access   private
router.post(
  '/register',
  check('name', 'Name is required').notEmpty(),
  check('description', 'description is required').notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, image } = req.body;

     //  mv() method places the image inside public directory
    image.mv(`${__dirname}/public/${image.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
    });

    try {
      let product = await Product.findOne({ name });

      if (product) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Product already exists' }] });
      }

      product = new Product({
        name,
        description,
        image:`/${image.name}`
      });

      await product.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get(
  '/get',
  async (req, res) => {
    try {
      const filter = {};
      const products = await Product.find(filter);

      if (products) {
        return res
          .send( products);
      }
      res.send("no products")

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post(
  '/update',
  check('name', 'Name is required').notEmpty(),
  check('description', 'description is required').notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, image , id} = req.body;
      image.mv(`${__dirname}/public/${image.name}`);
      await Product.updateOne({ id :{ id}},{$set :{"name" : {name}," description" : {description},"image":`/${image.name}`,"date_u":{Date}}});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/delete',
  async (req, res) => {
    try {
      const name = req.body.name;

      await Product.findOneAndRemove({name});
      res.send("success")

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
