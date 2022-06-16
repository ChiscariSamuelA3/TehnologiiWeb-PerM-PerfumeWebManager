const Cart = require("../models/cartModel");
const { getPostData } = require("../utils/utils");
const jwt = require("jsonwebtoken");

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

// get carts GET /get-api-carts
async function getApiCarts(req, res) {
  try {
    // userId il iau din token-ul din cookie...

    let value = ""
    let token = ""
    const cookieHeader = req.headers?.cookie
    
    if(cookieHeader) {
      cookieHeader.split(`;`).forEach(cookie => {
        let [name, ...rest] = cookie.split(`=`)
        if(name === "jwt") {
          value = rest.join(`=`).trim()
          if(value) {
            token =  decodeURIComponent(value)
          }
        }
      });
    }
    
    if(value === "" || value === "undefined") {
      res.writeHead(401, { "Content-Type": "application/json"});
      res.end(JSON.stringify({ route: "/Login.html", message: "You must login to view the cart page!" }));
    }
    else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const userId = decodedToken['data']['id']

      // userId-ul utilizatorului care este logat in sesiunea curenta
      const carts = await Cart.findAll(userId);
      

      // extrage din baza de date numele si imaginile produselor, pe baza id-urilor produselor din cos
      var names = []
      var images = []
      for(const cart of carts) {
        const extractProduct = await Cart.findByProdId(cart['productId'])
        names.push(extractProduct[0]['name'])
        images.push(extractProduct[0]['imageurl'])
      }
      
      res.writeHead(200, { "Content-Type": "application/json"});
      res.end(JSON.stringify({carts, names, images}));
    }
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

    const { clickedProductId } = JSON.parse(body);


    let value = ""
    let token = ""
    const cookieHeader = req.headers?.cookie
    
    if(cookieHeader) {
      cookieHeader.split(`;`).forEach(cookie => {
        let [name, ...rest] = cookie.split(`=`)
        if(name === "jwt") {
          value = rest.join(`=`).trim()
          if(value) {
            token =  decodeURIComponent(value)
          }
        }
      });
    }
    
    if(value === "" || value === "undefined") {
      res.writeHead(401, { "Content-Type": "application/json"});
      res.end(JSON.stringify({ route: "/index.html", message: "You must login to add product to cart!" }));
    }
    else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      // user id care e logat
      const userId = decodedToken['data']['id']

      // cauta daca produsul exista deja in cosul userului
      const isProductCart = await Cart.findByUserIdProductId(userId, clickedProductId)

      // cauta produsul care se doreste a fi adaugat in cos
      const productCatalog = await Cart.findCatalogProduct(clickedProductId)

      // CAZUL IN CARE ACEL PRODUS NU SE MAI AFLA PE STOC (PRODUCT QUANTITY)-> NU MAI E ADAUGAT -> ALERT MESSAGE

      // verifica daca produsul e deja in cos
      if(!isProductCart.length) {
        // produsul nu e in cos inca -> cantitate adaugata 1
        console.log("NU EXISTA IN DB", productCatalog[0].quantity)

        // verifica daca produsul mai este in stoc, pentru a putea fi adaugat in cos
        if(productCatalog[0].quantity === 0) {
          res.writeHead(403, { "Content-Type": "application/json"});
          res.end(JSON.stringify({ route: "/index.html", message: "The product is no longer in stock!" }));
        }
        else {
          // adauga produsul in cos
          const cart = new Cart(userId, clickedProductId, 1, productCatalog[0].price);
          cart.save();

          // actualizeaza stocul pt acel produs din catalog cu -1
          await Cart.updateCatalogProduct(clickedProductId, productCatalog[0].quantity - 1)

          res.writeHead(201, { "Content-Type": "application/json" });
          //res.end(JSON.stringify(cart));
          res.end(JSON.stringify(cart));
        }
      }
      else {
        // produsul e deja in cos -> update la cantitate + 1
        console.log("EXISTA DEJA IN DB", isProductCart[0]._id, isProductCart[0].quantity)

        // verifica daca produsul mai este in stoc, pentru a putea fi adaugat in cos
        if(productCatalog[0].quantity === 0) {
          res.writeHead(403, { "Content-Type": "application/json"});
          res.end(JSON.stringify({ route: "/index.html", message: "The product is no longer in stock!" }));
        }
        else {
          // actualizare cantitate produs in cos
          await Cart.updateCart(isProductCart[0]._id, isProductCart[0].quantity + 1)

          // actualizeaza stocul pt acel produs din catalog cu -1
          await Cart.updateCatalogProduct(clickedProductId, productCatalog[0].quantity - 1)

          res.writeHead(201, { "Content-Type": "application/json" });
          //res.end(JSON.stringify(cart));
          res.end(JSON.stringify({userId, clickedProductId}));
        }
        
      }
    }
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

// delete product cart DELETE /delete-api-cart
async function deleteProductCart(req, res) {
  
  try {
    const body = await getPostData(req);

    const { cartId } = JSON.parse(body);

    // cauta produsul din cos care se doreste a fi sters
    const productCart = await Cart.findCartProduct(cartId)

    //cauta produsul din catalog pentru a ii reactualiza stocul cu ce a fost adaugat in cos
    const productRestock = await Cart.findProductRestock(productCart[0].productId)

    // restock
    await Cart.restockCatalogProduct(productRestock[0]._id, productRestock[0].quantity + productCart[0].quantity)

    // stege din cos dupa ce a fost readaugat stocul
    await Cart.remove(cartId)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message:`Cart ${cartId} removed`}));
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
  getApiCarts,
  getCart,
  saveCart,
  deleteCart,
  deleteProductCart,
  updateCart
};
