// ====Stock Keys====
//apikey1: K6okZSBQ1g8zI1JkQgobaOIGzVbCvq3aSNcaARG0 x
//apikey2: U7v3xcQrckzcWtf6HYAUT5MO5JYgd5MCgQxZliSD x
//apikey3: eauDK4H3TkATb6LOtPlIq9pefdDc5fqmkQF7lkI8
//apikey4: 4aRhyidl5C5gq9mPktjw8qqjPMeOG4IdYgvL218L
//apikey5: xWvzUJNDHlYWinQw2RmfvktQLDUKlbJ6KmK5cth7
//apikey6: MoK3MjXgPlgHKLkmmPQ7eEhFpOZLVFRSGIGJFUJK
//apikey7: kmL8fQ0udH795aLBeHF8LgfSGft1kwkRI2efNlLL
//apikey8: 1OsjbMP8IHg6pjC8bJBN33hr0FinHir3mdWLV3d1

// ====Yahoo Keys====
// 1:zlUmPNwUgb5oDLZES1jtj2OGxsGnI3Pu9Gk6bVNp x
// 2:AGCJTVhXEI6nit286CVCQ9ArKw62Ejwxapo8eKgW x
// 3:gGt5JXw9g18ZmRyVohI638kLGeu1GJTE5jmM8khY x
// 4:xWvzUJNDHlYWinQw2RmfvktQLDUKlbJ6KmK5cth7 x
// 5:on4Q06YqoB1WD4eAZd3FZ5oehxCs7tmf5BzelPu1 x
// 6:yVXgGlHmg34CsiJSYM3eG1TlV2fDeT1b4APFBk6b x
// 7:P1rYCjaI8o6JDZ44NcRxpR3nqhEpe3waSdgR9Qoa x
// 8:3EOxAGRdyK5Wm1IjFj7lD9vm64KbccJr53CT6Wfu x
// 9:hEQk86zZLc2h83eJExKMT3PoMcMIBEov4QhDDGUe

// ====News Keys====
// 1:9PncQC7G9Fw1IBbcYpjiZa1T4of4Qrgq
// 2: ntvEWYii6UloLdyL0Qyod0R0PblpjWie

// ====Info Keys====
// 1:973dd69ad729bc5ec99c97d881b85c04
// 2:5c90c4482d1038a42bbb2e5903207658
// 3:aa4a803775e72d3de3a4d7ec275113d2
// 4:d9a06ad75e28929230f1da93aca4cb17
// 5:5278c2342f937c25cfe3a2aa31f460d4
// 6:9e1c1223806cfd0cd57977689e3d930d
// 7:7c2786f04977c8a3c9f8f17c98e36e88

// ======================================= Keys =======================================

var stockAPIKey = "xWvzUJNDHlYWinQw2RmfvktQLDUKlbJ6KmK5cth7";
var yahooAPIKey = "on4Q06YqoB1WD4eAZd3FZ5oehxCs7tmf5BzelPu1";
var newsApiKey = "ntvEWYii6UloLdyL0Qyod0R0PblpjWie";
var infoAPIkey = "7c2786f04977c8a3c9f8f17c98e36e88";

// ======================================= Variables =======================================
var stockEod;
var stockRtd;

