import axios from "axios";
import { kebabCase } from "lodash";
import renderCityInfoUI from "./cityInfoUI.js";
import { loadingSpinners, scrollToDiv } from "./utilities.js";

const fetchAPI = (e) => {
  e.preventDefault();

  //INITIALIZE VARIABLE FOR THE SEARCH RESULT
  let cityInfo;

  const searchResultContainer = document.querySelector(
    ".search-result-container"
  );

  //TAKE THE SEARCH INPUT VALUE, LOWER CASE AND SLUGIFY IT
  const input = e.target.querySelector("input");
  let inputValue = input.value;
  let cityQuery = kebabCase(inputValue.toLowerCase());

  //IF SEARCH VALUE IS EMPTY RETURN
  if (!cityQuery) return;

  //URL FOR THE AXIOS GET REQUEST
  let url = `https://api.teleport.org/api/urban_areas/slug:${cityQuery}/scores/`;

  //LOAD PAGE UNTIL WE GET THE REQUEST RESULT AND CREATE LOADING SPINNERS ELEMENTS
  let loading = true;
  loadingSpinners(loading, searchResultContainer);

  //AXIOS GET REQUEST

  try {
    const response = axios.get(url);
    if (response) {
      //REQUEST FULFILLED WITH SUCCESS: CLEAN SEARCH INPUT
      input.value = "";

      //SET LOADING TO FALSE AND REMOVE SPINNERS
      loading = false;
      loadingSpinners(loading, searchResultContainer);

      //ASSIGN REQUEST RESPONSE DATA TO THE VARIABLE cityInfo
      cityInfo = response.data;

      //RENDER THE SEARCH RESULT UI
      renderCityInfoUI(cityInfo, cityQuery);
      //SCROLL TO THE TOP OF THE SEARCH RESULT DIV
      scrollToDiv(searchResultContainer);
    }
  } catch (error) {
    //REQUEST FULFILLED WITH ERROR: CLEAN SEARCH INPUT
    input.value = "";

    //SET LOADING TO FALSE AND REMOVE SPINNERS
    loading = false;
    loadingSpinners(loading, searchResultContainer);

    if (error.response.status === 404) {
      // IF CITY CAN'T BE FOUND IN THE TELEPORT DATABASE:
      cityInfo = `No cities with the name of "${inputValue}"`;
    } else {
      //ELSE:
      cityInfo = `Error ${error.response.status}: Something went wrong. Please, try again`;
    }

    //RENDER ERROR MESSAGE UI
    renderCityInfoUI(cityInfo, cityQuery);
  }
};

export default fetchAPI;
