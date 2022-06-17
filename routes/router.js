const { productsRoute } = require('./productsRoute')
const { usersRoute } = require('./usersRoute')
const { cartRoute } = require('./cartRoute')

async function router(req, res) {

    if (req.url === '/get-products') { // products
        console.log("[router] get-products api")
        productsRoute(req, res)
    } 
    else if (req.url.match(/\/get-product\/([0-9a-z]+)/)) {
        console.log("[router] get-product api")
        productsRoute(req, res)
    } 
    else if (req.url === '/add-product') {
        console.log("[router] save-product api")
        productsRoute(req, res)
    } 
    else if (req.url.match(/\/delete-product\/([0-9a-z]+)/)) {
        console.log("[router] delete-product api")
        productsRoute(req, res)
    } 
    else if (req.url.match(req.url.match(/\/update-product/))) {
        console.log("[router] update-product api")
        productsRoute(req, res)
    } 
    else if (req.url === '/' || req.url.match(/([0-9a-zA-Z]*.html)/) || req.url.match(/([0-9a-zA-Z]*.html?id=[0-9a-z]*)/) || req.url.match(/([0-9a-zA-Z]*.css)/) || req.url.match(/([0-9a-zA-Z]*.js)/) || req.url.match(/([0-9a-zA-Z]*.jpg)/) || req.url.match(/([0-9a-zA-Z]*.png)/)) {
        console.log("[router] public route", req.url)
        productsRoute(req, res)
    } 
    else if (req.url.match(/\/get-carts\/([0-9a-z]+)/)) { // carts
        console.log("[router] get-carts api")
        cartRoute(req, res)
    } 
    else if(req.url === '/get-api-carts') {
        console.log("[router] get-api-carts")
        cartRoute(req, res)
    } 
    else if (req.url.match(/\/get-cart\/([0-9a-z]+)\/([0-9a-z]+)/)) {
        console.log("[router] get-cart api")
        cartRoute(req, res)
    } 
    else if (req.url === '/add-cart') {
        console.log("[router] save-cart api")
        cartRoute(req, res)
    } 
    else if (req.url.match(/\/delete-cart\/([0-9a-z]+)/)) {
        console.log("[router] delete-cart api")
        cartRoute(req, res)
    } 
    else if(req.url === '/delete-api-cart') {
        console.log("[router] delete-api-cart")
        cartRoute(req, res)
    } 
    else if (req.url.match(req.url.match(/\/update-cart/))) {
        console.log("[router] update-cart api")
        cartRoute(req, res)
    } 
    else if (req.url === '/get-users') { // users
        console.log("[router] get-users api")
        usersRoute(req, res)
    } 
    else if (req.url.match(/\/get-user\/([0-9a-z]+)/)) {
        console.log("[router] get-user api")
        usersRoute(req, res)
    } 
    else if (req.url === '/add-user') {
        console.log("[router] save-user api")
        usersRoute(req, res)
    } 
    else if (req.url === '/login-user') {
        console.log("[router] login-user api")
        usersRoute(req, res)
    } 
    else if (req.url.match(/\/delete-user\/([0-9a-z]+)/)) {
        console.log("[router] delete-user api")
        usersRoute(req, res)
    } 
    else {
        console.log("[router] 404 error Page Not Found")
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: "Page not found" }))
    }
}

module.exports = {
    router
}