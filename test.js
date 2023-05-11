const { queryTokens } = require('./methods/CRUD')
const { getCandlestickData } = require('./methods/index')

const handleRootRequest = async () => {
  try {
    const tokens = await queryTokens()
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: tokens,
        message: 'Success'
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
};

const handleTokenOneRequest = async (token) => {
  try {
    const tokens = await queryTokens()
    const tokenIndex = tokens.findIndex((entry) => entry.name === token)
    const dataOfInterest = tokens[tokenIndex].price
    const candleChart = getCandlestickData(dataOfInterest, 1)
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: candleChart,
        message: 'Success'
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
};

const handleTokenSixRequest = async (token) => {
  try {
    const tokens = await queryTokens()
    const tokenIndex = tokens.findIndex((entry) => entry.name === token)
    const dataOfInterest = tokens[tokenIndex].price
    const candleChart = getCandlestickData(dataOfInterest, 6)
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: candleChart,
        message: 'Success'
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
};

const handleNotFound = () => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      error: 'Not Found'
    })
  };
};

module.exports.handler = async (event) => {
  const { httpMethod, path, pathParameters } = event;

  if (httpMethod === 'GET') {
    if (path === '/') {
      return handleRootRequest();
    } else if (pathParameters && pathParameters.token) {
      const token = pathParameters.token;
      if (path === `/${token}/1`) {
        return handleTokenOneRequest(token);
      } else if (path === `/${token}/6`) {
        return handleTokenSixRequest(token);
      }
    }
  }

  return handleNotFound();
};


handleRootRequest().then((res) => console.log(res))