var formEl = $("#search_form");
var searchInputEl = $("#search_input");
var cardsEl = $("#cards");
var modal402El = $("#402-status");
var badSearchModalEl = $("#bad-search");
var multipleResultsModalEl = $("#multiple-results")
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
var companyNameAboutEl = $("#company_name_aboutsection");
var exchangeEl = $("#exchange");
var sectorEl = $("#sector");
var industryEl = $("#industry");
var ceoEl = $("#ceo");
var ipoEl = $("#ipo");
var siteEl = $("#site");
var symbol;
var companyName;
var companyList = [];
var defaultKey = [];
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
  //error handling
  if (stockEODHistoricalresponse.status === 402) {
    modal402El.addClass("is-active");
  }
  //json response
  var eodData = await stockEODHistoricalresponse.json();

  //grab data array
  var stockEod = eodData.data;
  if (stockEod === undefined) {
    return false;
  }
  //rename displays
  nameEl.text(eodData.meta.name);
  tickerEl.text("(" + eodData.meta.ticker + ")");
  exchangeEl.text(eodData.meta.exchange.exchange_long);

  // create empty array for data manipulation logic
  var indexArr = [];

  // make sure the arr var is empty to push new information
  if (arr !== []) {
    arr = [];
  }

  //for every object in the data convert info to an array [{}] -> [[]]\

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

  //display highcharts with manipulated data
  chart(arr);

  //resize news section based on height of rendered chart
  getHeight();

  return true;
};

/**
 * Fetches real time stock data for display
 * @param {*} companySymbols - ticker name for the company searched
 */
const fetchStockRealTime = async (companySymbols) => {
  var stockRealTimeresponse = await fetch(
    `https://api.stockdata.org/v1/data/quote?symbols=${companySymbols}&api_token=${stockAPIKey}`
  );
  //error handling
  if (stockRealTimeresponse.status === 402) {
    modal402El.addClass("is-active");
  }
  //json response
  var realTimeData = await stockRealTimeresponse.json();
  stockRtd = realTimeData;
  if (stockRtd.data[0] === undefined) {
    return false;
  }
  //change data on screen
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
const getTicker = async (input, modal) => {
  var response = await fetch(`https://financialmodelingprep.com/api/v3/search-name?query=${input}&limit=10&exchange=NASDAQ&apikey=${infoAPIkey}`)
  // Yahoo finance API appears to be nonfunctional, possibly permanently?
  // var response = await fetch(
  //   `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${input}`,
  //   {
  //     headers: {
  //       "x-api-key": `${yahooAPIKey}`,
  //     },
  //   }
  // );
  //error handling
  if (response.status === 402) {
    modal402El.addClass("is-active");
  }
  // json response
  var data = await response.json();

  // Method for picking from multiple options goes here:
  if (data.length > 1 && modal !=='noModal') {
    searchOptionsModal(data)
  }

  //error handling
  if (data[0].symbol === undefined) {
    badSearchModalEl.addClass("is-active");
  }
  //update companyName and symbol
  symbol = data[0].symbol;
  companyName = data[0].name;

  // add company to company list and local storage if it's not already included
  if (companyList.includes(companyName) === false) {
    companyList.push(companyName);
    localStorage.setItem(companyName, symbol);

    //when length > 5, removes oldest search
    if (companyList.length > 5) {
      localStorage.removeItem(companyList[0]);
      companyList.shift();
      localStorage.setItem("companyList", JSON.stringify(companyList));
      writeHistory();
    } else {
      localStorage.setItem("companyList", JSON.stringify(companyList));
      writeHistory();
    }
  }
  //refetch data
  getNewsData(companyName);
  getInfo(symbol);
  var a = await fetchStockEODHistorical(symbol);
  var b = await fetchStockRealTime(symbol);

  //error handling
  if (a === true && b === false) {
    console.log(
      "%c Sorry, some information was unable to be drawn from our API.",
      "color: black; background-color:orange; font-weight: bold;"
    );
    writeUnavailable();
  } else if (a === false && b === false) {
    badSearchModalEl.addClass("is-active");
  }
};

function searchOptionsModal(dataArray) {
  var companyList = $('#search-results')
  companyList.html('')
  multipleResultsModalEl.addClass("is-active")
  for (let i = 0; i < dataArray.length; i++) {
    var liEl = $('<li></li>')
    liEl.text(`${dataArray[i].name}`)
    liEl.attr('class', 'search-result-items')
    liEl.attr('id', `result-${[i]}`)
    companyList.append(liEl) 
    $(`#result-${i}`).click(()=>{
      getTicker($(`#result-${i}`).text(), 'noModal')
      multipleResultsModalEl.removeClass('is-active')
    })
  }
}

/**
 * Fetches and calls function to display articles
 * @param {*} input - Takes company name and fetches NYTimes articles
 */
const getNewsData = async (input) => {
  var newsDataResponse = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${input}&api-key=${newsApiKey}`
  );
  //json response
  var newsData = await newsDataResponse.json();
  var articles = newsData.response.docs;
  //display news data on screen
  await showNewsData(articles);
};

/**
 * Get data for market index headline
 * Currently nonfunctional due to Yahoo finance API failure and lack of appropriate replacements
 */
const getIndexData = async () => {
  // var indexResponse = await fetch(
  //   "https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US",
  //   {
  //     headers: {
  //       "x-api-key": `${yahooAPIKey}`,
  //     },
  //   }
  // );
  //json response
  // var data = await indexResponse.json();
  // var indexData = data.marketSummaryResponse.result;
  //display headlines data on screen
  // showIndexData(indexData);
};

/**
 * Writes Company info to page
 * @param {*} input - Takes stock ticker input for api call
 */

const getInfo = async (input) => {
  var infoResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${input}?apikey=${infoAPIkey}`
  );
  //json response
  var infoData = await infoResponse.json();
  //update data on page
  companyNameAboutEl.text(companyName);
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
};

