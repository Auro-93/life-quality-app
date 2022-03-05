import greenCity from "../assets/images/best-place.png";
import searchIcon from "../assets/images/search.png";

const renderSearchUI = () => {
  //CREATE THE APP CONTAINER
  const appContainer = document.querySelector(".app-container");
  //CREATE THE APP TITLE
  const appTitle = document.createElement("h1");
  //CREATE THE APP DESCRIPTION
  const appInstructions = document.createElement("p");
  //CREATE THE APP IMAGE
  const cityImg = new Image();
  //CREATE FORM
  const form = document.createElement("form");
  //CREATE FORM SEARCH INPUT
  const input = document.createElement("input");
  //CREATE SUBMIT BUTTON
  const button = document.createElement("button");
  //CREATE SUBMIT BUTTON SEARCH ICON
  const searchImg = new Image();
  // CREATE CONTAINER FOR THE SEARCH RESULT
  const searchResultContainer = document.createElement("div");

  appTitle.textContent = "BEST PLACE TO LIVE";
  appInstructions.textContent = `Search a city to analyze its quality life info. 
  The overall city quality of life score is calculated on a scale of 1 to 100.
  The individual scores of the various categories are calculated on a scale of 1 to 10.`;
  appTitle.classList.add("app-title");
  appInstructions.classList.add("app-instructions");
  cityImg.src = greenCity;

  form.name = "searchCity";
  form.classList.add("searchCity-form");
  input.type = "search";
  input.placeholder = "City name...";
  button.type = "submit";
  searchImg.src = searchIcon;
  button.append(searchImg);
  form.append(input, button);

  searchResultContainer.classList.add("search-result-container");

  appContainer.append(
    cityImg,
    appTitle,
    appInstructions,
    form,
    searchResultContainer
  );
};

export default renderSearchUI;
