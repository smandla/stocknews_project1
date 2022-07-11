// ====Stock Keys====
//apikey1: K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0 x
//apikey2: U7v3xcQrckzcWtf6HYAUT5MO5JYgd5MCgQxZliSD x
//apikey3: eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8
//apikey4: 4aRhyidl5C5gq9mPktjw8qqjPMeOG4IdYgvL218L
//apikey5: xWvzUJNDHlYWinQw2RmfvktQLDUKlbJ6KmK5cth7
//apikey6: MoK3MjXgPlgHKLkmmPQ7eEhFpOZLVFRSGIGJFUJK
//apikey7: kmL8fQ0udH795aLBeHF8LgfSGft1kwkRI2efNlLL

// ====Yahoo Keys====
// 1:zlUmPNwUgb5oDLZES1jtj2OGxsGnI3Pu9Gk6bVNp
// 2:AGCJTVhXEI6nit286CVCQ9ArKw62Ejwxapo8eKgW x
// 3:gGt5JXw9g18ZmRyVohI638kLGeu1GJTE5jmM8khY
// 4:xWvzUJNDHlYWinQw2RmfvktQLDUKlbJ6KmK5cth7
// 5:on4Q06YqoB1WD4eAZd3FZ5oehxCs7tmf5BzelPu1
// 6:yVXgGlHmg34CsiJSYM3eG1TlV2fDeT1b4APFBk6b

// ====News Keys====
// 1:9PncQC7G9Fw1IBbcYpjiZa1T4of4Qrgq

// ====Info Keys====
// 1:973dd69ad729bc5ec99c97d881b85c04
// 2:5c90c4482d1038a42bbb2e5903207658
// 3:aa4a803775e72d3de3a4d7ec275113d2
// 4:d9a06ad75e28929230f1da93aca4cb17
// 5:5278c2342f937c25cfe3a2aa31f460d4
// 6:9e1c1223806cfd0cd57977689e3d930d

// ======================================= Keys =======================================

// var stockAPIKey = "eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8";
// var yahooAPIKey = "zlUmPNwUgb5oDLZES1jtj2OGxsGnI3Pu9Gk6bVNp";
var newsApiKey = "9PncQC7G9Fw1IBbcYpjiZa1T4of4Qrgq";
// var infoAPIkey = "d9a06ad75e28929230f1da93aca4cb17";

// ======================================= Variables =======================================
var stockEod;
var stockRtd;

var formEl = $("#search_form");
var searchInputEl = $("#search_input");
var cardsEl = $("#cards");
var modal402El = $("#402-status");
var badSearchModalEl = $("#bad-search");
var dropdownContent = document.querySelector(".dropdown-content");

var nameEl = $("#name");
var tickerEl = $("#ticker");
var dayChangeEl = $("#change");
var titleNewsEl = $("#news_title_section");
var priceEl = $("#price");
var prevCloseEl = $("#prevClose");
var openEl = $("#open");
var dayLEl = $("#dayL");
var dayHEl = $("#dayH");
var yearLEl = $("#yearL");
var yearHEl = $("#yearH");
var symbol;
var companyName;
var companyList = [];

var arr = new Array();

// ======================================= Fetch Functions =======================================

/**
 * Fetches historical end-of-day stock data
 * @param {*} companySymbols - ticker name for the companies searched
 */
