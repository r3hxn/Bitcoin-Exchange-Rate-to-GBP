const axios = require('axios');


//bitCoin to GBP
const getExchangeRate = ()=> {
  return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(res => {
    let rate = res.data.bpi.GBP.rate_float;
    return rate;
  })
  .catch(error => {
   return "Server is Currently Not availble";
  });
}

const getHistoricalData = () => {
  return axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=GBP')
    .then(res => {
      // console.log("exchange Rate returned;", res.data.bpi);
      return res.data;
    })
    .catch(error => {
      console.log(error)
    return "Server is Currently Not availble";
    });
}

module.exports = {
  getExchangeRate,
  getHistoricalData
}
