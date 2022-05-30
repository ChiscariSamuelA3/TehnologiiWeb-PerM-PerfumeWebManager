const {getProducts, saveProduct} = require('../controllers/productsController')

function productsRoute(req, res) {
    if(req.url === '/get-products' && req.method === 'GET') {
        getProducts(req, res)
    }
    else if(req.url === '/add-product' && req.method === 'POST') {
        saveProduct(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    productsRoute
}