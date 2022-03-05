import { get } from "lodash";
import "animate.css";
import { calcBarPercentage, formatCityName } from "./utilities.js";

const renderCityInfoUI = (data, query) => {
  const searchResultContainer = document.querySelector(
    ".search-result-container"
  );

  //IF RESULT DATA IS A STRING (ERROR MESSAGE) DISPLAY ERROR IN A PARAGRAPH
  if (typeof data === "string") {
    const errorMessage = `<p class = "error-message animate__animated animate__fadeIn">${data}</p>`;
    searchResultContainer.innerHTML = errorMessage;
    return;
  }

  // GET CITY TOTAL SCORE: IF DOESN'T EXIST RETURN "N/A"
  let totalScoreValue = get(data, "teleport_city_score", "Score: N/A");
  // IF CITY TOTAL SCORE EXISTS, CONVERT NUMBER TO 2 DECIMAL PLACES
  totalScoreValue =
    typeof totalScoreValue === "number" ? totalScoreValue.toFixed(2) : null;

  // GET CITY SUMMARY: IF DOESN'T EXIST RETURN "Summary: N/A"
  let summary = get(data, "summary", "Summary: N/A");

  // CREATE UI FOR THE SUCCESS SEARCH RESULT
  const successMessage = `
    <div class = "success-message animate__animated animate__fadeInDownBig">
      <div class = "city-global-info">
        <div class = "name-and-total-score">
          <h2 class = "city-name"> ${formatCityName(query)} 
            </h2>
          <div class = "total-score">${totalScoreValue}</div>
        </div>
        <div class = "city-summary">${summary}</div>
      </div>
      <div class = "city-cat-grid">
        ${renderCategoryStat(data)}
      </div>
      <a class = "more-info" href = "https://teleport.org/cities/${query}/" target = "_blank">MORE INFO</a>
    </div>
  `;

  //APPEND HTML CONTENT TO THE SEARCH RESULT CONTAINER DIV
  searchResultContainer.innerHTML = successMessage;
};

// CREATE CITY CATEGORIES STATS UI
const renderCategoryStat = (data) => {
  let html = "";
  let categories = get(data, "categories");
  // IF CATEGORIES LIST EXISTS, CREATE CATEGORIES ELEMENTS
  if (categories) {
    categories.map((cat, i) => {
      let isCat = get(cat, "name");
      //IF SPECIFIC CATEGORY EXISTS CREATE ITS CATEGORY ELEMENT
      if (isCat) {
        // IF CATEGORY COLOR DOESN'T EXIST RETURN A DEFAULT GREY COLOR
        let isColor = get(cat, "color", "#d4d4d4");
        // IF CATEGORY SCORE DOESN'T EXIST RETURN "N/A"
        let isScore = get(cat, "score_out_of_10", "N/A");
        // IF CATEGORY SCORE EXISTS CONVERT NUMBER TO 2 DECIMAL PLACES
        isScore = typeof isScore === "number" ? isScore.toFixed(2) : isScore;

        html += `
            <div class = "stats-card">
                <div class = "stats-type">
                    <div class = "circle" style = "background-color: ${isColor}">${isScore}</div>
                    <h2>${isCat}</h2>
                </div>
                
                <div class = "full-stats-bar" style = "background-color: #d4d4d4">
                    <div class = "percent-stats-bar" 
                    style = "background-color: ${isColor}; width: ${calcBarPercentage(
          isScore
        )}"
                    >    
                    </div>
                </div>
            </div>
          `;
      }
    });
  } else {
    //IF CATEGORIES LIST DOESN'T EXIST RETURN THIS PARAGRAPH:
    html += "<p>No categories for this city</p>";
  }
  return html;
};

export default renderCityInfoUI;
