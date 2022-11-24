const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;
const dbpath = path.join(__dirname, "goodreads.db");
const app = express();

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB error : ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `SELECT * FROM book ORDER by book_id`;
  const booksArray = await db.all(getBookQuery);
  response.send(booksArray);
});
