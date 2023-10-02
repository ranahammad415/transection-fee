const express = require("express");
const puppeteer = require("puppeteer");



const app = express();
app.set("port", process.env.PORT || 5000);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', async (req, res) => {
 

  try {
    const browser = puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
 
     let page = await browser.newPage();
 
     const url = 'https://finder.kujira.network/kaiyo-1/tx/'+req.query.hash;
     
     await page.goto(url);
 
   
     await page.waitForSelector('#root > div > div.container.explore > div.md-row.pad-tight.wrap > div:nth-child(1) > div > table > tbody > tr:nth-child(6)');
 
     const data = await page.evaluate(() => {
       const data = document.querySelector('#root > div > div.container.explore > div.md-row.pad-tight.wrap > div:nth-child(1) > div > table > tbody > tr:nth-child(6)').innerText.split(":")[1];
 
       // Define a regular expression pattern to match numeric values and units
       const regex = /(\d+)\n([A-Za-z0-9]+)/g;
       
       // Initialize an object to store the data
       const dataArray = {};
       
       // Use a loop to iterate over matches found by the regular expression
       let match;
       while ((match = regex.exec(data)) !== null) {
         const numericValue = match[1];
         const unit = match[2];
       
         // Check if the unit already exists in the object
         if (dataArray[unit]) {
           // If it exists, push the new numeric value to the array
           dataArray[unit].push(numericValue);
         } else {
           // If it doesn't exist, create a new array with the numeric value
           dataArray[unit] = [numericValue];
         }
       }
 
         return dataArray;
      
      
      
       });
 
   await browser.close();
    // result = await page.title();
     res.json({ success: true , data });
   } catch (error) {
     console.log(error);
     res.json({ success: false, error }); 
   } finally {
 
   }


})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})


app.get('/scrape', async (req, res) => {

  try {
   const browser = await puppeteer.launch({ headless:"new"});

    let page = await browser.newPage();

    
    
    await page.goto('https://finder.kujira.network/kaiyo-1/tx/1CD73A7E0802E41F1F879C493BDC261F173216E888116C6CC8735F1DC7AEC470');

  
    await page.waitForSelector('#root > div > div.container.explore > div.md-row.pad-tight.wrap > div:nth-child(1) > div > table > tbody > tr:nth-child(6)');

    const data = await page.evaluate(() => {
      const data = document.querySelector('#root > div > div.container.explore > div.md-row.pad-tight.wrap > div:nth-child(1) > div > table > tbody > tr:nth-child(6)').innerText.split(":")[1];

      // Define a regular expression pattern to match numeric values and units
      const regex = /(\d+)\n([A-Za-z0-9]+)/g;
      
      // Initialize an object to store the data
      const dataArray = {};
      
      // Use a loop to iterate over matches found by the regular expression
      let match;
      while ((match = regex.exec(data)) !== null) {
        const numericValue = match[1];
        const unit = match[2];
      
        // Check if the unit already exists in the object
        if (dataArray[unit]) {
          // If it exists, push the new numeric value to the array
          dataArray[unit].push(numericValue);
        } else {
          // If it doesn't exist, create a new array with the numeric value
          dataArray[unit] = [numericValue];
        }
      }

        return dataArray;
     
     
     
      });

  await browser.close();
   // result = await page.title();
    res.json({ success: true , data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error }); 
  } finally {

  }



});



// Export the Express API
module.exports = app