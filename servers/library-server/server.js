const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const books = require("../../data/library.json");

app.get("/books", (req, res) => {
  res.json(books);
});

app.listen(3001, () => {
  console.log(
    "Library MCP Server running on port 3001"
  );
});