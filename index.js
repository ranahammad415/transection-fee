const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.set("port", process.env.PORT || 5000);

const browserP = puppeteer.launch({headless: true});

app.get("/", (req, res) => {
 
});

app.listen(app.get("port"), () => 
  console.log("app running on port", app.get("port"))
);