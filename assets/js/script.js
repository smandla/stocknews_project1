// =============== Variables ===============
var stockAPIKey = "K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0"
var stockEod
var stockRtd
var numOfDays = 14

const fetchStockEODHistorical = async (companySymbols) => {
    let stockEODHistoricalresponse = await fetch (`https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    let eodData = await stockEODHistoricalresponse.json();
    stockEod = eodData
    console.log (stockEod);
    for (var i = 0; i < numOfDays ; i++) {
        console.log ("date", stockEod.data[i].date);        
        console.log ("close", stockEod.data[i].close);
        console.log ("high", stockEod.data[i].high);
        console.log ("low", stockEod.data[i].low);
        console.log ("open", stockEod.data[i].open);
        console.log ("volume", stockEod.data[i].volume);        
    }
};


const fetchStockRealTime = async (companySymbols) => {
    let stockRealTimeresponse = await fetch (`https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`)
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
//fetchStockRealTime("AAPL")
