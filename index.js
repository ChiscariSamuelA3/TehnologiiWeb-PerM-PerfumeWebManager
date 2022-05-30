const http = require('http')
const { router } = require('./routes/router')
const mongodbConnect = require('./utils/database').mongodbConnect

const PORT = process.env.PORT || 5500;

mongodbConnect(async () => {
    server.listen(PORT, () => console.log(`[server] Server running on port ${PORT}`))
})

const server = http.createServer((req, res) => {
    
    router(req, res)

})
