const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Cart {
    constructor(userId, productId, quantity, price) {
        this.userId = userId
        this.productId = productId
        this.quantity = quantity
        this.price = price
    }

    save() {
        const db = getDb()
        return db.collection('cart').insertOne(this)
    }

    // pentru un user, gaseste toate produsele din cos
    static findAll(cartUserId) {
        const db = getDb()
        return db.collection('cart').find({userId: new mongodb.ObjectId(cartUserId)}).toArray()
    }

    static findById(cartUserId, id) {
        const db = getDb()
        return db.collection('cart').find({userId: new mongodb.ObjectId(cartUserId), _id: new mongodb.ObjectId(id)}).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('cart').deleteOne({_id: new mongodb.ObjectId(id)})
    }

    static updateCart(id, q) {
        const db = getDb()
        console.log(id, q)
        return db.collection('cart').updateOne({_id: new mongodb.ObjectId(id)},
            {
                $set: {quantity: parseInt(q)}
            })
    }

}

module.exports = Cart

