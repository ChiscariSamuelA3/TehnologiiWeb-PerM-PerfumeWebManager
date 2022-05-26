const dotenv = require('dotenv')
dotenv.config()

let mongodb = require('mongodb').MongoClient

async function databaseConnection() {
    const res = 
        await mongodb
        .connect(process.env.CONNECTIONSTRING)
        .then(async client => {
            console.log("Connected to mongodb database!")
            
            return client
    }).then((client) => {
        return client
    })
    .catch(err => {
        console.log(err)
    })
    
   return res
}

module.exports = {
    databaseConnection
}