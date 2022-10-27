const express = require('express')
const status = require('../routes/health')

const app = express()
app.use(status)


app.listen(4000,function (){
    console.log('server is running')
})