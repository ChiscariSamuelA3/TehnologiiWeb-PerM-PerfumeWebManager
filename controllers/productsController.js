const Product = require("../models/productsModel");

const { getPostData } = require("../utils/utils");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

async function saveProduct(req, res) {
  try {
      const body = await getPostData(req)

      const { name, gender, season, smell, price } = JSON.parse(body);

      const product = new Product(name, gender, season, smell, price);
      product.save();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));

  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getProducts,
  saveProduct,
};