import { startCase } from "lodash";

// CALC WIDTH OF BARS BASED ON STATS VALUE OF CITY CATEGORIES
export const calcBarPercentage = (value) => {
  let result = value * 10;
  let percentage = `${result}%`;
  return percentage;
};

// UPPER-CASE ALL WORDS OF THE CITY NAME STRING AND REPLACE DASHES WITH WHITE SPACES
export const formatCityName = (name) => {
  let city = startCase(name).replace(/-/g, " ");
  return city;
};

//CREATE SPINNERS WHEN FETCH RESULT IS LOADING
export const loadingSpinners = (loading, container) => {
  let html = "";

  if (loading) {
    html += `
        <div class = "spinners-container">
          <div class = "spinner"></div>
          <div class = "spinner"></div>
          <div class = "spinner"></div>
        </div>
      `;
  }
  container.innerHTML = html;
};

//SCROLL TO THE TOP OF SEARCH RESULT DIV WHEN REQUEST IS SUCCESSFULLY FULFILLED
export const scrollToDiv = (div) => {
  let distanceToTop = div.getBoundingClientRect().top;
  window.scrollTo({ top: distanceToTop - 10, behavior: "smooth" });
};
