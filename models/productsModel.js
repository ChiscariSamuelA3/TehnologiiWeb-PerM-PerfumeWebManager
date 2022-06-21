const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Product {
    constructor(name, gender, season, smell, price, longdescription, shortdescription, imageurl, quantity, category, initialstock) {
        this.name = name
        this.gender = gender
        this.season = season
        this.smell = smell
        this.price = parseInt(price)      
        this.longdescription = longdescription
        this.shortdescription = shortdescription
        this.imageurl = imageurl
        this.quantity = parseInt(quantity)
        this.category = category
        this.initialstock = parseInt(initialstock)
    }

    // sanitizare
    static validateImageUrl(img) {
        return String(img).toLowerCase().match(/^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#${}?]+)+\.(?:jpe?g|gif|png)$/)
    }

    static validateNumber(nr) {
        return nr.match(/^[1-9]\d*$/)
    }

    static validateLength(text) {
        return text.length <= 35
    }

    static validateFormat(text) {
        return String(text).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))$/)
    }

    static findByName(_name) {
        const db = getDb()
        return db.collection('products').find({ name: _name }).toArray()
    }

    save() {
        const db = getDb()
        return db.collection('products').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('products').find().toArray()
    }

    static findByUserId(userId) {
        const db = getDb()
        return db.collection('users').find({ _id: new mongodb.ObjectId(userId)}).toArray()
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

