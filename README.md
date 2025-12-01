**DISCLAIMER:** The code that appears in this repository was done for a school activity. This application was not intended to be used in real world applications, so expect some forms of incompleteness such as a lack of error control. Instead, it shows the fundamental Javascript knowledge the developer has learned in their class.
## How to start
run 
```
node app.js
```
### Available URLs
- http://127.0.0.1:3000
- http://127.0.0.1:3000/dictionary/TextHere
- http://127.0.0.1:3000/quotes/10
- http://127.0.0.1:3000/books/TextHere

For dictionary and books, the ':query' route extension is expected to be any ASCII character/s.
- For dictionary, this will return the dictionary definition of the word in the query
- For books, this will return books that contain the word in its title

For quotes, the ':query' route extension is expected to be any integer from 1-10.
- For quotes, this will return a number of quotes based on the query

All routes, aside from the index, returns a raw JSON response. However, it was turned into a string to make it available for viewing on the web.
