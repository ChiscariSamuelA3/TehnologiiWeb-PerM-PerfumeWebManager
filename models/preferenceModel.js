const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class Preference {
    constructor(userId, gender, season, smell) {
        this.userId = ObjectId(userId)
        this.gender = gender
        this.season = season
        this.smell = smell
    }

    save() {
        const db = getDb()
        return db.collection('preferences').insertOne(this)
    }

    static findAll() {
        const db = getDb()
        return db.collection('preferences').find().toArray()
    }

    // un parfum este recomandat daca acesta are cel putin 2 tag-uri care corespund profilului utilizatorului
    static findProductsByPreferences(_gender, _season, _smell) {
        const db = getDb()
      
        return db.collection('products')
                 .find({ 
                    $or: [
                        {
                            $and: [
                                {gender: String(_gender).toLowerCase()}, 
                                {season: String(_season).toLowerCase()},
                            ]
                        },
                        {
                            $and: [
                                {gender: String(_gender).toLowerCase()}, 
                                {smell: String(_smell).toLowerCase()}
                            ]
                        },
                        {
                            $and: [
                                {season: String(_season).toLowerCase()},
                                {smell: String(_smell).toLowerCase()}
                            ]
                        }
                    ]
                  }).toArray()
    }

    // for both gender -> male or female
    static findProductsBySeasonSmell(_season, _smell) {
        const db = getDb()
      
        return db.collection('products')
                 .find({ 
                    $or: 
                    [
                        {season: String(_season).toLowerCase()},
                        {smell: String(_smell).toLowerCase()}
                    ]
                  }).toArray()
    }
  
    static findById(id) {
        const db = getDb()
        return db.collection('preferences').find({ _id: new mongodb.ObjectId(id) }).toArray()
    }

    static findByUserId(id) {
        const db = getDb()
        return db.collection('preferences').find({ userId: new mongodb.ObjectId(id) }).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('preferences').deleteOne({ _id: new mongodb.ObjectId(id) })
    }

    static updatePreferences(id, gen, anotimp, miros) {
        const db = getDb()
        console.log(id)
        return db.collection('preferences').updateOne({userId: new mongodb.ObjectId(id)},
            {
                $set: {
                    gender: gen,
                    season: anotimp,
                    smell: miros
                }
            })
    }

}

module.exports = Preference