const {productsRoute} = require('./productsRoute')
const {usersRoute} = require('./usersRoute')


async function router(req, res) {
    if(req.url === '/get-products') {
        console.log("[router] get-products api")
        productsRoute(req, res)
    }
    else if(req.url.match(/\/get-product\/([0-9a-z]+)/)) {
        console.log("[router] get-product api")
        productsRoute(req, res)
    }
    else if(req.url === '/add-product') {
        console.log("[router] save-product api")
        productsRoute(req, res)
    }
    else if(req.url.match(/\/delete-product\/([0-9a-z]+)/)) {
        console.log("[router] delete-product api")
        productsRoute(req, res)
    }
    else if(req.url === '/get-users') {
        console.log("[router] get-users api")
        usersRoute(req, res)
    }
    else if(req.url.match(/\/get-user\/([0-9a-z]+)/)) {
        console.log("[router] get-user api")
        usersRoute(req, res)
    }
    else if(req.url === '/add-user') {
        console.log("[router] save-user api")
        usersRoute(req, res)
    }
    else if(req.url.match(/\/delete-user\/([0-9a-z]+)/)) {
        console.log("[router] delete-user api")
        usersRoute(req, res)
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