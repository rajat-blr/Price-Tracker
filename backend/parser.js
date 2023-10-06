const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')

const app = express();
const port = 3000;

app.use(cors());

app.get('/check-price', async (req, res) => {
  let browser; // Declare browser outside the try-catch block

  try {
    const Url = req.query.url;
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(Url);

    const className = '.a-price-whole';
    const currentPriceString = await page.evaluate((className) => {
      const element = document.querySelector(className);
      return element ? element.innerText : null;
    }, className);

    if (currentPriceString) {
      const currentPriceNumber = parseFloat(currentPriceString.replace(',', ''));
      res.json({ price: currentPriceNumber });
    } else {
      res.status(404).json({ error: 'Price element not found on the page.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  
  