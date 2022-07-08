// =============== Variables ===============
//apikey1: K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0
//apikey2: U7v3xcQrckzcWtf6HYAUT5MO5JYgd5MCgQxZliSD
//apikey3: eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8

var stockAPIKey = "K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0";

var newsApiKey = "9PncQC7G9Fw1IBbcYpjiZa1T4of4Qrgq";
var yahooAPIKey = "Ztrai9erbS9aPeUHuug2h4Cb6M0hVrBx90fcGFLM";
var stockEod;
var stockRtd;
var numOfDays = 14;

var formEl = $("#search_form");
var searchInputEl = $("#search_input");
var cardsEl = $("#cards");

var dropdownContent = document.querySelector(".dropdown-content");

var titleNewsEl = $("#news_title_section");

var symbol;
var companyName;
var companyList = [];
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

var arr = new Array();

// =============== Fetch Functions ===============

/**
 * Fetches historical end-of-day stock data
 * @param {*} companySymbols - ticker name for the companies searched
 */
const fetchStockEODHistorical = async (companySymbols) => {
  let stockEODHistoricalresponse = await fetch(
    `https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  let eodData = await stockEODHistoricalresponse.json();
  var stockEod = eodData.data;
  console.log(stockEod)
  var indexArr = [];
  if (arr !== []){
    arr = []
  }
  for (let i = stockEod.length-1; i >= 0; i--) {
    let days = stockEod[i].date;
    indexArr[0] = Date.parse(days);
    // indexArr[0] = date*1000;
    indexArr[1] = stockEod[i].open;
    indexArr[2] = stockEod[i].high;
    indexArr[3] = stockEod[i].low;
    indexArr[4] = stockEod[i].close;
    arr.push(indexArr);

    indexArr = [];
  }
  console.log(arr)
  chart(arr)
  console.log(arr)
};

/**
 * Fetches real time stock data for display
 * @param {*} companySymbols - ticker name for the company searched
 */
const fetchStockRealTime = async (companySymbols) => {
  let stockRealTimeresponse = await fetch(
    `https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  let realTimeData = await stockRealTimeresponse.json();
  stockRtd = realTimeData;
  $("#name").text(stockRtd.data[0].name);
  $("#ticker").text("(" + stockRtd.data[0].ticker + ")");
  $("#change").text("Day Change:" + stockRtd.data[0].day_change);
  if (stockRtd.data[0].day_change < 0) {
    $("#change").addClass("has-background-danger");
  } else if (stockRtd.data[0].day_change >= 0) {
    $("#change")
      .removeClass("has-background-danger")
      .addClass(has - background - success);
  }
  $("#price").text("Current Price: $" + stockRtd.data[0].price);
  $("#prevClose").text(
    "Previous Close Price: $" + stockRtd.data[0].previous_close_price
  );
  $("#open").text("Day Open: $" + stockRtd.data[0].day_open);
  $("#dayL").text("Day Low: $" + stockRtd.data[0].day_low);
  $("#dayH").text("Day High: $" + stockRtd.data[0].day_high);
  $("#yearL").text("52 Week Low: $" + stockRtd.data[0]["52_week_low"]);
  $("#yearH").text("52 Week High: $" + stockRtd.data[0]["52_week_high"]);
};

/**
 * Calls functions to fetch data for the rest of the page
 * @param {*} input - Takes company user is searching for to return ticker name
 */
const getTicker = async (input) => {
  const response = await fetch(
    `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${input}`,
    {
      headers: {
        "x-api-key": `${yahooAPIKey}`,
      },
    }
  );
  const data = await response.json();
  symbol = data.ResultSet.Result[0].symbol;
  companyName = data.ResultSet.Result[0].name;
  if (companyList.includes(companyName) === false) {
    companyList.push(companyName);
    localStorage.setItem(companyName, symbol);
    if (companyList.length > 4) {
      companyList.shift();
      localStorage.removeItem(companyList[0]);
      localStorage.setItem("companyList", JSON.stringify(companyList));
    } else {
      localStorage.setItem("companyList", JSON.stringify(companyList));
      writeHistory();
    }
  }
  getNewsData(companyName);
  fetchStockRealTime(symbol);
  fetchStockEODHistorical(symbol);
  getInfo(symbol);
};

/**
 * Fetches and calls function to display articles
 * @param {*} input - Takes company name and fetches NYTimes articles
 */
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

/**
 * Writes articles to page
 * @param {*} articles - Takes array of articles
 */
function showNewsData(articles) {
  console.log(articles);
  titleNewsEl.text(companyName + " News");
  cardsEl.html('')
  for (let i = 0; i < articles.length; i++) {
    var cardEl = $("<div>").addClass(
      "card has-background-dark has-text-grey-light pt-5"
    );
    var cardImageDivEl = $("<div>").addClass("card-image");
    cardImageDivEl.appendTo(cardEl);
    var figureEl = $("<figure>").addClass("image is-4by3");
    figureEl.appendTo(cardImageDivEl);
    var imgEl = $("<img>");
    // console.log(articles[i].multimedia);
    if (articles[i].multimedia[0] === undefined) {
      imgEl.attr(
        "src",
        "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1491958734/bqp32una36b06hmbulla.png"
      );
    } else {
      imgEl.attr(
        "src",
        `https://static01.nyt.com/${articles[i].multimedia[0].legacy.xlarge}`
      );
    }
    imgEl.appendTo(figureEl);

    //<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    /**card content */
    var cardContentEl = $("<div>").addClass("card-content");
    var aTagEl = $("<a>")
      .css("textDecoration", " none")
      .attr("href", articles[i].web_url);
    var mediaDivEl = $("<div>").addClass("media");
    mediaDivEl.appendTo(cardContentEl);
    var TitleDivEl = $("<div>")
      .addClass("media-content")
      .css("overflow", "hidden");

    var titleEl = $("<p>")
      .addClass("title is-4")
      .text(articles[i].headline.main);
    titleEl.appendTo(aTagEl);
    aTagEl.appendTo(TitleDivEl);
    //   <p class="subtitle is-6">@johnsmith</p>
    var subEl = $("<p>")
      .addClass("subtitle is-6")
      .text(articles[i].byline.original);
    subEl.appendTo(TitleDivEl);
    var contentDivEl = $("<div>")
      .addClass("content")
      .html(articles[i].lead_paragraph);
    contentDivEl.appendTo(cardContentEl);
    TitleDivEl.appendTo(mediaDivEl);
    cardContentEl.appendTo(cardEl);
    cardEl.appendTo(cardsEl);
  }
}

/**
 * exchange, ceo, sector, website, ipoDate
 */
var infoAPIkey = "973dd69ad729bc5ec99c97d881b85c04";

const getInfo = async (input) => {
  console.log(input);
  let infoResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${input}?apikey=${infoAPIkey}`
  );
  let infoData = await infoResponse.json();
  $("#exchange").text("Exchange: " + infoData[0].exchangeShortName);
  $("#sector").text("Sector: " + infoData[0].sector);
  $("#industry").text("Industry: " + infoData[0].industry);
  $("#ceo").text("CEO: " + infoData[0].ceo);
  $("#ipo").text("IPO Date: " + infoData[0].ipoDate);
  $("#site").html(
    "Website: " +
      '<a href="' +
      infoData[0].website +
      '" target="_blank">' +
      infoData[0].website +
      "</a>"
  );
  // console.log(infoData[0]);
  // console.log("Exchange: " + infoData[0].exchangeShortName);
  // console.log("Sector: " + infoData[0].sector);
  // console.log("Industry: " + infoData[0].industry);
  // console.log("CEO: " + infoData[0].ceo);
  // console.log("IPO Date: " + infoData[0].ipoDate);
  // console.log("Website: " + infoData[0].website);
};

// Uses highcharts to display fetched historical EOD data
function chart(data){
  Highcharts.getJSON(
    "https://demo-live-data.highcharts.com/aapl-ohlc.json",
    function (data) {
      // create the chart
      console.log("im in chart")
      Highcharts.stockChart("candlestick", {
        rangeSelector: {
          selected: 11,
        },
        title: {
          text: companyName + " Price History",
        },
        credits:{
          enabled:false
        },
        series: [
          {
            type: "candlestick",
            name: "Price",
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
  );}

/**
 * Writes search history to search history box
 */
function writeHistory() {
  dropdownContent.innerHTML = "";
  for (var i = 0; i < companyList.length; i++) {
    var pEl = document.createElement("p");
    pEl.setAttribute("class", "dropdown-item");
    pEl.setAttribute("id", `search${i}`);
    pEl.textContent = companyList[i];
    var hrEl = document.createElement("hr");
    hrEl.setAttribute("class", "dropdown-divider");
    dropdownContent.appendChild(hrEl);
    dropdownContent.appendChild(pEl);
  }
}

// =============== Event ===============
/**
 * add event listener for search button and get data for newspaper on submit
 */
formEl.on("submit", function (e) {
  e.preventDefault();
  var inputVal = searchInputEl.val();

  searchInputEl.val("");
  getTicker(inputVal);
  // convert search input into company proper name 'Apple or AAPL' -> 'Apple Inc.'Apple
});

document.querySelector("#search_input").addEventListener("blur", function (){
  setTimeout (function () {
    document.querySelector("#dropdown").setAttribute("style","display:none;")
  }, 200)
})

document.querySelector("#search_input").addEventListener("focus", function (){
  document.querySelector("#dropdown").setAttribute("style","display:inline-block;")
})

dropdownContent.addEventListener("click", function (e) {
  console.log("clicked");
  for (var i = 0; i < companyList.length; i++) {
    if (e.target.matches(`#search${i}`)) {
      getNewsData(companyList[i]);
      fetchStockEODHistorical(localStorage.getItem(companyList[i]));
      fetchStockRealTime(localStorage.getItem(companyList[i]));
      console.log(companyList[i]);
    }
  }
  document.querySelector("#dropdown").setAttribute("style","display:none;")
});

// =============== On Load ===============
/**
 * On page load function
 */
function init() {
  if (Boolean(JSON.parse(localStorage.getItem("companyList"))) !== false) {
    companyList = JSON.parse(localStorage.getItem("companyList"));
  }
  writeHistory();
}
init();
