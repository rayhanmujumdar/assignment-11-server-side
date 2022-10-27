const express = require('express')
const middleware = require('../middleware/middleware')
const status = require('../routes/health')
const app = express()

//middleware
app.use(middleware)

// routes middleware
app.use(status)

//errors


module.exports = app