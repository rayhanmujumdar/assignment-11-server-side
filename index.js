require('dotenv').config()
const http = require('http')
const app = require('./app/app')
const port = process.env.PORT || 5000
const connectDB = require('./db/connectDB')

// heroku api link
// https://fathomless-earth-22258.herokuapp.com


// create server
const server = http.createServer(app)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ncyrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
connectDB(uri)
.then(() => {
    console.log('mongodb is connected')
    server.listen(port,() => {
        console.log(`server listening port is ${port}`)
    })
})