
// =============== Variables ===============
var stockAPIKey = "K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0"
var stockEod
var stockRtd
var numOfDays = 14

// =============== Fetch Functions ===============
const fetchStockEODHistorical = async (companySymbols) => {

    let stockEODHistoricalresponse = await fetch (`https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`)
    let eodData = await stockEODHistoricalresponse.json();
    stockEod = eodData
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

  let stockEODHistoricalresponse = await fetch(
    `https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  console.log(stockEODHistoricalresponse);
  let eodData = await stockEODHistoricalresponse.json();
  console.log(eodData);
};

fetchStockEODHistorical("AAPL")
fetchStockRealTime("AAPL")

/**
 * add event listener for search button and get data for newspaper on submit
 */
var newsApiKey = "9PncQC7G9Fw1IBbcYpjiZa1T4of4Qrgq";
var formEl = $("#search_form");
var searchInputEl = $("#search_input");
formEl.on("submit", function (e) {
  e.preventDefault();
  console.log(searchInputEl.val());
  var inputVal = searchInputEl.val();

  //getTicker()

  getTicker(inputVal);
  // convert search input into company proper name 'Apple or AAPL' -> 'Apple Inc.'Apple
  //   getNewsData(inputVal);
});
const getTicker = async (input) => {
  const response = await fetch(
    `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${input}`,
    {
      headers: {
        "x-api-key": " AGCJTVhXEI6nit286CVCQ9ArKw62Ejwxapo8eKgW",
      },
    }
  );
  const data = await response.json();

  console.log(data.ResultSet.Result[0]);
};
const getNewsData = async (input) => {
  console.log(input);
  let newsDataResponse = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${input}&api-key=${newsApiKey}`
  );
  let newsData = await newsDataResponse.json();
  console.log(newsData.response.docs);
};
function init() {}
init();


// console.log(newdata());
