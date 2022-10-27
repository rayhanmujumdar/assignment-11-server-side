const status = require('express').Router()
const router = require('./routes')

status.get('/health',(req,res) => {    
    res.status(200).json({message: 'success'})
})

status.use('/api/v1/warehouse',router)

module.exports = status