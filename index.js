require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const port = process.env.PORT || 5000;
const connectDB = require("./db/connectDB");
// heroku api link
// https://fathomless-earth-22258.herokuapp.com

// create server
const server = http.createServer(app);

connectDB.connect().then(() => {
  console.log("Database is connected");
  server.listen(port, () => {
    console.log(`server listening port is ${port}`);
  });
});
