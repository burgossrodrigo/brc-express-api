const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = 'mongodb+srv://burgossrodrigo:BeREmhPli0p3qFTq@tangle.hkje2xt.mongodb.net/?retryWrites=true&w=majority'

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

module.exports = { queryTokens }