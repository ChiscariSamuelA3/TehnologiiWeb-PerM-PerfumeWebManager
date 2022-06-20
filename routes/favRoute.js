const {getFavorites, getApiFavorites, getFavorite, saveFav, deleteFav, deleteProductFav} = require('../controllers/favController')
var sanitize = require('mongo-sanitize')

function favRoute(req, res) {
    
    if(req.url.match(/\/get-favorites\/([0-9a-z]+)/) && req.method === 'GET') {

        const userId = sanitize(req.url.split('/')[2])

        getFavorites(req, res, userId)
    }
    else if(req.url === '/get-api-favorites' && req.method === 'GET') {
        getApiFavorites(req, res, 1)
    }
    else if(req.url === '/get-api-suggestions' && req.method === 'GET') {
        getApiFavorites(req, res, 2)
    }
    else if(req.url.match(/\/get-favorite\/([0-9a-z]+)\/([0-9a-z]+)/) && req.method === 'GET') {
        
        const userId = sanitize(req.url.split('/')[2])
        const id = sanitize(req.url.split('/')[3])

        getFavorite(req, res, userId, id)
    }
    else if(req.url === '/add-fav' && req.method === 'POST') {
        saveFav(req, res)
    }
    else if(req.url.match(/\/delete-fav\/([0-9a-z]+)/) && req.method === 'DELETE') {

        const userId = sanitize(req.url.split('/')[2])
        const id = sanitize(req.url.split('/')[3])

        deleteFav(req, res, userId, id)
    }
    else if(req.url === '/delete-api-fav' && req.method === 'DELETE') {
        deleteProductFav(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    favRoute
}