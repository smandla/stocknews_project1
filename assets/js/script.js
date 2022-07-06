// =============== Variables ===============
var stockAPIKey = "K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0"
var stockEod
var stockRtd

const fetchStockEODHistorical = async (companySymbols) => {
    let stockEODHistoricalresponse = await fetch (`https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    console.log (stockEODHistoricalresponse)
    let eodData = await stockEODHistoricalresponse.json();
    stockEod = eodData
    console.log (stockEod);
};


const fetchStockRealTime = async (companySymbols) => {
    let stockRealTimeresponse = await fetch (`https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    console.log (stockRealTimeresponse)
    let realTimeData = await stockRealTimeresponse.json();
    stockRtd = realTimeData
    console.log (stockRtd)
    console.log("52 week high:", stockRtd.data[0]["52_week_high"]);
    console.log("52 week low:", stockRtd.data[0]["52_week_low"]);
    console.log("day high:", stockRtd.data[0].day_high);
    console.log("day low:", stockRtd.data[0].day_low);
    console.log("day open", stockRtd.data[0].day_open);
    console.log("price:", stockRtd.data[0].price);
};


fetchStockEODHistorical("AAPL")
fetchStockRealTime("AAPL")
