const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()
var jwt = require('jsonwebtoken');

// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncyrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try{
        await client.connect()
        const productCollection = client.db('product').collection('order')
        app.post('/order', async(req,res) => {
            const posts = req.body
            const result = await productCollection.insertOne(posts)
            res.send(result)
        })

        app.post('/login',(req,res) => {
            const email = req.body
            const token = jwt.sign(email, process.env.DB_SECRET,{
                expiresIn: '1d'
            });
            res.send({accessToken: token})
        })
    }
    finally{

    }
}

run().catch(console.dir)

app.get('/',(req,res) => {
    res.send('all ok');
})

app.listen(port,() => {
    console.log('listening my port is' + port)
})