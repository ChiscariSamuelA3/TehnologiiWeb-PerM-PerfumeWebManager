const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Product {
    constructor(name, gender, season, smell, price, longdescription, shortdescription, imageurl, quantity, category) {
        this.name = name
        this.gender = gender
        this.season = season
        this.smell = smell
        this.price = price      
        this.longdescription = longdescription
        this.shortdescription = shortdescription
        this.imageurl = imageurl
        this.quantity = quantity
        this.category = category
    }

    save() {
        const db = getDb()
        return db.collection('products').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('products').find().toArray()
    }

    static findAllByFilters(floral, oriental, lemnos) {
        const db = getDb()
        if(floral === 'true') {
            if(oriental === 'true') {
                if(lemnos === 'true') {
                    return db.collection('products').find({ 
                        $or: 
                        [
                            {category: 'floral'},
                            {category: 'oriental'},
                            {category: 'lemnos'}
                        ]
                      }).toArray()
                }
                else {
                    return db.collection('products').find({ 
                        $or: 
                        [
                            {category: 'floral'},
                            {category: 'oriental'},
                        ]
                      }).toArray()
                }
            }
            else if(lemnos === 'true') {
                return db.collection('products').find({ 
                    $or: 
                    [
                        {category: 'floral'},
                        {category: 'lemnos'}
                    ]
                  }).toArray()
            }
            else {
                return db.collection('products').find({category: 'floral'}).toArray()
            }
        }
        else if(oriental === 'true') {
            if(lemnos === 'true') {
                return db.collection('products').find({ 
                    $or: 
                    [
                        {category: 'oriental'},
                        {category: 'lemnos'}
                    ]
                    }).toArray()
            }
            else {
                return db.collection('products').find({
                    category: 'oriental'
                }).toArray()
            }
        }
        else if(lemnos === 'true') {
            return db.collection('products').find({
                category: 'lemnos'
            }).toArray()
        }
        else {
            return []
        }
    }

    static findById(id) {
        const db = getDb()
        return db.collection('products').find({_id: new mongodb.ObjectId(id)}).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
    }

    static updateProduct(id, q) {
        const db = getDb()
        console.log(id)
        return db.collection('products').updateOne({_id: new mongodb.ObjectId(id)},
            {
                $set: {quantity: parseInt(q)}
            })
    }

}

module.exports = Product

