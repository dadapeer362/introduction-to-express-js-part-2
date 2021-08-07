const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

let dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3002, () => {
      console.log("Server starts at http://localhost:3002/");
    });
  } catch (e) {
    console.log(`DB: error ${e.message}`);
    process.exit(1);
  }
};

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
        SELECT 
            *
        FROM 
            book 
        ORDER BY 
            book_id;
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

initializeDBAndServer();
