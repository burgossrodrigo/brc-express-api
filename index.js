const serverless = require("serverless-http");
const express = require("express");
const cors = require('cors')
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000'
  ],
};

const json = bodyParse.json
const router = express.Router()

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`)
})

const { tokenCachedMiddleware, sixHourCandleCachedMiddleware, oneHourCandleCachedMiddleware } = require("./cache");
const { tokensController, sixHourCandleController, oneHourCandleController } = require("./controller");

app.use(cors());
app.use(json());
app.use(router);
const PORT = 5000
var server_host = process.env.YOUR_HOST || '0.0.0.0';

router.get('/', cors(corsOptions), tokenCachedMiddleware, tokensController)

router.get('/:token/6', cors(corsOptions), sixHourCandleController, sixHourCandleCachedMiddleware)

router.get('/:token/1', cors(corsOptions), oneHourCandleCachedMiddleware, oneHourCandleController)


module.exports.handler = serverless(app);
