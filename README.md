**DISCLAIMER:** The code that appears in this repository was done for a school activity. This application was not intended to be used in real world applications, so expect some forms of incompleteness such as a lack of error control. Instead, it shows the fundamental Javascript knowledge the developer has learned in their class.
## How to start
run 
```
node app.js
```
### Available URLs
- http://127.0.0.1:3000
- http://127.0.0.1:3000/dictionary/:query
- http://127.0.0.1:3000/quotes/:query
- http://127.0.0.1:3000/books/:query

For dictionary and books, the ':query' route extension is expected to be any ASCII character/s.
For quotes, the ':query' route extension is expected to be any integer from 1-10.
All routes, aside from the index, returns a raw JSON response. However, it was turned into a string to make it available for viewing on the web.
