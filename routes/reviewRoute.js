const { getApiReviews } = require('../controllers/reviewController')
var sanitize = require('mongo-sanitize')

function reviewRoute(req, res) {
    if(req.url.match(/^\/get-api-reviews\/([0-9a-z]{24})$/) && req.method === 'GET') { 
        const prodId = sanitize(req.url.split('/')[2])

        getApiReviews(req, res, prodId)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    reviewRoute
}