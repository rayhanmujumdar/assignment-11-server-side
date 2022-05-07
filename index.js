const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()
var jwt = require('jsonwebtoken');


// heroku api link
// https://fathomless-earth-22258.herokuapp.com


// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncyrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try{
        await client.connect()
        const productCollection = client.db('electronic').collection('items')
        // items find api
        app.get('/items',async (req,res) => {
            const query = req.query._id
            const cursor = productCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        //get single product
        app.get('/items/:id',async (req,res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await productCollection.findOne(query)
            res.send(result)
        })
        //update quantity items
        app.put("/items/:id",async(req,res) => {
            const token = req.headers.authorization
            const id = req.params
            const body = req.body
            const filter = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updateQuantity = {
                $set: {
                    quantity: body.quantity
                }
            }
            const result = await productCollection.updateOne(filter,updateQuantity,options)
            res.send(result)
        })
        //post item product
        app.put('/items',async (req,res) => {
            
        })
        //delete items
        app.delete('/items',async(req,res) => {
            const id = req.query.id
            const query = {_id: ObjectId(id)}
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })
        // login into jwt added api
        app.post('/login',(req,res) => {
            const email = req.body
            const accessToken = jwt.sign(email, process.env.DB_SECRET,{
                expiresIn: '1d'
            });
            res.send({accessToken})
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/ok',(req,res) => {
    res.send('all ok');
})

app.listen(port,() => {
    console.log('listening my port is' + port)
})