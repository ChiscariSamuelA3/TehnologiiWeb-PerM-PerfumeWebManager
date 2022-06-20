const {getCarts, getApiCarts, getCart, saveCart, deleteCart, deleteProductCart, updateCart, confirmOrder} = require('../controllers/cartController')
var sanitize = require('mongo-sanitize')

function cartRoute(req, res) {
    
    if(req.url.match(/\/get-carts\/([0-9a-z]+)/) && req.method === 'GET') {

        const userId = sanitize(req.url.split('/')[2])

        getCarts(req, res, userId)
    }
    else if(req.url === '/get-api-carts' && req.method === 'GET') {
        getApiCarts(req, res)
    }
    else if(req.url.match(/\/get-cart\/([0-9a-z]+)\/([0-9a-z]+)/) && req.method === 'GET') {
        
        const userId = sanitize(req.url.split('/')[2])
        const id = sanitize(req.url.split('/')[3])

        getCart(req, res, userId, id)
    }
    else if(req.url === '/add-cart' && req.method === 'POST') {
        saveCart(req, res)
    }
    else if(req.url === '/confirm-order' && req.method === 'GET') {
        confirmOrder(req, res)
    }
    else if(req.url.match(/\/delete-cart\/([0-9a-z]+)/) && req.method === 'DELETE') {

        const userId = sanitize(req.url.split('/')[2])
        const id = sanitize(req.url.split('/')[3])

        deleteCart(req, res, userId, id)
    }
    else if(req.url === '/delete-api-cart' && req.method === 'DELETE') {
        deleteProductCart(req, res)
    }
    else if(req.url.match(req.url.match(/\/update-cart/)) && req.method === 'PATCH') {
        const userId = sanitize(req.url.split('/')[2])
        const id = sanitize(req.url.split('/')[3])
        const quantity = sanitize(req.url.split('/')[4])

        updateCart(req, res, userId, id, quantity)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    cartRoute
}