// ======================================= Display to Page Functions =======================================

/**
 * Writes articles to page
 * @param {*} articles - Takes array of articles
 */
async function showNewsData(articles) {
  //update data and create elements to display cards
  titleNewsEl.text(companyName + " News");
  cardsEl.html("");
  for (var i = 0; i < articles.length; i++) {
    var cardEl = $("<div>").addClass("card has-text-light pt-5 card_section");
    var cardImageDivEl = $("<div>").addClass("card-image");
    cardImageDivEl.appendTo(cardEl);
    var figureEl = $("<figure>").addClass("image is-4by3");
    figureEl.appendTo(cardImageDivEl);
    var imgEl = $("<img>");

    //when there is no NYT image to display, display image of NYT logo
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

    /**card content elements */
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
// Headline Banner for rolling stock tickers
var headlinesEl = $("#headlines");
const showIndexData = (indexData) => {
  //create each tag to roll
  for (var i = 0; i < indexData.length; i++) {
    var spanEl = $("<span>");
    spanEl.appendTo(headlinesEl);
    //Exchange Index
    var titleEl = $("<span>")
      .attr("id", indexData[i].exchange)
      .addClass("bold");
    if (indexData[i].shortName) {
      titleEl.text(indexData[i].shortName);
    } else {
      titleEl.text(indexData[i].exchange);
    }
    // Price of Index items
    titleEl.appendTo(spanEl);
    var marketPriceEl = $("<span>")
      .attr("id", indexData[i].regularMarketPrice.fmt)
      .text(` $${indexData[i].regularMarketPrice.fmt}`);
    marketPriceEl.appendTo(spanEl);
    //Market Change
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
    //Market Change Percentage
    marketChangeEl.appendTo(spanEl);
    var marketChangePercentEl = $("<span>")
      .attr("id", indexData[i].regularMarketChangePercent.fmt)
      .text(`(${indexData[i].regularMarketChangePercent.fmt}) | `);
    marketChangePercentEl.appendTo(spanEl);
  }
};

/**
 * Uses highcharts to display fetched historical EOD data
 * @param {*} data - array data from historical EOD
 */
function chart(arr) {
  Highcharts.stockChart("candlestick", {
    //Default Range on chart load
    rangeSelector: {
      selected: 11,
    },
    //Title for chart
    title: {
      text: companyName,
    },
    //Hide Highcharts
    credits: {
      enabled: false,
    },
    //Chart Type, Name of data on Hover, Data Arr pulled, Data Grouping
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
 * Writes unavailable in relevant places when Real Time Api fails
 */
function writeUnavailable() {
  dayChangeEl.html("Day Change: " + "<span>" + "Unavailable" + "</span>");
  dayChangeEl.removeClass("negative").removeClass("positive");
  priceEl.text("Current Price: Unavailable");
  prevCloseEl.text("Unavailable");
  openEl.text("Unavailable");
  dayLEl.text("Unavailable");
  dayHEl.text("Unavailable");
  yearLEl.text("Unavailable");
  yearHEl.text("Unavailable");
  companyNameAboutEl.text("Unavailable");
  sectorEl.text("Unavailable");
  industryEl.text("Unavailable");
  ceoEl.text("Unavailable");
  ipoEl.text("Unavailable");
  siteEl.html("Unavailable");
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
  //If empty search
  if (inputVal === "") {
    $("#empty-search").addClass("is-active");
    $(".spin").attr("style", "display:none;");
  } else {
    try {
      await getTicker(inputVal);
      $(".spin").attr("style", "display:none;");
    } catch (error) {
      console.log("error:", error);
      $(".spin").attr("style", "display:none;");
    }
  }
  // convert search input into company proper name 'Apple or AAPL' -> 'Apple Inc.'Apple
});

//Modals - close button functionality
$("#empty-search-button").click(function () {
  $("#empty-search").removeClass("is-active");
});

$("#bad-search-button").click(function () {
  badSearchModalEl.removeClass("is-active");
});

$("#402-status-button").click(function () {
  modal402El.removeClass("is-active");
});

$("#multiple-results-button").click(function (){
  multipleResultsModalEl.removeClass("is-active")
})

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
  for (var i = 0; i < companyList.length; i++) {
    if (e.target.matches(`#search${i}`)) {
      $(".spin").attr("style", "display:block;");
      companyName = companyList[i];
      var a;
      var b;
      var c;
      var d;
      var e;
      try {
        a = getNewsData(companyList[i]);
        b = fetchStockEODHistorical(localStorage.getItem(companyList[i]));
        c = fetchStockRealTime(localStorage.getItem(companyList[i]));
        d = getInfo(localStorage.getItem(companyList[i]));
        e = await Promise.allSettled([a, b, c, d]);
        if (e[2].value === false) {
          writeUnavailable();
        }
      } catch (error) {
        console.log("error", error);
      }
      if (e[2] === false) {
        writeUnavailable();
      }
      $(".spin").attr("style", "display:none;");
      break
    }
  }
  document.querySelector("#dropdown").setAttribute("style", "display:none;");
});

/**
 * Default Button Event Listtener to set default on init
 */
var defaultKey = [];
$("#default").on("click", function () {
  var findSymbol = localStorage.getItem(companyName);
  defaultKey = [companyName, findSymbol];
  localStorage.setItem("defaultKey", JSON.stringify(defaultKey));
});

// Set the height of the news section to equal the height of the the otehr 3 sections
const getHeight = () => {
  var bannerEl = $("#banner").height();
  var chartSectionEl = $("#chart_section").height();
  var marketSumEl = $("#market_info").height();
  var aboutSectionEl = $("#about_info").height();
  var newsTitleSectionEl = $("#news_title_section").height();
  var sum = bannerEl + chartSectionEl - newsTitleSectionEl;
  if (marketSumEl > aboutSectionEl) {
    sum += marketSumEl;
  } else {
    sum += aboutSectionEl;
  }
  $("#news-wrapper").height(sum);
  cardsEl.height(sum);
};

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

  if (JSON.parse(localStorage.getItem("defaultKey") !== null)) {
    defaultKey = JSON.parse(localStorage.getItem("defaultKey"));
    companyName = defaultKey[0];
    symbol = defaultKey[1];
  }

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
  getHeight();
  $(".spin").attr("style", "display:none;");
}
init();
