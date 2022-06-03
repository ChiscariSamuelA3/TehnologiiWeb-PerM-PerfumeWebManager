const fs = require('fs')
const path = require('path')

async function fileHandling(req, res) {
    // file path
    let filePath = path.join(
        'public', 
        req.url === '/' ? 'index.html' : req.url)

    //file extension
    let extname = path.extname(filePath)

    //default content type
    let contentType = 'text/html'

    //check ext and set content type
    switch(extname) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'applicaiton/json'
            break
        case '.png':
            filePath = path.join('public', 'images', req.url)
            contentType = 'image/png'
            break
        case '.jpg':
            filePath = path.join('public', 'images', req.url)
            contentType = 'image/jpg'
            break
    }
    
    // read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // page not found
                fs.readFile(path.join('public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.end(content, 'utf8')
                })
            }
            else {
                // server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        }
        else {
            
            res.writeHead(200, contentType)
            res.end(content, 'utf8')
        }
    })
}

module.exports = {
    fileHandling
}