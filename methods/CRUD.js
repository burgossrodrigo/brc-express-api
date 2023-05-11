const queryTokens = async () => {
    try {
        const collection = await mongoClient.db("BRC").collection("tokens");
        const documents = await collection.find({}).toArray();
        return documents;
    } catch (error) {
        console.log(error.message, 'for queryTokens')
    }
}