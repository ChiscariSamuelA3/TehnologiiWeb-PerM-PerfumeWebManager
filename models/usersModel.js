const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
const getDb = require('../utils/database').getDb

class User {
    constructor(username, password, email) {
        this.username = username
        this.password = password
        this.email = email
    }
    // sanitizare
    static validatePasswordFormat(password) {
        return String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    static validateEmailFormat(email) {
        return String(email).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    static validateUsernameFormat(username) {
        return String(username).toLowerCase().match(/^(([^$!{}<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))$/)
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
        return db.collection('users').find({ _id: new mongodb.ObjectId(id) }).toArray()
    }

    static findByUsername(name) {
        const db = getDb()
        return db.collection('users').find({ username: name }).toArray()
    }

    static remove(id) {
        const db = getDb()

        db.collection('users').deleteOne({ _id: new mongodb.ObjectId(id) })
    }

}

module.exports = User