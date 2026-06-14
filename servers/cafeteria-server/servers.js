const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const menu =require("../../data/cafeteria.json");

app.get("/menu", (req, res) => {
  res.json(menu);
});

app.listen(3003, () => {
  console.log(
    "Cafeteria MCP Server running on port 3003"
  );
});