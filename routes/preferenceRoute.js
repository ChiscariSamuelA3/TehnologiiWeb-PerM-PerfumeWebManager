const {  getApiPreferences, savePreference} = require('../controllers/preferenceController')

function preferenceRoute(req, res) {
    
    if(req.url === '/get-api-preferences' && req.method === 'GET') { // preferencesProfile
        getApiPreferences(req, res)
    }
    else if(req.url === '/add-preference' && req.method === 'POST') {
        savePreference(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
}

module.exports = {
    preferenceRoute
}