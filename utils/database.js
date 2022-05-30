const dotenv = require('dotenv')
dotenv.config()

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _database

const mongodbConnect = (callback) => {
    mongoClient
        .connect(process.env.CONNECTIONSTRING)
        .then(client => {
            _database = client.db('perm')
            console.log("[database] Connected to mongodb database!")
            callback()
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if(_database) {
        return _database
    }
    else {
        
        throw 'No database found!'
    }
}

exports.mongodbConnect = mongodbConnect
exports.getDb = getDb