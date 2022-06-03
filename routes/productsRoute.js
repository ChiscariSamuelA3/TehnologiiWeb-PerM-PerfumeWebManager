const {getProducts, getProduct, saveProduct, deleteProduct, updateProduct} = require('../controllers/productsController')
const { fileRouter } = require('./filesRoute')

function productsRoute(req, res) {
    
    if(req.url === '/get-products' && req.method === 'GET') {
        console.log('DADA')
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
    else if(req.url.match(req.url.match(/\/update-product/)) && req.method === 'PATCH') {
        const id = req.url.split('/')[2]
        const quantity = req.url.split('/')[3]

        updateProduct(req, res, id, quantity)
    }
    else if(req.url.match(/([0-9a-zA-Z]*.[a-z]*)/) && req.method === 'GET') {
        fileRouter(req, res)(/([0-9a-zA-Z]*.html)/) || req.url.match(/([0-9a-zA-Z]*.css)/) || req.url.match(/([0-9a-zA-Z]*.js)/) || req.url.match(/([0-9a-zA-Z]*.jpg)/) || req.url.match(/([0-9a-zA-Z]*.png)/)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    productsRoute
}