const express = require("express");


const app = express();
app.set("port", process.env.PORT || 8080);

const browserP = puppeteer.launch({headless: true});

app.get("/", (req, res) => {
  res.send("hellow world!");
});

app.listen(app.get("port"), () => 
  console.log("app running on port", app.get("port"))
);