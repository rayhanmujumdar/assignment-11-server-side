const router = require('express').Router()

router.get('/',(req,res) => {
    res.status(200).json({message: 'root route is working'})
})

module.exports = router