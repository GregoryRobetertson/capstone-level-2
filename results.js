"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  if (city) {
    fetchNews(city);
  }
});

function fetchNews(city) {
  const apiKey = "5caaa963ed1c66ea2e3098fb55b2f36e";
  const newsApiUrl = `https://gnews.io/api/v4/search?q=${city}&apikey=${apiKey}`;

  fetch(newsApiUrl)
    .then((response) => response.json())
    .then((newsData) => {
      displayNews(newsData.articles);
    })
    .catch((error) => {
      displayErrorMessage();
      console.error("Error fetching news:", error);
    });
}

function displayNews(newsData) {
  const newsResultsContainer = document.getElementById("news-results");
  newsResultsContainer.innerHTML = "";

  newsData.forEach((news) => {
    const newsElement = document.createElement("div");
    newsElement.textContent = news.title;
    newsResultsContainer.appendChild(newsElement);
  });
}

function displayErrorMessage() {
  document.getElementById("error-message").style.display = "block";
}
