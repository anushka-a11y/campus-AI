const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const academics = require("../../data/academics.json");

app.get("/academics", (req, res) => {
  res.json(academics);
});

app.listen(3004, () => {
  console.log(
    "Academic MCP Server running on port 3004"
  );
});