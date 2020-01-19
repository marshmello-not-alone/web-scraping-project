const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
  const browser = await puppeteer.launch() //wait for puppeteer to launch the browser
  const page = await browser.newPage() // give us blank page
  await page.goto(url)
  //xpath way to navvigate the page, similar to jquery
  //pulling out 1st element of array int el, destructuring
  const [el] = await page.$x('//*[@id="imgBlkFront"]')
  const img = await el.getProperty('src')
  //pull out string
  const imgTxt = await img.jsonValue()
  //scraping title
  const [el2] = await page.$x('//*[@id="productTitle"]')
  const txt = await el2.getProperty('textContent')
  const rawRxr = await txt.jsonValue()
  //scraping price
  const [el3] = await page.$x('/html/body/div[2]/div[1]/div[4]/div[3]/div[3]/div/form/div[1]/div/div/div/div[1]/div/div/span/span')
  const price = await el3.getProperty('textContent')
  const rawPrice = await price.jsonValue()

  console.log({imgTxt, rawRxr, rawPrice})
}




scrapeProduct('https://www.amazon.ca/Habits-Highly-Effective-People-Powerful/dp/1451639619/ref=sr_1_1?crid=2HGHVLLOQ3HWD&keywords=7+habits+of+highly+effective+people&qid=1579408960&sprefix=7+habit%2Caps%2C183&sr=8-1')