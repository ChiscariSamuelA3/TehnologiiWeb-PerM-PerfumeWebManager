async function router(req, res) {
    if(req.url === '/') {
        console.log("[router] homepage")
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