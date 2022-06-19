const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Favorite {
    constructor(userId, productId, type) {
        this.userId = ObjectId(userId)
        this.productId = ObjectId(productId)
        this.type = parseInt(type)
    }

    save() {
        const db = getDb()
        return db.collection('favorite').insertOne(this)
    }

    // pentru un user, gaseste toate produsele din lista de favorite
    static findAll(favUserId) {
        const db = getDb()
        return db.collection('favorite').find({userId: new mongodb.ObjectId(favUserId)}).toArray()
    }

    // pentru un user, gaseste toate produsele din lista de favorite de un anumit tip
    static findAllByType(favUserId, favType) {
        const db = getDb()
        return db.collection('favorite').find({userId: new mongodb.ObjectId(favUserId), type: favType}).toArray()
    }

    static findById(favUserId, id) {
        const db = getDb()
        return db.collection('favorite').find({userId: new mongodb.ObjectId(favUserId), _id: new mongodb.ObjectId(id)}).toArray()
    }

    static findByUserIdProdId(favUserId, favProdid) {
        const db = getDb()
        return db.collection('favorite').find({userId: new mongodb.ObjectId(favUserId), productId: new mongodb.ObjectId(favProdid), type: 2}).toArray()
    }

    static findFavProduct(id) {
        const db = getDb()
        return db.collection('favorite').find({_id: new mongodb.ObjectId(id)}).toArray()
    }

    static findByUserIdProductIdType(favUserId, prodId, t) {
        const db = getDb()
        return db.collection('favorite').find({userId: new mongodb.ObjectId(favUserId), productId: new mongodb.ObjectId(prodId), type: t}).toArray()
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

        db.collection('favorite').deleteOne({_id: new mongodb.ObjectId(id)})
    }
}

module.exports = Favorite

