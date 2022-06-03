const { fileHandling } = require('../controllers/fileController')

async function fileRouter(req, res) {
    req.url = req.url.split("/").pop()
    if(!req.url) {
        req.url = "index.html"
    }

    fileHandling(req, res)
}

module.exports = {
    fileRouter
}