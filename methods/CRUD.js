const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGODB_URI

const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const queryTokens = async () => {
    try {
        const collection = await mongoClient.db("BRC").collection("tokens");
        const documents = await collection.find({}).toArray();
        return documents;
    } catch (error) {
        console.log(error.message, 'for queryTokens')
    }
}