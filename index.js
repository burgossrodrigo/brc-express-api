const serverless = require("serverless-http");
const express = require("express");
const cors = require('cors')
const bodyParse = require('body-parser')
const app = express();

const json = bodyParse.json
const router = express.Router()

const { queryTokens } = require('./methods/CRUD')
const { getCandlestickData } = require('./methods/index')

app.use(cors());
app.use(json());
app.use(router);

app.get("/", async (req, res, next) => {
  try {
    const tokens = await queryTokens()
    return res.status(200).json(tokens)
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
});

app.get("/:token/1", async (req, res, next) => {
  try {
    const name = req.params.token
    const tokens = await queryTokens()
    const tokenIndex = tokens.findIndex((entry) => entry.token === name)
    const dataOfInterest = tokens[tokenIndex].price
    const candleChart = getCandlestickData(dataOfInterest, 1)
    return res.status(200).json(candleChart)
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }

});

app.get("/:token/6", async (req, res, next) => {
  try {
    const name = req.params.token
    const tokens = await queryTokens()
    const tokenIndex = tokens.findIndex((entry) => entry.token === name)
    const dataOfInterest = tokens[tokenIndex].price
    const candleChart = getCandlestickData(dataOfInterest, 6)
    return res.status(200).json(candleChart)
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }

});

module.exports.handler = serverless(app);
