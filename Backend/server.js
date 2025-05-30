const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser =   require('body-parser')
const cors = require('cors')

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();
const db = client.db(dbName);

//get(seen) all the paasword
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("password");
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Post(save) all the password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection("password");
    const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult})
})

//Delete the password by id 
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection("password");
    const findResult = await collection.deleteMany(password);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})