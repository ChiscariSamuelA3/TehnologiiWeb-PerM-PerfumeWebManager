const Product = require("../models/productsModel");
const jwt = require("jsonwebtoken");

const { getPostData } = require("../utils/utils");

// get products GET /get-products
async function getProducts(req, res) {

  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// get product GET /get-product/{id}
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// create product POST /add-product
async function saveProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, gender, season, smell, price, longdescription, shortdescription, imageurl, quantity } = JSON.parse(body);

    const product = new Product(name, gender, season, smell, price, longdescription, shortdescription, imageurl, quantity);
    product.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// delete product DELETE /delete-product/{id}
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message:`Product ${id} removed`}));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// update product PATCH /update-product/{id}/{quantity}
async function updateProduct(req, res, id, quantity) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const updatedProduct = await Product.updateProduct(id, quantity)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  updateProduct
};
