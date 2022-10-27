const connectDB = require("./connectDB");
async function collectionDB() {
  const client = connectDB;
  const productCollection = client.db("electronic").collection("items");
  return {
    productCollection,
  };
}

module.exports = collectionDB;
