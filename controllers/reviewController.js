const Review = require("../models/reviewModel");
const { getPostData } = require("../utils/utils");
const jwt = require("jsonwebtoken");

// get reviews GET /get-api-reviews/{prodId}
async function getApiReviews(req, res, prodId) {
    try {
        // reviews pentru produsul cu id-ul prodId
        const reviews = await Review.findAll(prodId);
  
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify(reviews));
      
    } catch (err) {
      console.log(err);
  
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(err));
    }
}

// add review POST /add-review
async function addNewReview(req, res, prodId) {
    try {
        const body = await getPostData(req);

        const { idProd, reviewContent, reviewRate } = JSON.parse(body);

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
          res.end(JSON.stringify({ route: "/Login.html", message: "You must login to add a review!" }));
        }
        else {
            // decodificare token preluat din cookie
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            // username-ul celui care vrea sa adauge review-ul
            const username = decodedToken['data']['username']

            if(Review.validateLength(reviewContent) === false) {
                console.log("[review-controller] Review too long (> 45)!");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        route: `/product.html?id=${idProd}`,
                        message: "Description too long (> 45)!",
                    })
                  );
            }
            else if(Review.validateFormat(reviewContent) === null) {
                console.log(
                    "[review-controller] Review must not contain special characters such as $, <>, (), ! or {}!"
                  );
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(
                    JSON.stringify({
                        route: `/product.html?id=${idProd}`,
                        message: "Review must not contain special characters such as $, <>, (), ! or {}!",
                    })
                  );
            }
            else {
                // adauga produsul in cos
                const review = new Review(reviewContent, reviewRate, idProd, username);
                review.save();

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    route: `/product.html?id=${idProd}`,
                    message:
                      "Thanks for the review!",
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


module.exports = {
    getApiReviews,
    addNewReview
};