const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/dictionary/:query", (req, res) => {
  const DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  search_query = DICTIONARY_URL + req.params.query;
  console.log(search_query);

  fetch(search_query)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/quotes/:query", (req, res) => {
  const QUOTE_URL = "https://dummyjson.com/quotes/random/";
  quote_query = QUOTE_URL + req.params.query;
  console.log(quote_query);

  fetch(quote_query)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/books/:query", (req, res) => {
  const BOOK_URL = "https://gutendex.com/books/";
  book_query = BOOK_URL + "?search=" + req.params.query;
  console.log(book_query);

  fetch(book_query)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}: http://127.0.0.1:3000`);
});
