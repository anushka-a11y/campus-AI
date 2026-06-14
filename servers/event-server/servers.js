const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const events = require("../../data/events.json");

app.get("/events", (req, res) => {
  res.json(events);
});

app.listen(3002, () => {
  console.log(
    "Events MCP Server running on port 3002"
  );
});