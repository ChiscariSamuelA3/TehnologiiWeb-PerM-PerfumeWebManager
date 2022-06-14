const Cart = require("../models/cartModel");

const { getPostData } = require("../utils/utils");

// get carts GET /get-carts/{userId}
async function getCarts(req, res, userId) {

  try {
    const carts = await Cart.findAll(userId);
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(carts));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// get cart GET /get-cart/{userId}/{id}
async function getCart(req, res, userId, id) {
  try {
    const cart = await Cart.findById(userId, id);

    if (!cart) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Cart Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(cart));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// create cart POST /add-cart
async function saveCart(req, res) {
  try {
    const body = await getPostData(req);

    const { userId, productId, quantity, price } = JSON.parse(body);

    const cart = new Cart(userId, productId, quantity, price);
    cart.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(cart));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// delete cart DELETE /delete-cart/{userId}/{id}
async function deleteCart(req, res, userId, id) {
  try {
    const cart = await Cart.findById(userId, id);

    if (!cart) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Cart Not Found" }));
    } else {
      await Cart.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message:`Cart ${id} removed`}));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// update cart PATCH /update-cart/{userId}/{id}/{quantity}
async function updateCart(req, res, userId, id, quantity) {
  try {
    const cart = await Cart.findById(userId, id);

    if (!cart) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Cart Not Found" }));
    } else {
      const updatedCart = await Cart.updateCart(id, quantity)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedCart));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getCarts,
  getCart,
  saveCart,
  deleteCart,
  updateCart
};
