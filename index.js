const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5050;

// fhhSAhfy5vju567r
// semaahmed

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://semaahmed:fhhSAhfy5vju567r@cluster0.4rme0sq.mongodb.net/?retryWrites=true&w=majority";

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

    const database = client.db("userDB");
    const userCollection = database.collection("user");

    // Read user the method of CRUD 

    app.get('/users',async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    })

    // CREATE user the method of crud 

    app.post('/users', async (req,res)=> {
        const users = req.body;
        console.log('new user :', users);
        const result = await userCollection.insertOne(users);
        res.send(result);
    })

    // DELETE user the method of CRUD 

    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
        console.log('Please delete the id from :', id);
        const query = {_id : new ObjectId(id)};
        const result = await userCollection.deleteOne(query)
        res.send(result);
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



app.get('/', (req,res)=> {
    res.send('Server is running correctly')
})

app.listen(port, ()=> {
    console.log(`This server is running on port : ${port}`)
})