// =============== Variables ===============
//apikey1: K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0
//apikey2: U7v3xcQrckzcWtf6HYAUT5MO5JYgd5MCgQxZliSD
//apikey3: eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8
var stockAPIKey = "eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8";
var stockEod;
var stockRtd;
var numOfDays = 14;

var symbol;
var companyName;
//[]

var dData = [
  {
    date: 1657036800,
    open: 137.77,
    high: 141.61,
    low: 136.93,
    close: 141.56,
    volume: 73429641,
  },
  {
    date: 1656691200,
    open: 136.04,
    high: 139.04,
    low: 135.66,
    close: 138.93,
    volume: 71051552,
  },
  {
    date: 1656604800,
    open: 137.25,
    high: 138.37,
    low: 133.77,
    close: 136.72,
    volume: 98964467,
  },
  {
    date: 1656518400,
    open: 137.46,
    high: 140.67,
    low: 136.67,
    close: 139.23,
    volume: 66242411,
  },
  {
    date: 1656432000,
    open: 142.13,
    high: 143.42,
    low: 137.32,
    close: 137.44,
    volume: 67315328,
  },
];
//[[],[],[]                 ]
var arr = new Array();

// =============== Fetch Functions ===============
const fetchStockEODHistorical = async (companySymbols) => {
  let stockEODHistoricalresponse = await fetch(
    `https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  let eodData = await stockEODHistoricalresponse.json();
  var stockEod = eodData.data;
  console.log(stockEod);
  //date, open, high, low, close

  //[[(00),(01)]]
  //[( 10),(01)]
  var indexArr = [];
  for (let i = 250; i >= 0; i--) {
    let date = stockEod[i].date;
    indexArr[0] = Date.parse(date);
    // indexArr[0] = date*1000;
    indexArr[1] = stockEod[i].open;
    indexArr[2] = stockEod[i].high;
    indexArr[3] = stockEod[i].low;
    indexArr[4] = stockEod[i].close;
    arr.push(indexArr);

    indexArr = [];
  }
  console.log(arr);
  // console.log(arr);
  // for (let i = stockEod.length - 1; i >= 0; i--) {
  //   var dataDate = stockEod[i].date;
  //   console.log(dataDate);

  //   console.log(Date.parse(dataDate) / 1000);
  //   // arr[i][0] = Date.parse(dataDate) / 1000;
  //   indexArr[0] = Date.parse(dataDate) / 1000;
  //   indexArr[1] = stockEod[i].open;
  //   arr.push(indexArr);

  //   // arr[i][1] = stockEod[i].open;
  //   // arr[i][2] = stockEod[i].high;
  //   // arr[i][3] = stockEod[i].low;
  //   // arr[i][4] = stockEod[i].close;
  //   // console.log(indexArr);
  // }
  // console.log(arr);
  // console.log(indexArr);
  // arr.push(indexArr);
  // console.log(arr);
  // for (var i = 0; i < numOfDays; i++) {
  //   console.log("date", stockEod.data[i].date);
  //   console.log("close", stockEod.data[i].close);
  //   console.log("high", stockEod.data[i].high);
  //   console.log("low", stockEod.data[i].low);
  //   console.log("open", stockEod.data[i].open);
  //   console.log("volume", stockEod.data[i].volume);
  // }
};

const fetchStockRealTime = async (companySymbols) => {
  // let stockRealTimeresponse = await fetch(
  //   `https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`
  // );
  let realTimeData = await stockRealTimeresponse.json();
  stockRtd = realTimeData;
  console.log(stockRtd);
  console.log("52 week high:", stockRtd.data[0]["52_week_high"]);
  console.log("52 week low:", stockRtd.data[0]["52_week_low"]);
  console.log("day high:", stockRtd.data[0].day_high);
  console.log("day low:", stockRtd.data[0].day_low);
  console.log("day open", stockRtd.data[0].day_open);
  console.log("price:", stockRtd.data[0].price);

  // let stockEODHistoricalresponse = await fetch(
  //   `https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`
  // );
  console.log(stockEODHistoricalresponse);
  let eodData = await stockEODHistoricalresponse.json();
  console.log(eodData);
};

fetchStockEODHistorical("AAPL");
// fetchStockRealTime("AAPL");

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
  symbol = data.ResultSet.Result[0].symbol;
  companyName = data.ResultSet.Result[0].name;
  getNewsData(companyName);
  // console.log(data.ResultSet.Result[0]);
};
const getNewsData = async (input) => {
  console.log(input);
  let newsDataResponse = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${input}&api-key=${newsApiKey}`
  );
  let newsData = await newsDataResponse.json();
  let articles = newsData.response.docs;
  console.log(newsData.response.docs);
  showNewsData(articles);
};
var cardsEl = $("#cards");
function showNewsData(articles) {
  for (let i = 0; i < articles.length; i++) {
    var cardEl = $("<div>").addClass("card is-three-quarters");
    var cardImageDivEl = $("<div>").addClass("card-image");
    cardImageDivEl.appendTo(cardEl);
    var figureEl = $("<figure>").addClass("image is-4by3");
    figureEl.appendTo(cardImageDivEl);
    var imgEl = $("<img>").attr(
      "src",
      "https://bulma.io/images/placeholders/1280x960.png"
    );
    imgEl.appendTo(figureEl);

    /**card content */
    var cardContentEl = $("<div>").addClass("card-content");

    var mediaDivEl = $("<div>").addClass("media");
    mediaDivEl.appendTo(cardContentEl);
    var TitleDivEl = $("<div>").addClass("media-content");

    var titleEl = $("<p>").addClass("title is-4").text("Title");
    titleEl.appendTo(TitleDivEl);

    var contentDivEl = $("<div>")
      .addClass("content")
      .html(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elite. Phasellus nec iaculis mauris."
      );
    contentDivEl.appendTo(cardContentEl);
    TitleDivEl.appendTo(mediaDivEl);
    cardContentEl.appendTo(cardEl);
    cardEl.appendTo(cardsEl);
  }
}

function init() {}
init();

// console.log(newdata());

/**
 *[[1594128600000,93.85,94.65,93.06,93.17],
   [1594215000000,94.18,95.38,94.09,95.34],
   [1594301400000,96.26,96.32,94.67,95.75]]
 *
 */
Highcharts.getJSON(
  "https://demo-live-data.highcharts.com/aapl-ohlc.json",
  function (data) {
    // create the chart
    Highcharts.stockChart("candlestick", {
      rangeSelector: {
        selected: 11,
      },

      title: {
        text: "Stock Price",
      },

      series: [
        {
          type: "candlestick",
          name: "AAPL Stock Price",
          data: arr,
          dataGrouping: {
            units: [
              [
                "week", // unit name
                [1], // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]],
            ],
          },
        },
      ],
    });
  }
);
