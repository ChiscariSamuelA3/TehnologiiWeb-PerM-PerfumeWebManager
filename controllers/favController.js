const Favorite = require("../models/favModel");
const { getPostData } = require("../utils/utils");
const jwt = require("jsonwebtoken");

// get favorites GET /get-favorites/{userId}
async function getFavorites(req, res, userId) {
  try {
    const favs = await Favorite.findAll(userId);
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(favs));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// get favs GET /get-api-favorites
async function getApiFavorites(req, res, type) {
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
      res.end(JSON.stringify({ route: "/Login.html", message: "You must login to view the Favorite List!" }));
    }
    else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const userId = decodedToken['data']['id']

      // produsele favorite pt userId-ul utilizatorului care este logat in sesiunea curenta
      const favorites = await Favorite.findAllByType(userId, type);
      

      // extrage din baza de date numele si imaginile produselor, pe baza id-urilor produselor din Fav List
      var names = []
      var images = []
      var prices = []

      for(const fav of favorites) {
        const extractProduct = await Favorite.findByProdId(fav['productId'])
        names.push(extractProduct[0]['name'])
        images.push(extractProduct[0]['imageurl'])
        prices.push(extractProduct[0]['price'])
      }
      
      res.writeHead(200, { "Content-Type": "application/json"});
      res.end(JSON.stringify({favorites, names, images, prices}));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// get favorite GET /get-favorite/{userId}/{id}
async function getFavorite(req, res, userId, id) {
  try {
    const favorite = await Favorite.findById(userId, id);

    if (!favorite) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Fav Not Found" }));
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

// create fav POST /add-fav
async function saveFav(req, res) {
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
      res.end(JSON.stringify({ route: "/index.html", message: "You must login to add product to favorite list!" }));
    }
    else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      // user id care e logat
      const userId = decodedToken['data']['id']

      // cauta daca produsul exista deja in lista de favorite
      const isProductFav = await Favorite.findByUserIdProductIdType(userId, clickedProductId, 1)

      // cauta produsul care se doreste a fi adaugat in lista
      const productCatalog = await Favorite.findCatalogProduct(clickedProductId)

      // verifica daca produsul e deja in lista
      if(!isProductFav.length) {
    
        // adauga produsul in lista
        const fav = new Favorite(userId, clickedProductId, 1);
        fav.save();

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(fav));
      }
      else {
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ route: "/index.html", message: "Product already exists in favorite list!" }));
      }
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// delete favorite product DELETE /delete-fav/{userId}/{id}
async function deleteFav(req, res, userId, id) {
  try {
    const fav = await Favorite.findById(userId, id);

    if (!fav) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Favorite product Not Found" }));
    } else {
      await Favorite.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message:`Favorite product ${id} removed`}));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// delete product favorite DELETE /delete-api-fav
async function deleteProductFav(req, res) {
  
  try {
    const body = await getPostData(req);

    const { favId } = JSON.parse(body);

    // cauta produsul din lista care se doreste a fi sters
    const productFav = await Favorite.findFavProduct(favId)

    // stege din lista
    await Favorite.remove(favId)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({message:`Favorite product ${favId} removed`}));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getFavorites,
  getApiFavorites,
  getFavorite,
  saveFav,
  deleteFav,
  deleteProductFav
};
