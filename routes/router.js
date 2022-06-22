const { productsRoute } = require('./productsRoute')
const { usersRoute } = require('./usersRoute')
const { cartRoute } = require('./cartRoute')
const { favRoute } = require('./favRoute')
const { preferenceRoute } = require('./preferenceRoute')
const { reviewRoute } = require('./reviewRoute')

async function router(req, res) {

    if (req.url === '/get-products') { // products
        console.log("[router] get-products api")
        productsRoute(req, res)
    } 
    else if(req.url === '/api/stats/html') { //stats
        console.log("[router] html stats")
        productsRoute(req, res)
    }
    else if(req.url === '/api/stats/json') { // stats
        console.log("[router] json stats")
        productsRoute(req, res)
    }
    else if(req.url === '/api/stats/pdf') { // stats
        console.log("[router] pdf stats")
        productsRoute(req, res)
    }
    else if (req.url.match(/^\/get-product\/([0-9a-z]{24})$/)) {
        console.log("[router] get-product api")
        productsRoute(req, res)
    } 
    else if(req.url.match(/^\/get-filters\/(true|false)\/(true|false)\/(true|false)$/)) {
        console.log("[router] get-filters")
        productsRoute(req, res)
    }
    else if (req.url === '/add-product') {
        console.log("[router] save-product api")
        productsRoute(req, res)
    } 
    else if (req.url.match(/^\/delete-product\/([0-9a-z]{24})$/)) {
        console.log("[router] delete-product api")
        productsRoute(req, res)
    } 
    else if (req.url.match(/^\/update-product\/([0-9a-z]{24})\/(0|[1-9]\d*)$/)) {
        console.log("[router] update-product api")
        productsRoute(req, res)
    } 
    else if (req.url === '/' || req.url.match(/([0-9a-zA-Z]+.html)/) || req.url.match(/([0-9a-zA-Z]+.html\?floral=(true|false)&oriental=(true|false)&lemnos=(true|false))/) || req.url.match(/^(\/[0-9a-zA-Z]+.html\?id=[0-9a-z]{24})$/) || req.url.match(/([0-9a-zA-Z]+.(css|js|png|jpg|pdf))/)) {
        console.log("[router] public route", req.url)
        productsRoute(req, res)
    } 
    else if (req.url.match(/^\/get-carts\/([0-9a-z]{24})$/)) { // carts
        console.log("[router] get-carts api")
        cartRoute(req, res)
    } 
    else if(req.url === '/get-api-carts') {
        console.log("[router] get-api-carts")
        cartRoute(req, res)
    } 
    else if (req.url.match(/^\/get-cart\/([0-9a-z]{24})\/([0-9a-z]{24})$/)) {
        console.log("[router] get-cart api")
        cartRoute(req, res)
    } 
    else if (req.url === '/add-cart') {
        console.log("[router] save-cart api")
        cartRoute(req, res)
    } 
    else if(req.url === '/confirm-order') {
        console.log("[router] confirm-order api")
        cartRoute(req, res)
    }
    else if (req.url.match(/^\/delete-cart\/([0-9a-z]{24})$/)) {
        console.log("[router] delete-cart api")
        cartRoute(req, res)
    } 
    else if(req.url === '/delete-api-cart') {
        console.log("[router] delete-api-cart")
        cartRoute(req, res)
    } 
    else if (req.url.match(/^\/update-cart\/([0-9a-z]{24})\/([0-9a-z]{24})\/(0|[1-9]\d*)$/)) {
        console.log("[router] update-cart api")
        cartRoute(req, res)
    } 
    else if (req.url.match(/^\/get-favorites\/([0-9a-z]{24})$/)) { // favorites
        console.log("[router] get-favorites api")
        favRoute(req, res)
    } 
    else if(req.url === '/get-api-favorites') {
        console.log("[router] get-api-favorites")
        favRoute(req, res)
    } 
    else if(req.url === '/get-api-suggestions') {
        console.log("[router] get-api-suggestions")
        favRoute(req, res)
    }
    else if (req.url.match(/^\/get-favorite\/([0-9a-z]{24})\/([0-9a-z]{24})$/)) {
        console.log("[router] get-favorite api")
        favRoute(req, res)
    } 
    else if (req.url === '/add-fav') {
        console.log("[router] save-fav api")
        favRoute(req, res)
    } 
    else if (req.url.match(/^\/delete-fav\/([0-9a-z]{24})\/([0-9a-z]{24})$/)) {
        console.log("[router] delete-fav api")
        favRoute(req, res)
    } 
    else if(req.url === '/delete-api-fav') {
        console.log("[router] delete-api-fav")
        favRoute(req, res)
    } 
    else if (req.url === '/get-users') { // users
        console.log("[router] get-users api")
        usersRoute(req, res)
    } 
    else if (req.url.match(/^\/get-user\/([0-9a-z]{24})$/)) {
        console.log("[router] get-user api")
        usersRoute(req, res)
    } 
    else if(req.url === '/get-api-user') {
        console.log("[router] get-api-user")
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
    else if (req.url.match(/^\/delete-user\/([0-9a-z]{24})$/)) {
        console.log("[router] delete-user api")
        usersRoute(req, res)
    } 
    else if(req.url === '/get-api-preferences') { // preferencesProfile
        console.log("[router] get-api-preferences")
        preferenceRoute(req, res)
    }
    else if(req.url === '/add-preference') {
        console.log("[router] add preference api")
        preferenceRoute(req, res)
    }
    else if(req.url.match(/^\/get-api-reviews\/([0-9a-z]{24})$/)) { // reviews
        console.log("[router] get-api-reviews")
        reviewRoute(req, res)
    }
    else if(req.url === '/add-review') {
        console.log("[router] add review api")
        reviewRoute(req, res)
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