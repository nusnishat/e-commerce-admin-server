const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.Port || 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('loading e-commerce-admin website');
})

app.listen(port, ()=>{
    console.log('it is running');
})
// nusrat
// nusratJahan

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nusrat:nusratJahan@cluster0.o9amlmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("eCommerceAdmin");
    const productsCollection = database.collection("productsCollection");
    const customersCollection = database.collection("customersCollection");
    const ordersCollection = database.collection("ordersCollection");
    // --------------get products----------------
    app.get('/products', async(req, res)=>{
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // --------------get orders----------------
    app.get('/orders', async(req, res)=>{
        const cursor = ordersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })

    // --------------get customers----------------
    app.get('/customers', async(req, res)=>{
        const cursor = customersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })


    // ---------------add products----------------
    app.post('/products', async(req, res)=>{
      const products = req.body;
      console.log(products);
      const result = await productsCollection.insertOne(products);
      res.send(result)
    })
    // ---------------add customers----------------
    app.post('/customers', async(req, res)=>{
        const customers = req.body;
        console.log(customers);
        const result = await customersCollection.insertOne(customers);
        res.send(result)
      })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
