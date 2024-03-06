"use strict";

class NewsFetcher {
  constructor(city) {
    this.city = city;
    this.apiKey = "5caaa963ed1c66ea2e3098fb55b2f36e";
    this.newsApiUrl = `https://gnews.io/api/v4/search?q=${this.city}&apikey=${this.apiKey}`;
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

    newsData.forEach((news) => {
      const newsElement = document.createElement("div");
      newsElement.textContent = news.title;
      newsResultsContainer.appendChild(newsElement);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  if (city) {
    const newsFetcher = new NewsFetcher(city);
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

