const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class User {
    constructor(username, password, email) {
        this.username = username
        this.password = password
        this.email = email
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('users').find().toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('users').find({_id: new mongodb.ObjectId(id)}).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('users').deleteOne({_id: new mongodb.ObjectId(id)})
    }

}

module.exports = User