const fetchStockEODHistorical = async (companySymbols) => {
  var stockEODHistoricalresponse = await fetch(
    `https://api.stockdata.org/v1/data/eod?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  if (stockEODHistoricalresponse.status === 402) {
    modal402El.addClass("is-active");
  }
  var eodData = await stockEODHistoricalresponse.json();
  var stockEod = eodData.data;
  var indexArr = [];
  if (arr !== []) {
    arr = [];
  }
  for (var i = stockEod.length - 1; i >= 0; i--) {
    var days = stockEod[i].date;
    indexArr[0] = Date.parse(days);
    indexArr[1] = stockEod[i].open;
    indexArr[2] = stockEod[i].high;
    indexArr[3] = stockEod[i].low;
    indexArr[4] = stockEod[i].close;
    arr.push(indexArr);

    indexArr = [];
  }
  chart(arr);
};

/**
 * Fetches real time stock data for display
 * @param {*} companySymbols - ticker name for the company searched
 */
const fetchStockRealTime = async (companySymbols) => {
  console.log(companySymbols);
  var stockRealTimeresponse = await fetch(
    `https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  if (stockRealTimeresponse.status === 402) {
    modal402El.addClass("is-active");
  }
  var realTimeData = await stockRealTimeresponse.json();
  stockRtd = realTimeData;
  console.log(stockRtd.data);
  if (stockRtd.data[0] === undefined) {
    console.log("no data");
    badSearchModalEl.addClass("is-active");
  }
  nameEl.text(stockRtd.data[0].name);
  tickerEl.text("(" + stockRtd.data[0].ticker + ")");
  dayChangeEl.html(
    "Day Change: " + "<span>" + stockRtd.data[0].day_change + "</span>"
    );
  if (stockRtd.data[0].day_change < 0) {
    dayChangeEl.addClass("negative");
  } else if (stockRtd.data[0].day_change >= 0) {
    dayChangeEl.removeClass("negative").addClass("positive");
  }
  priceEl.text("Current Price: $" + stockRtd.data[0].price);
  prevCloseEl.text("$" + stockRtd.data[0].previous_close_price);
  openEl.text("$" + stockRtd.data[0].day_open);
  dayLEl.text("$" + stockRtd.data[0].day_low);
  dayHEl.text("$" + stockRtd.data[0].day_high);
  yearLEl.text("$" + stockRtd.data[0]["52_week_low"]);
  yearHEl.text("$" + stockRtd.data[0]["52_week_high"]);
};

/**
 * Calls functions to fetch data for the rest of the page
 * @param {*} input - Takes company user is searching for to return ticker name
 */
const getTicker = async (input) => {
  var response = await fetch(
    `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${input}`,
    {
      headers: {
        "x-api-key": `${yahooAPIKey}`,
      },
    }
  );
  if (response.status === 402) {
    modal402El.addClass("is-active");
  }
  var data = await response.json();
  console.log(data);
  if (data.ResultSet.Result[0] === undefined) {
    badSearchModalEl.addClass("is-active");
  }
  symbol = data.ResultSet.Result[0].symbol;
  companyName = data.ResultSet.Result[0].name;
  console.log(companyName, symbol);
  if (companyList.includes(companyName) === false) {
    companyList.push(companyName);

    localStorage.setItem(companyName, symbol);
    if (companyList.length > 4) {
      companyList.shift();
      localStorage.removeItem(companyList[0]);
      localStorage.setItem("companyList", JSON.stringify(companyList));
      writeHistory();
    } else {
      localStorage.setItem("companyList", JSON.stringify(companyList));
      writeHistory();
    }
  }
  console.log(companyName);
  getNewsData(companyName);
  fetchStockRealTime(symbol);
  fetchStockEODHistorical(symbol);
  getInfo(symbol);
  // for (var i = 0; i < 100000000; i++) {}
};

/**
 * Fetches and calls function to display articles
 * @param {*} input - Takes company name and fetches NYTimes articles
 */
const getNewsData = async (input) => {
  var newsDataResponse = await fetch(

    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${input}&api-key=${newsApiKey}`
    );
    var newsData = await newsDataResponse.json();
    var articles = newsData.response.docs;
    await showNewsData(articles);
  };
  
  /**
   * Get data for market index headline
 */
const getIndexData = async () => {
  var indexResponse = await fetch(
    "https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US",
    {
      headers: {
        "x-api-key": `${yahooAPIKey}`,
      },
    }
  );
  var data = await indexResponse.json();
  var indexData = data.marketSummaryResponse.result;
  showIndexData(indexData);
};

/**
 * Writes Company info to page
 * @param {*} input - Takes stock ticker input for api call
 */

const getInfo = async (input) => {
  var infoResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${input}?apikey=${infoAPIkey}`
  );
  var infoData = await infoResponse.json();
  var companyNameAboutEl = $("#company_name_aboutsection");
  var exchangeEl = $("#exchange");
  var sectorEl = $("#sector");
  var industryEl = $("#industry");
  var ceoEl = $("#ceo");
  var ipoEl = $("#ipo");
  var siteEl = $("#site");
  companyNameAboutEl.text(companyName);

  exchangeEl.text(infoData[0].exchangeShortName);
  sectorEl.text(infoData[0].sector);
  industryEl.text(infoData[0].industry);
  ceoEl.text(infoData[0].ceo);
  ipoEl.text(infoData[0].ipoDate);
  siteEl.html(
    '<a href="' +
      infoData[0].website +
      '" target="_blank">' +
      infoData[0].website +
      "</a>"
  );
  let newsData = await newsDataResponse.json();
  console.log(newsData);
  let articles = newsData.response.docs;
  await showNewsData(articles);

};

// ======================================= Display to Page Functions =======================================

/**
 * Writes articles to page
 * @param {*} articles - Takes array of articles
 */
async function showNewsData(articles) {
  titleNewsEl.text(companyName + " News");
  cardsEl.html("");
  for (var i = 0; i < articles.length; i++) {
    var cardEl = $("<div>").addClass("card has-text-light pt-5 card_section");
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
        `https://static01.nyt.com/${articles[i].multimedia[0].url}`
      );
    }
    imgEl.appendTo(figureEl);

    //<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    /**card content */
    var cardContentEl = $("<div>").addClass("card-content");
    var aTagEl = $("<a>")
      .css("textDecoration", " none")
      .attr("href", articles[i].web_url)
      .attr("target", '="_blank"');
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

var headlinesEl = $("#headlines");
// var snpTitleEl = $("#snp");
// var snpMarketPriceEl = $("#snp_mrktprice");
// var snpMarketChangeEl = $("#snp_mrktchnge");
// var snpMarketChangePercentEl = $("#snp_mrktchngeprcnt");
const showIndexData = (indexData) => {
  for (let i = 0; i < indexData.length; i++) {
    var spanEl = $("<span>");
    spanEl.appendTo(headlinesEl);
    var titleEl = $("<span>")
      .attr("id", indexData[i].exchange)
      .addClass("bold");
    if (indexData[i].shortName) {
      titleEl.text(indexData[i].shortName);
    } else {
      titleEl.text(indexData[i].exchange);
    }
    titleEl.appendTo(spanEl);
    var marketPriceEl = $("<span>")
      .attr("id", indexData[i].regularMarketPrice.fmt)
      .text(` $${indexData[i].regularMarketPrice.fmt}`);
    marketPriceEl.appendTo(spanEl);

    var marketChangeEl = $("<span>").attr(
      "id",
      indexData[i].regularMarketChange.fmt
    );
    if (indexData[i].regularMarketChange.raw < 0) {
      marketChangeEl
        .addClass("negative")
        .text(`▼${indexData[i].regularMarketChange.fmt}`);
    } else if (indexData[i].regularMarketChange.raw >= 0) {
      marketChangeEl
        .addClass("positive")
        .text(`▲${indexData[i].regularMarketChange.fmt}`);
    }
    marketChangeEl.appendTo(spanEl);
    var marketChangePercentEl = $("<span>")
      .attr("id", indexData[i].regularMarketChangePercent.fmt)
      .text(`(${indexData[i].regularMarketChangePercent.fmt}) | `);
    marketChangePercentEl.appendTo(spanEl);
    /**
     *    <span>
          <span id="snp" class="bold"></span>
          <span id="snp_mrktprice"></span>
          <span id="snp_mrktchnge"></span>
          <span id="snp_mrktchngeprcnt"></span>
        </span>
     */
  }
};

/**
 * Uses highcharts to display fetched historical EOD data
 * @param {*} data - array data from historical EOD
 */
function chart(arr) {
  Highcharts.stockChart("candlestick", {
    rangeSelector: {
      selected: 11,
    },
    title: {
      text: companyName,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "candlestick",
        name: "Price",
        data: arr,
        dataGrouping: {
          units: [
            ["week", [1]],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  });
}

/**
 * Writes search history to search history box
 */
function writeHistory() {
  dropdownContent.innerHTML = "";
  for (var i = 0; i < companyList.length; i++) {
    var pEl = $("<p></p>");
    $(pEl).attr("class", "dropdown-item");
    $(pEl).attr("id", `search${i}`);
    $(pEl).text(companyList[i].split(",")[0]);
    var hrEl = $("<hr></hr>");
    $(hrEl).attr("class", "dropdown-divider");
    $(dropdownContent).append(hrEl);
    $(dropdownContent).append(pEl);
  }
}

// ======================================= Event Listeners =======================================
/**
 * add event listener for search button and get data for newspaper on submit
 */
formEl.on("submit", async function (e) {
  e.preventDefault();
  var inputVal = searchInputEl.val();
  searchInputEl.val("");
  $(".spin").attr("style", "display: block");
  // $(".spin").removeAttr("style", "display: none")
  if (inputVal === "") {
    $("#empty-search").addClass("is-active");
    $(".spin").attr("style", "display:none;");
  } else {
    try {
      console.log("in try");
      await getTicker(inputVal);
      $(".spin").attr("style", "display:none;");
    } catch (error) {
      console.log("error:", error);
      $(".spin").attr("style", "display:none;");
    }
  }
  // convert search input into company proper name 'Apple or AAPL' -> 'Apple Inc.'Apple
});

//Modals
$("#empty-search-button").click(function () {
  $("#empty-search").removeClass("is-active");
});

//Modals - close button functionality
$("#empty-search-button").click(function () {
  $("#empty-search").removeClass("is-active");
});

$("#bad-search-button").click(function () {
  $("#bad-search").removeClass("is-active");
});

$("#402-status-button").click(function () {
  $("#402-status").removeClass("is-active");
});

// Sets search history to appear when in focus and dissapear shortly after it loses focus
document.querySelector("#search_input").addEventListener("blur", function () {
  setTimeout(function () {
    document.querySelector("#dropdown").setAttribute("style", "display:none;");
  }, 200);
});

document.querySelector("#search_input").addEventListener("focus", function () {
  document
    .querySelector("#dropdown")
    .setAttribute("style", "display:inline-block;");
});

/**
 * Fetches information based on what search history element was clicked
 */
dropdownContent.addEventListener("click", async function (e) {
  console.log("ok");
  for (var i = 0; i < companyList.length; i++) {
    if (e.target.matches(`#search${i}`)) {
      $(".spin").attr("style", "display:block;");
      companyName = companyList[i];
      try {
        var a = getNewsData(companyList[i]);
        var b = fetchStockEODHistorical(localStorage.getItem(companyList[i]));
        var c = fetchStockRealTime(localStorage.getItem(companyList[i]));
        var d = getInfo(localStorage.getItem(companyList[i]));
        await Promise.all([a, b, c, d]);
      } catch (error) {
        console.log(error);
      }
      $(".spin").attr("style", "display:none;");
    }
  }
  document.querySelector("#dropdown").setAttribute("style", "display:none;");
});

var defaultKey = []
$('#default').on("click", function(){
  var findName = (companyList[companyList.length-1])
  var findSymbol = localStorage.getItem(companyList[companyList.length-1])
  console.log(findName)
  console.log(findSymbol)
  defaultKey = [findName, findSymbol]
  localStorage.setItem('defaultKey', JSON.stringify(defaultKey))
})

// ======================================= On Load =======================================
/**
 * On page load function
 */
async function init() {
  setTimeout(function () {
    $(".spin").attr("style", "display:none;");
  }, 500);
  if (Boolean(JSON.parse(localStorage.getItem("companyList"))) !== false) {
    companyList = JSON.parse(localStorage.getItem("companyList"));
  }
  writeHistory();
  companyName = "Apple Inc.";
  symbol = "AAPL";
  console.log(!localStorage.getItem('defaultKey'))
  console.log(JSON.parse(localStorage.getItem('defaultKey')))
  if (JSON.parse(localStorage.getItem('defaultKey') !== null)){
    defaultKey = JSON.parse(localStorage.getItem('defaultKey'))
    companyName = defaultKey[0]
    symbol = defaultKey[1]
  }
  console.log(companyName)
  console.log(symbol)
  try {
    var a = getNewsData(companyName);
    var b = fetchStockRealTime(symbol);
    var c = fetchStockEODHistorical(symbol);
    var d = getInfo(symbol);
    var e = getIndexData();
    await Promise.all([a, b, c, d, e]);
  } catch (error) {
    console.log(error);
  }
  $(".spin").attr("style", "display:none;");
}
init();
