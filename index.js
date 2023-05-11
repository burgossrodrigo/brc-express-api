const serverless = require("serverless-http");
const express = require("express");
const app = express();

const { queryTokens } = require('./methods/CRUD')

app.get("/", async (req, res, next) => {
  const tokens = await queryTokens()
  return res.status(200).json({
    data: tokens,
    message: 'Success'
  });
});

app.get("/:token/1", async (req, res, next) => {
  const name = req.params.token
  const tokens = await queryTokens()
  const tokenIndex = tokens.findIndex((entry) => entry.name === name)
  const dataOfInterest = tokens[tokenIndex].price
  const candleChart = getCandlestickData(dataOfInterest, 1)
  return res.status(200).json({
    data: candleChart,
    message: "Success"
  });
});

app.get("/:token/6", async (req, res, next) => {
  const name = req.params.token
  const tokens = await queryTokens()
  const tokenIndex = tokens.findIndex((entry) => entry.name === name)
  const dataOfInterest = tokens[tokenIndex].price
  const candleChart = getCandlestickData(dataOfInterest, 6)
  return res.status(200).json({
    data: candleChart,
    message: "Success",
  });
});

app.use((req, res, next) => {
  //3600
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
