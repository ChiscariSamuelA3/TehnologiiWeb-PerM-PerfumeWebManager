const Product = require("../models/productsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { getPostData } = require("../utils/utils");

// get products GET /get-products
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

// get filters GET /get-filters/{floral}/{oriental}/{lemnos}
async function getFilters(req, res, floral, oriental, lemnos) {
  try {
    const products = await Product.findAllByFilters(floral, oriental, lemnos);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

//get stats GET /get-api-stats
async function getStats(req, res) {
  try {

    let value = "";
    let token = "";
    const cookieHeader = req.headers?.cookie;

    if (cookieHeader) {
      cookieHeader.split(`;`).forEach((cookie) => {
        let [name, ...rest] = cookie.split(`=`);
        if (name === "jwt") {
          value = rest.join(`=`).trim();
          if (value) {
            token = decodeURIComponent(value);
          }
        }
      });
    }

    if (value === "" || value === "undefined") {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          route: "/Login.html",
          message: "You must login as an ADMIN to view the STATS!",
        })
      );
    } else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //const userId = decodedToken['data']['id']

      const loginUser = await Product.findByUserId(decodedToken['data']['id']);

      if (bcrypt.compareSync(process.env.ADMIN_PASSWORD, loginUser[0]["password"])) {
        // e admin
        
        const products = await Product.findAll();

        let avgReviews = []
  
        // pentru fiecare produs, calculez media recenziilor
        for(const product of products) {
          let avg = 0
          let sum = 0
          let len = 0
          const productReviews = await Product.findReviews(product._id)
          for(const review of productReviews) {
            len++
            sum += review.grade
          }

          if(len === 0) {
            avg = 0
          }
          else {
            avg = (sum / len).toFixed(2)
          }

          avgReviews.push(avg)

        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({products, avgReviews}));
      }
      else {
        // nu e admin

        console.log("[product-controller] You are not an admin!");
        res.writeHead(409, { "Content-Type": "application/json" });
        res.end(
              JSON.stringify({
                route: "/index.html",
                message: "You are not an ADMIN!",
              })
            );
      }
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

    const {
      name,
      gender,
      season,
      smell,
      price,
      longdescription,
      shortdescription,
      imageurl,
      quantity,
      category,
      initialstock,
    } = JSON.parse(body);

    // userId il iau din token-ul din cookie...
    let value = "";
    let token = "";
    const cookieHeader = req.headers?.cookie;

    if (cookieHeader) {
      cookieHeader.split(`;`).forEach((cookie) => {
        let [name, ...rest] = cookie.split(`=`);
        if (name === "jwt") {
          value = rest.join(`=`).trim();
          if (value) {
            token = decodeURIComponent(value);
          }
        }
      });
    }

    if (value === "" || value === "undefined") {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          route: "/Login.html",
          message: "You must login as an ADMIN to add a product!",
        })
      );
    } else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //const userId = decodedToken['data']['id']

      // pun in token si isAdmin 0/1 si verific
      const loginUser = await Product.findByUserId(decodedToken['data']['id']);

      console.log(loginUser[0]["password"], " SI ", process.env.ADMIN_PASSWORD)


      if (bcrypt.compareSync(process.env.ADMIN_PASSWORD, loginUser[0]["password"])) {
        // este admin
        if (Product.validateFormat(name) === null) {
          console.log(
            "[user-controller] Product name format is invalid. Don't use special characters such as $, <>, ! or {}!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/Add.html",
              message:
                "Username format is invalid. Don't use special characters such as $, ! or {}!",
            })
          );
        } else {
          const findProduct = await Product.findByName(name);
  
          if (!findProduct.length) {
            if (
              Product.validateLength(shortdescription) === false ||
              Product.validateLength(longdescription) === false
            ) {
              console.log("[product-controller] Description too long (> 35)!");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  route: "/Add.html",
                  message: "Description too long (> 35)!",
                })
              );
            } else if (
              Product.validateFormat(shortdescription) === null ||
              Product.validateFormat(longdescription) === null
            ) {
              console.log(
                "[product-controller] Description must not contain special characters such as $, ! or {}!"
              );
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  route: "/Add.html",
                  message:
                    "Description must not contain special characters such as $, ! or {}!",
                })
              );
            } else if (
              Product.validateNumber(price) === null ||
              Product.validateNumber(quantity) === null
            ) {
              console.log(
                "[product-controller] Price and Quantity should be natural numbers!"
              );
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  route: "/Register.html",
                  message: "Price and Quantity should be natural numbers!",
                })
              );
            } else if (Product.validateImageUrl(imageurl) === null) {
              console.log("[product-controller] Invalid image URL!");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  route: "/Register.html",
                  message: "Invalid image URL!",
                })
              );
            } else {
              const product = new Product(
                name.toLowerCase(),
                gender.toLowerCase(),
                season.toLowerCase(),
                smell.toLowerCase(),
                price,
                longdescription.toLowerCase(),
                shortdescription.toLowerCase(),
                imageurl,
                quantity,
                category.toLowerCase(),
                initialstock
              );
              product.save();
  
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  route: "/index.html",
                  message: "Product has been added successfully!",
                })
              );
            }
          } else {
            console.log(
              "[product-controller] Product name (%s) already exists!",
              name
            );
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                route: "/Add.html",
                message: "Product name already exists!",
              })
            );
          }
        }
      }
      else {
        console.log("[product-controller] You are not an admin!");
        res.writeHead(409, { "Content-Type": "application/json" });
        res.end(
              JSON.stringify({
                route: "/index.html",
                message: "You are not an ADMIN!",
              })
            );
      }
    }
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
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
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
      const updatedProduct = await Product.updateProduct(id, quantity);
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
  updateProduct,
  getFilters,
  getStats,
};
