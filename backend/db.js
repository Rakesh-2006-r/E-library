// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Rakesh:rakesh1@cluster0.ox1yimq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
let usersCollection;
let booksCollection;

async function connectToMongo() {
  if (db) return; // Avoid reconnecting

  await client.connect();
  db = client.db("elibrary");

  // Initialize collections
  usersCollection = await db.collection("users");
  booksCollection = await db.collection("books");

  console.log("Succesfully Connected to MongoDB");
}

// Export the connection and collection objects
module.exports = {
  connectToMongo,
  getUsersCollection : () => usersCollection,
  getBooksCollection : () => booksCollection,
};
