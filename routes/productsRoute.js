const {getProducts, getProduct, saveProduct, deleteProduct, updateProduct, getFilters, getStats} = require('../controllers/productsController')
const { fileRouter } = require('./filesRoute')
var sanitize = require('mongo-sanitize')

function productsRoute(req, res) {
    
    if(req.url === '/get-products' && req.method === 'GET') {
        getProducts(req, res)
    }
    else if(req.url.match(/^\/get-product\/([0-9a-z]{24})$/) && req.method === 'GET') {
        
        const id = sanitize(req.url.split('/')[2])

        getProduct(req, res, id)
    }
    else if(req.url.match(/^\/get-filters\/(true|false)\/(true|false)\/(true|false)$/) && req.method === 'GET') {
        
        const floral = sanitize(req.url.split('/')[2])
        const oriental = sanitize(req.url.split('/')[3])
        const lemnos = sanitize(req.url.split('/')[4])

        getFilters(req, res, floral, oriental, lemnos)
    }
    else if(req.url === '/add-product' && req.method === 'POST') {
        saveProduct(req, res)
    }
    else if(req.url.match(/^\/delete-product\/([0-9a-z]{24})$/) && req.method === 'DELETE') {
        
        const id = sanitize(req.url.split('/')[2])

        deleteProduct(req, res, id)
    }
    else if(req.url.match(/^\/update-product\/([0-9a-z]{24})\/(0|[1-9]\d+)$/) && req.method === 'PATCH') {
        const id = sanitize(req.url.split('/')[2])
        const quantity = sanitize(req.url.split('/')[3])

        updateProduct(req, res, id, quantity)
    }
    else if(req.url === '/' || req.url.match(/([0-9a-zA-Z]+.html)/) || req.url.match(/([0-9a-zA-Z]+.html\?floral=(true|false)&oriental=(true|false)&lemnos=(true|false))/) || req.url.match(/^(\/[0-9a-zA-Z]+.html\?id=[0-9a-z]{24})$/) || req.url.match(/([0-9a-zA-Z]+.(css|js|png|jpg))/) && req.method === 'GET') {
        fileRouter(req, res)
    }
    else if(req.url === '/get-api-stats' && req.method === 'GET') {
        getStats(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    productsRoute
}