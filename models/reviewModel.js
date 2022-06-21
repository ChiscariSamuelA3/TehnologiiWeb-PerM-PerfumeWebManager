const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Review {
    constructor(comment, grade, productId, username) {
        this.comment = comment
        this.grade = grade
        this.productId = ObjectId(productId)
        this.username = username
    }

    static validateLength(text) {
        return text.length <= 35
    }

    static validateFormat(text) {
        return String(text).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))$/)
    }

    save() {
        const db = getDb()
        return db.collection('reviews').insertOne(this)
    }

    static findAll(prodId) {
        const db = getDb()
        return db.collection('reviews').find({productId: new mongodb.ObjectId(prodId)}).toArray()
    }

    static remove(id) {
        const db = getDb()
        db.collection('reviews').deleteOne({_id: new mongodb.ObjectId(id)})
    }
}

module.exports = Review

