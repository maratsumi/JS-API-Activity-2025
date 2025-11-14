import * as audio_module from "./audio_api.js";
import * as anim_module from "./web-anim_api.js";
import * as storage_module from "./storage_api.js";
import * as clipboard_module from "./clipboard_api.js";

// URLS
const DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const BOOK_URL = "https://gutendex.com/books";
const QUOTE_URL = "https://dummyjson.com/quotes/random";

const search_button = document.querySelector("#search-button");
const search_bar = document.querySelector("#search-bar");
let search_query;

// Load last search
let last_search = storage_module.getLastSearch();
addEventListener("DOMContentLoaded", (evt) => {
  if (last_search) {
    searchDictionary(last_search);
  }
});

search_bar.addEventListener("change", (evt) => {
  search_query = evt.currentTarget.value;
});

search_button.addEventListener("click", (evt) => {
  searchDictionary(search_query);
  quoteGenerator();

  // Web Storage API; Save last search
  storage_module.saveQuery(search_query);

  // Web Audio API; Audio player
  audio_module.playBGM();

  // Web Animation API; Play simple animation
  anim_module.playAnimation();

  // Generate a quote
});

function searchDictionary(query) {
  let search_url = DICTIONARY_URL + query;
  fetch(search_url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const result_container = document.querySelector("#result");
      result_container.innerHTML = "";

      for (const result of response) {
        const word_header = document.createElement("h1");
        word_header.textContent = result.word;
        result_container.appendChild(word_header);

        for (const phonetics of result.phonetics) {
          const phonetic_header = document.createElement("h2");
          const phonetic_audio = document.createElement("audio");
          phonetic_header.textContent = phonetics.text;
          phonetic_audio.src = phonetics.audio;
          phonetic_audio.controls = true;
          phonetic_audio.style.marginLeft = "1.5rem";
          phonetic_header.style.display = "flex";
          phonetic_header.style.alignItems = "center";
          phonetic_header.style.justifyContent = "flex-start";
          result_container.appendChild(phonetic_header);
          phonetic_header.appendChild(phonetic_audio);
        }

        for (const meanings of result.meanings) {
          const meaning_body = document.createElement("p");
          const body_synonyms = document.createElement("p");
          const body_antonyms = document.createElement("p");
          const synonyms_button = document.createElement("button");
          const copy_synonyms_button = document.createElement("button");
          copy_synonyms_button.setAttribute("id", "copy_button");
          const antonyms_button = document.createElement("button");

          meaning_body.innerHTML =
            "Part of speech: " + meanings.partOfSpeech + "<br>";

          synonyms_button.textContent = "Show Synonyms";
          copy_synonyms_button.textContent = "Copy Synonyms";
          antonyms_button.textContent = "Show Antonyms";
          meaning_body.appendChild(synonyms_button);
          meaning_body.appendChild(copy_synonyms_button);
          meaning_body.appendChild(antonyms_button);

          meaning_body.appendChild(body_synonyms);
          meaning_body.appendChild(body_antonyms);

          // REF: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
          synonyms_button.addEventListener("click", () => {
            if (meanings.synonyms.length != 0) {
              body_synonyms.textContent = "Synonyms: " + meanings.synonyms;
            } else {
              body_synonyms.textContent = "No synonym available";
            }
            synonyms_button.disabled = true;
          });

          // Clipboard API; Copy synonyms to clipboard
          copy_synonyms_button.addEventListener("click", () => {
            clipboard_module.clipboardCopy(meanings);
          });

          antonyms_button.addEventListener("click", () => {
            if (meanings.antonyms.length != 0) {
              body_antonyms.textContent = "Antonyms: " + meanings.antonyms;
            } else {
              body_antonyms.textContent = "No antonym available";
            }
            antonyms_button.disabled = true;
          });

          const def_header = document.createElement("h3");
          def_header.textContent = "Definitions";
          meaning_body.appendChild(def_header);

          const def_list = document.createElement("ol");
          for (const defs of meanings.definitions) {
            def_list.innerHTML += "<li>" + defs.definition + "</li>";
          }
          meaning_body.appendChild(def_list);
          result_container.appendChild(meaning_body);
        }
        const divider = document.createElement("hr");
        divider.classList.add("solid");
        result_container.appendChild(divider);
      }
      const source_text = document.createElement("h3");
      source_text.innerHTML =
        "Source: " +
        "<a href=" +
        response[0].sourceUrls +
        ">" +
        response[0].sourceUrls +
        "</a>";
      result_container.appendChild(source_text);
      searchBooks(query);
    })
    .catch((err) => {
      console.error(err);
      const result_container = document.querySelector("#result");
      const word_header = document.createElement("h1");
      word_header.textContent = "Word does not exist";
      result_container.appendChild(word_header);
    });
}

function searchBooks(query) {
  let search_url = BOOK_URL + "?search=" + query;
  const result_container = document.querySelector("#result");
  const books_header = document.createElement("h1");
  books_header.textContent = "Books containing " + query;
  result_container.appendChild(books_header);

  fetch(search_url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      const title_list = document.createElement("ol");
      for (const result of response.results) {
        title_list.innerHTML += "<li>" + result.title + "</li>";
      }
      result_container.appendChild(title_list);
    })
    .catch((err) => {
      console.error(err);
    });
}

function quoteGenerator() {
  const quote_container = document.querySelector("#quote");

  fetch(QUOTE_URL)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      quote_container.innerHTML = "";

      const quote_body = document.createElement("p");
      quote_body.style.fontSize = "24px";
      quote_body.innerHTML = response.quote + "<br /> - " + response.author;
      quote_container.appendChild(quote_body);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default index;
