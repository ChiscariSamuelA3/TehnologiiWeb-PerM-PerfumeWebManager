const {getProducts, getProduct, saveProduct, deleteProduct} = require('../controllers/productsController')

function productsRoute(req, res) {
    if(req.url === '/get-products' && req.method === 'GET') {
        getProducts(req, res)
    }
    else if(req.url.match(/\/get-product\/([0-9a-z]+)/) && req.method === 'GET') {
        
        const id = req.url.split('/')[2]

        getProduct(req, res, id)
    }
    else if(req.url === '/add-product' && req.method === 'POST') {
        saveProduct(req, res)
    }
    else if(req.url.match(/\/delete-product\/([0-9a-z]+)/) && req.method === 'DELETE') {
        
        const id = req.url.split('/')[2]

        deleteProduct(req, res, id)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    productsRoute
}