# stocknews_project1



 <main>
      <div class="tile is-ancestor" >
      <div class="tile headlines"><p class="marquee">
        <span><span id="dow" class="bold">DOW </span><span> 31,338.15</span><span id="val" class="positive">▲-46.6</span><span id="">(-0.15%)▼</span>
        <span  class="bold">NASDAQ </span><span> 31,338.15</span><span id="val" class="positive">▲-46.6</span><span id="">(-0.15%)▼</span></span>

      </p></div></div>
      <div class="tile is-ancestor" >

        <div class="tile is-vertical is-9">

          <div id="banner" class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification company_section">
                <div class="columns">
                  <div class="column is-9" >
                <p id="name" class="title">Company Name</p>
                <p id="ticker" class="subtitle">Ticker</p>
                <div class="columns" >
                  <div class="column">  <p id="change" class="subtitle">Day Change </p></div>
                </div>

                </div>
                <div class="column">
                  <div class=" current_price"> <p id="price" class="subtitle">Current Price</p> <p class="price_current"></p></div>

              </div>
              </div>
              </article>
            </div>

          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification chart_section">
              <p class="title" id="chart_title">Price History</p>
              <p class="subtitle" id="candlestick"></p>
            </article>
          </div>
          <!-- <div class="tile is-parent is-primary">
            <article class="tile is-child notification is-primary">
              <p class="title">Vertical...</p>
              <p class="subtitle">Top tile</p>
            </article>
          </div>  -->
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification market_info">
                <p class="title">Market Information</p>
                <div class="columns more_info">
                  <div class="column">
                    <p class="subtitle">Prev Day Close:<span id="prevClose" class="r"></span></p>
                    <p  class="subtitle">Day Low:<span id="dayL" class="r"></span></p>
                    <p class="subtitle">52 Wk Low:<span id="yearL" class="r"></span></p>

                  </div>
                  <div class="column ">
                    <p class="subtitle">Market Open: <span id="open" class="r"></span></p>
                    <p class="subtitle">Day High: <span  id="dayH" class="r"></span></p>
                    <p class="subtitle">52 Wk High: <span id="yearH"  class="r"></span></p>
                  </div>
                 <!-- <p id="prevClose" class="subtitle">Previous Day close</p>
                <p id="open" class="subtitle">Market Open</p>
                <p id="dayL" class="subtitle">Day Low</p>
                <p id="dayH" class="subtitle">Day High</p>
                <p id="yearL" class="subtitle">52 week Low</p>
                <p id="yearH" class="subtitle">52 week High</p>  -->
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification about_info">
                  <p class="title">About <span id="company_name_aboutsection"></span></p>
                  <div class="columns more_info">
                    <div class="column">
                      <p class="subtitle">Exchange: <span id="exchange" class="r"></span></p>
                      <p class="subtitle">Sector: <span id="sector"  class="r"></span></p>
                      <p class="subtitle">Industry: <span id="industry" class="r"></span></p>

                    </div>
                    <div class="column ">
                      <p class="subtitle">CEO:<span  id="ceo" class="r"></span></p>
                      <p class="subtitle">IPO Date:<span id="ipo" class="r"></span></p>
                      <p class="subtitle">Site:<span id="site" class="r"></span></p>
                    </div>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification NYnews_section">
            <div class="content news_section">
              <p class="title"id="news_title_section">News</p>
              <p class="content topGradient" id="cards">
             </p>
            </div>
            </div>
          </article>
        </div>
      </div>
    </main>
