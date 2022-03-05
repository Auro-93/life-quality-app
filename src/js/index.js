import "../styles/main.css";
import renderSearchUI from "./searchUI.js";
import fetchAPI from "./fetchAPI.js";

window.addEventListener("DOMContentLoaded", () => {
  //RENDER START UI WITH THE APP DESCRIPTION AND THE SEARCH INPUT
  renderSearchUI();

  const form = document.forms.searchCity;

  // WHEN FORM IS SUBMITTED MAKE A HTTP GET REQUEST TO TELEPORT API
  form.addEventListener("submit", fetchAPI);
});
