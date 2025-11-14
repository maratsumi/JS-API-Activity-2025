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
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}: http://127.0.0.1:3000`);
});
