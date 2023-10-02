const express = require("express");
const puppeteer = require("puppeteer");



const app = express();
app.set("port", process.env.PORT || 5000);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', async (req, res) => {
 
   res.send('Working....')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})




// Export the Express API
module.exports = app