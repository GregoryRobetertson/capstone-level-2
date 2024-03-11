'use strict';


document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let city = document.getElementById("city-input").value;
    window.location.href = `results.html?city=${encodeURIComponent(city)}`;
  });

