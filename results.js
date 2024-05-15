class NewsFetcher {
  constructor(pageUrl, city = 'no city', lang = 'en') {
    this.city = city;
    this.lang = lang;
    this.apiKey = "f99a5be2836b4f2556a9210782282c81";
    if (this.city === 'no city') {
      this.newsApiUrl = `https://gnews.io/api/v4${pageUrl}&lang=${this.lang}&apikey=${this.apiKey}`;
    } else {
      // Encode city name to handle special characters
      this.newsApiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(this.city)}&lang=${this.lang}&apikey=${this.apiKey}`;
    }
  }

  fetchNews() {
    return fetch(this.newsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news. Status: ' + response.status);
        }
        return response.json();
      })
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
      // Sanitize HTML content
      newsElement.innerHTML = `
        <div class="card">
          <h2>${sanitizeHTML(news.title)}</h2>
          <p>${sanitizeHTML(news.description)}</p>
          <div><img src="${sanitizeHTML(news.image)}" alt="${sanitizeHTML(news.title)}" /></div>
          <p>Check it out <a href="${sanitizeHTML(news.url)}">here</a></p>
        </div> 
      `;
      newsResultsContainer.appendChild(newsElement);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");
  const homeUrl = `/top-headlines?category=general`;

  if (city) {
    const newsFetcher = new NewsFetcher(`/search?q=${city}`, city);
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

// Function to sanitize HTML content
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

