function getLastSearch() {
  const last_search = localStorage.getItem("lastSearch");
  if (!last_search) {
    return "dictionary";
  }
  return last_search;
}

function saveQuery(search_query) {
  localStorage.setItem("lastSearch", search_query);
}

export { getLastSearch, saveQuery };
