const getCandlestickData = (data, resolution) => {
  const ohlcData = []
  let currentOHLC = null
  // Sort the data by timestamp
  data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  // Loop through each data point and calculate the OHLC values for the time interval
  for (let i = 0; i < data.length; i++) {
    const currentData = data[i]
    const timestamp = new Date(currentData.time).getTime()

    // If the current data point has a price value, update the OHLC values
    if (currentData.price) {
      if (!currentOHLC) {
        // If there is no current OHLC data, start a new time interval
        currentOHLC = {
          open: currentData.price,
          high: currentData.price,
          low: currentData.price,
          close: currentData.price,
          timestamp
        }
      } else if (timestamp - currentOHLC.timestamp >= 3600000 * resolution) {
        // If the current data point is outside the current time interval, push the current OHLC data and start a new time interval
        ohlcData.push(currentOHLC)
        currentOHLC = {
          open: currentData.price,
          high: currentData.price,
          low: currentData.price,
          close: currentData.price,
          timestamp
        }
      } else {
        // Update the current OHLC data for the time interval
        currentOHLC.high = Math.max(currentOHLC.high, currentData.price)
        currentOHLC.low = Math.min(currentOHLC.low, currentData.price)
        currentOHLC.close = currentData.price
      }
    }
  }

  // Push the final OHLC data point
  if (currentOHLC) {
    ohlcData.push(currentOHLC)
  }
  return ohlcData
}

const calculateChange = (oldValue, newValue) => ((newValue - oldValue) / oldValue) * 100;

const get24hChange = (data) => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

  const data24hAgo = data.find((entry) => new Date(entry.time) >= oneDayAgo);

  if (!data24hAgo) {
    return null;
  }

  const latestData = data[data.length - 1];

  return calculateChange(parseFloat(data24hAgo.price), parseFloat(latestData.price));
};

const getLastPrice = (priceData) => {
  return parseFloat(priceData[priceData.length - 1].price);
};

const get24hVolumeChange = (volumeData) => {
  return get24hChange(volumeData);
};

const getLastVolume = (volumeData) => {
  return parseFloat(volumeData[volumeData.length - 1].volume);
};

const get24hMarketCapChange = (marketCapData) => {
  return get24hChange(marketCapData);
};

const getLastMarketCap = (marketCapData) => {
  return parseFloat(marketCapData[marketCapData.length - 1].marketCap);
};


module.exports = { getCandlestickData, getLastPrice, get24hVolumeChange, getLastVolume, get24hMarketCapChange, getLastMarketCap, get24hChange }