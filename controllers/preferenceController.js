const Preference = require("../models/preferenceModel");
const jwt = require("jsonwebtoken");

const { getPostData } = require("../utils/utils");

// get favs GET /get-api-preferences
async function getApiPreferences(req, res) {
    try {
      // userId il iau din token-ul din cookie...
  
      let value = ""
      let token = ""
      const cookieHeader = req.headers?.cookie
      
      if(cookieHeader) {
        cookieHeader.split(`;`).forEach(cookie => {
          let [name, ...rest] = cookie.split(`=`)
          if(name === "jwt") {
            value = rest.join(`=`).trim()
            if(value) {
              token =  decodeURIComponent(value)
            }
          }
        });
      }
      
      if(value === "" || value === "undefined") {
        res.writeHead(401, { "Content-Type": "application/json"});
        res.end(JSON.stringify({ route: "/Login.html", message: "You must login to view Profile Page!" }));
      }
      else {
        // decodificare token preluat din cookie
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken['data']['id']
  
        // preferintele utilizatorului care este logat in sesiunea curenta
        const preferences = await Preference.findByUserId(userId);

        let suggestions = []

        if(String(preferences[0].gender).toLowerCase() === 'both') {
          suggestions = await Preference.findProductsBySeasonSmell(preferences[0].season, preferences[0].smell)
        }
        else {
          suggestions = await Preference.findProductsByPreferences(preferences[0].gender, preferences[0].season, preferences[0].smell)
        }

        console.log("HERE PREF ARRAY", suggestions)

        if(!preferences.length) {
            res.writeHead(204, { "Content-Type": "application/json"});
            res.end(JSON.stringify({message: "No preferences selected!" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json"});
            res.end(JSON.stringify(preferences));
        }
      }
    } catch (err) {
      console.log(err);
  
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(err));
    }
  }
  
  // create preference POST /add-preference
  async function savePreference(req, res) {
    try {
      const body = await getPostData(req);
  
      const { gender, season, smell } = JSON.parse(body);
  
      let value = ""
      let token = ""
      const cookieHeader = req.headers?.cookie
      
      if(cookieHeader) {
        cookieHeader.split(`;`).forEach(cookie => {
          let [name, ...rest] = cookie.split(`=`)
          if(name === "jwt") {
            value = rest.join(`=`).trim()
            if(value) {
              token =  decodeURIComponent(value)
            }
          }
        });
      }
      
      if(value === "" || value === "undefined") {
        res.writeHead(401, { "Content-Type": "application/json"});
        res.end(JSON.stringify({ route: "/index.html", message: "You must login to add preferences!" }));
      }
      else {
        // decodificare token preluat din cookie
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // user id care e logat
        const userId = decodedToken['data']['id']
  
        // cauta daca user-ul are deja adaugate niste preferinte
        const isUserPreference = await Preference.findByUserId(userId)
  
        // verifica daca user-ul are deja adaugate niste preferinte
        if(!isUserPreference.length) {
            console.log("PREFERINTE NEEXISTENTE")
            const preference = new Preference(userId, gender, season, smell);
            preference.save();
  
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                  route: "/Profile.html",
                  message: "Preferences saved successfully!",
                })
              );
        }
        else {
            console.log("EXISTA NISTE PREFERINTE DEJA")

            // actualizare 
            await Preference.updatePreferences(userId, gender, season, smell)
  
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                  route: "/Profile.html",
                  message: "Preferences updated successfully!",
                })
              );
        }
      }
    } catch (err) {
      console.log(err);
  
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(err));
    }
}
  
  module.exports = {
    getApiPreferences,
    savePreference
  };