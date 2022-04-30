const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()

// middleware
app.use(cors())
app.use(express())

app.get('/',(req,res) => {
    res.send('all ok');
})

app.listen(port,() => {
    console.log('listening my port is' + port)
})