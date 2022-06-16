const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Cart {
    constructor(userId, productId, quantity, price) {
        this.userId = ObjectId(userId)
        this.productId = ObjectId(productId)
        this.quantity = parseInt(quantity)
        this.price = parseInt(price)
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

    static findByUserIdProductId(cartUserId, prodId) {
        const db = getDb()
        return db.collection('cart').find({userId: new mongodb.ObjectId(cartUserId), productId: new mongodb.ObjectId(prodId)}).toArray()
    }

    static findByProdId(prodId) {
        const db = getDb()
        return db.collection('products').find({_id: prodId}).toArray()
    }

    static findCatalogProduct(prodId) {
        const db = getDb()
        return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('cart').deleteOne({_id: new mongodb.ObjectId(id)})
    }

    static updateCart(cartId, q) {
        const db = getDb()
       
        return db.collection('cart').updateOne({_id: cartId},
            {
                $set: {quantity: parseInt(q)}
            })
    }

    static updateCatalogProduct(id, q) {
        const db = getDb()
        console.log("UPDATE PRODUCT CATALOG", id, q)
        return db.collection('products').updateOne({_id: new mongodb.ObjectId(id)},
            {
                $set: {quantity: parseInt(q)}
            })
    }
}

module.exports = Cart

