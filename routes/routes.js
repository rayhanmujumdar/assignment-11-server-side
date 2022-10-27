const router = require('express').Router()

router('/',(req,res) => {
    res.status(200).json({message: 'root route is working'})
})

module.exports = router