const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Product {
    constructor(name, gender, season, smell, price) {
        this.name = name
        this.gender = gender
        this.season = season
        this.smell = smell
        this.price = price        
    }

    save() {
        const db = getDb()
        return db.collection('products').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('products').find().toArray()
    }
}

module.exports = Product

