'use strict';


document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let city = document.getElementById("city-input").value;
    window.location.href = `results.html?city=${encodeURIComponent(city)}`;
  });

  document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function () {
      dropdownContent.classList.toggle("show");
    });

    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (!event.target.matches(".dropbtn")) {
        if (dropdownContent.classList.contains("show")) {
          dropdownContent.classList.remove("show");
        }
      }
    });
  });

