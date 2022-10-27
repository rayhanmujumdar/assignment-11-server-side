const router = require('express').Router()
const verifyToken = require('../middleware/custom.middleware')

// items find api
router.route('/items')
.get(async (req,res) => {
    const query = req.query
    const cursor = productCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
})
//post/add item item product
.put(verifyToken,async (req,res) => {
    const item = req.body
    const email = req.query.email
    const decoded = req.decoded.email
    if(email === decoded){
        const result = await productCollection.insertOne(item)
        res.send(result)
    }
})
//delete/inventory manage items
delete(verifyToken,async(req,res) => {
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
//get single product
router.route('/items/:id')
.get(async (req,res) => {
    const id = req.params.id
    const query = {_id: ObjectId(id)}
    const result = await productCollection.findOne(query)
    res.send(result)
})
//update quantity items
put(async(req,res) => {
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

// login into jwt added api
router.post('/login',(req,res) => {
    const email = req.body
    const accessToken = jwt.sign(email, process.env.DB_SECRET,{
        expiresIn: '1d'
    });
    res.send({accessToken})
})

module.exports = router