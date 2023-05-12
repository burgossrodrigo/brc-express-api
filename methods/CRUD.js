const { MongoClient, ServerApiVersion } = require('mongodb')
const { get24hChange, getLastPrice, get24hVolumeChange, getLastVolume, get24hMarketCapChange, getLastMarketCap } = require('./')

const uri = 'mongodb+srv://burgossrodrigo:BeREmhPli0p3qFTq@tangle.hkje2xt.mongodb.net/?retryWrites=true&w=majority'

const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const queryTokens = async () => {
    try {
        let tokens = []
        const collection = await mongoClient.db("BRC").collection("tokens")
        const documents = await collection.find({}).toArray()
        for(const token of documents){
            tokens.push({
                name: token.token,
                priceChange24h: get24hChange(token.price),
                lastPrice: getLastPrice(token.price),
                volumeChange24h: get24hVolumeChange(token.volume),
                lastVolume: getLastVolume(token.volume),
                marketCapChange24h: get24hMarketCapChange(token.marketCap),
                lastMarketCap: getLastMarketCap(token.marketCap),
                marketCapArr: token.marketCap
            })
        }
        return tokens
    } catch (error) {
        console.log(error.message, 'for queryTokens')
    }
}

module.exports = { queryTokens }