const Review = require("../models/reviewModel");
const { getPostData } = require("../utils/utils");

// get reviews GET /get-api-reviews
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

module.exports = {
    getApiReviews
};