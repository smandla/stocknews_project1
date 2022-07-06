stockAPIKey = "K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0"

const fetchStockEODHistorical = async (companySymbols) => {
    let stockEODHistoricalresponse = await fetch (`https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    console.log (stockEODHistoricalresponse)
    let eodData = await stockEODHistoricalresponse.json();
    console.log (eodData)
};


const fetchStockRealTime = async (companySymbols) => {
    let stockRealTimeresponse = await fetch (`https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    console.log (stockRealTimeresponse)
    let eodData = await stockRealTimeresponse.json();
    console.log (eodData)
};


fetchStockEODHistorical("AAPL")
console.log('%c ==================== SPACER ====================', 'color:orange;font-weight:900');
fetchstockRealTime("AAPL")
