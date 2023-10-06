const puppeteer = require('puppeteer')
async function checkPriceAmazon(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const className = '.a-price-whole'


    const currentPriceString = await page.evaluate((className) => {
        const element = document.querySelector(className);
        return element ? element.innerText : null;
    }, className);

    const currentPriceNumber = parseFloat(currentPriceString.replace(',', ''))

    await browser.close();

    return currentPriceNumber;

}


const express = require('express')
const app = express();
const port = 2000;

https://www.amazon.in/CableCreation-Multiport-Adapter-Gigabit-Ethernet/dp/B08FWMWGTD/





app.get('/', (req, res) => {
    const currentPrice = checkPriceAmazon('https://www.amazon.in/CableCreation-Multiport-Adapter-Gigabit-Ethernet/dp/B08FWMWGTD/')
    const answer = `Current Price : ${currentPrice}`
    res.send(answer)
  })


app.listen(port)  