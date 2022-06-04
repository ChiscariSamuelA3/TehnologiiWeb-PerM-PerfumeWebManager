const { fileHandling } = require('../controllers/fileController')

async function fileRouter(req, res) {
    req.url = req.url.split("/").pop()
    console.log(`FILERES ${req.url}`)
    if(!req.url) {
        req.url = "index.html"
    }

    fileHandling(req, res)
}

module.exports = {
    fileRouter
}