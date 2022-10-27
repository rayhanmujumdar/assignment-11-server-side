const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = [
    express.json(),
    cors(),
    morgan('dev')
]

module.exports = middleware