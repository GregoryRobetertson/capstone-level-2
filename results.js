"use strict";

let newUrl = "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey";

class NewsFetcher {
  constructor(pageUrl, city = 'no city' ) {
    this.city = city;
    this.apiKey = "f99a5be2836b4f2556a9210782282c81";

    this.newsApiUrl = `${newUrl}${pageUrl}&apikey=${this.apiKey}`;
  }

  fetchNews() {
    return fetch(this.newsApiUrl)
      .then((response) => response.json())
      .then((newsData) => {
        return newsData.articles;
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        throw new Error("Failed to fetch news");
      });
  }

  static displayNews(newsData) {
    const newsResultsContainer = document.getElementById("news-results");
    newsResultsContainer.innerHTML = "";
    console.log(newsData);
    newsData.forEach((news) => {
      const newsElement = document.createElement("div");
      newsElement.innerHTML = `
      <div class="card">
      <h2>${news.title}</h2>
      <p>${news.description}</p>
      <div><img src= "${news.image}" alt= "${news.title}"  /></div>
      <p>Check it out <a href="${news.url}">here</a></p>
      </div> 
      `;
      newsResultsContainer.appendChild(newsElement);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  const resultsUrl = `/search?q=${city}`;
  const homeUrl = `/top-headlines?category=general`;
  if (city) {

    const newsFetcher = new NewsFetcher(resultsUrl, city);
    newsFetcher
      .fetchNews()
      .then((newsData) => {
        NewsFetcher.displayNews(newsData);
      })
      .catch(() => {
        displayErrorMessage();
      });
  } else {
    const newsFetcher = new NewsFetcher(homeUrl);
    newsFetcher
      .fetchNews()
      .then((newsData) => {
        NewsFetcher.displayNews(newsData);
      })
      .catch(() => {
        displayErrorMessage();
      });

  }
});

function displayErrorMessage() {
  document.getElementById("error-message").style.display = "block";
}

