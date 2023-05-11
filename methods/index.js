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

  module.exports = { getCandlestickData }