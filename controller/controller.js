const jwt = require('jsonwebtoken')
// items find api
exports.getItemsController = async (req,res) => {
    const query = req.query
    const cursor = productCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
}

  //post/add item item product
exports.addItemsController = async (req,res) => {
    const item = req.body
    const email = req.query.email
    const decoded = req.decoded.email
    if(email === decoded){
        const result = await productCollection.insertOne(item)
        res.send(result)
    }
}

//delete/inventory manage items
exports.deleteItemsController = async(req,res) => {
    const {id,email} = req.query
    const decoded = req.decoded.email
    if(email === decoded){
        const query = {_id: ObjectId(id)}
        const result = await productCollection.deleteOne(query)
        res.send(result)
    }else{
        res.status(403).send({message: 'forbidden access'})
    }
}

//get single product
exports.getSingleProductController = async (req,res) => {
    const id = req.params.id
    const query = {_id: ObjectId(id)}
    const result = await productCollection.findOne(query)
    res.send(result)
}

//update quantity items
exports.updateItemController = async (req, res) => {
    const id = req.params;
    const body = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateQuantity = {
      $set: {
        quantity: body.quantity,
      },
    };
    const result = await productCollection.updateOne(
      filter,
      updateQuantity,
      options
    );
    res.send(result);
  }

  exports.loginJWTController = (req, res) => {
    const email = req.body;
    const accessToken = jwt.sign(email, process.env.DB_SECRET, {
      expiresIn: "1d",
    });
    res.send({ accessToken });
  }