const {productsRoute} = require('./productsRoute')


async function router(req, res) {
    if(req.url === '/get-products') {
        console.log("[router] get-products api")
        productsRoute(req, res)
    }
    else if(req.url === '/add-product') {
        console.log("[router] save-product api")
        productsRoute(req, res)
    }
    else {
        console.log("[router] 404 error Page Not Found")
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: "Page not found"}))
    }
}

module.exports = {
    router
}