const {getUsers, getUser, getApiUser, saveUser, loginUser, deleteUser} = require('../controllers/usersController')

function usersRoute(req, res) {
    if(req.url === '/get-users' && req.method === 'GET') {
        getUsers(req, res)
    }
    else if(req.url.match(/^\/get-user\/([0-9a-z]{24})$/) && req.method === 'GET') {
        
        const id = req.url.split('/')[2]

        getUser(req, res, id)
    }
    else if(req.url === '/get-api-user' && req.method === 'GET') {
        getApiUser(req, res)
    }
    else if(req.url === '/add-user' && req.method === 'POST') { // register
        saveUser(req, res)
    }
    else if(req.url === '/login-user' && req.method === 'POST') {
        loginUser(req, res)
    }
    else if(req.url.match(/^\/delete-user\/([0-9a-z]{24})$/) && req.method === 'DELETE') {
        
        const id = req.url.split('/')[2]

        deleteUser(req, res, id)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    usersRoute
}