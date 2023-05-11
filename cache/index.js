const Cache = require("node-cache");

const tokensCache = new Cache({ stdTTL: 60 * 15 });
const oneHourCache = new Cache({ stdTTL: 60 * 15 });
const sixHoursCache = new Cache({ stdTTL: 60 * 15 });

const tokenCachedMiddleware = (req, res, next) => {
    try {
      if (tokensCache.has("tokens")) {
        return res.send(tokensCache.get("tokens")).status(200);
      }
      return next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const oneHourCandleCachedMiddleware = (req, res, next) => {
    try {
      if (tokensCache.has("tokens")) {
        return res.send(oneHourCache.get("oneHourCandle")).status(200);
      }
      return next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const sixHourCandleCachedMiddleware = (req, res, next) => {
    try {
      if (tokensCache.has("tokens")) {
        return res.send(sixHoursCache.get("sixHourCandle")).status(200);
      }
      return next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

module.exports = { 
    tokensCache, 
    oneHourCache, 
    sixHoursCache, 
    tokenCachedMiddleware, 
    oneHourCandleCachedMiddleware, 
    sixHourCandleCachedMiddleware 
}
