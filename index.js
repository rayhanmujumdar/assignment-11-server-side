const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()
var jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// heroku api link
// https://fathomless-earth-22258.herokuapp.com


// middleware
app.use(cors())
app.use(express.json())

// verify token function
const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.status(401)
    jwt.verify(token,process.env.DB_SECRET,function(err,decoded){
        if(err) {
            return res.status(403).send({message: 'unAuth'})
        }
        req.decoded = decoded
        next()
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncyrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try{
        await client.connect()
        const productCollection = client.db('electronic').collection('items')
        // items find api
        app.get('/items',async (req,res) => {
            const query = req.query
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
        //post/add item item product
        app.put('/items',verifyToken,async (req,res) => {
            const item = req.body
            const email = req.query.email
            const decoded = req.decoded.email
            if(email === decoded){
                const result = await productCollection.insertOne(item)
                res.send(result)
            }
        })
        //delete/inventory manage items
        app.delete('/items',verifyToken,async(req,res) => {
            const {id,email} = req.query
            const decoded = req.decoded.email
            if(email === decoded){
                const query = {_id: ObjectId(id)}
                const result = await productCollection.deleteOne(query)
                res.send(result)
            }else{
                res.status(403).send({message: 'forbidden access'})
            }
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