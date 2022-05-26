const http = require('http')
const { databaseConnection } = require('./utils/database')
const { router } = require('./routes/router')

const server = http.createServer((req, res) => {
    router(req, res)
})

const PORT = process.env.PORT || 5500;

databaseConnection().then(async (client) => {
    server.listen(PORT, () => console.log(`[server] Server running on port ${PORT}`))
    
    let database = client.db("perm")
    
    const products = database.collection("products")

    const allProducts = await products.find().toArray()
    console.log(allProducts)
})



// mongodb.connect(process.env.CONNECTIONSTRING, async function(err, client) {
//     const db = client.db()

//     //const result = await db.collection("products").find({gender: "male"}).toArray()
//     //const result = await db.collection("products").find().toArray()
//     const products = db.collection("products")
//     await products.updateOne({_id: mongodb.ObjectId("628f5178d525d5fa5f140cb2")}, {$set: {price: 99}})

//     //await products.insertOne({name: "perfume4", gender: "female", season: "spring", smell: "smell4", price: 89})
//     console.log("Updated a product")

//     client.close()
// })

