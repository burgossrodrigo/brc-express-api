const { queryTokens } = require("../methods/CRUD")


const oneHourCandleService = async () => {
    try {
        const tokens = await queryTokens()
        const tokenIndex = tokens.findIndex((entry) => entry.token === name)
        const dataOfInterest = tokens[tokenIndex].price
        const data = getCandlestickData(dataOfInterest, 1)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

const sixHourCandleService = async () => {
    try {
        const tokens = await queryTokens()
        const tokenIndex = tokens.findIndex((entry) => entry.token === name)
        const dataOfInterest = tokens[tokenIndex].price
        const data = getCandlestickData(dataOfInterest, 6)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { oneHourCandleService, sixHourCandleService }