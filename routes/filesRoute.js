const { fileHandling } = require('../controllers/fileController')
var sanitize = require('mongo-sanitize')

async function fileRouter(req, res) {
    req.url = sanitize(req.url.split("/").pop())
    
    if(!req.url) {
        req.url = "Homepage.html"
    }

    fileHandling(req, res)
}

module.exports = {
    fileRouter
}