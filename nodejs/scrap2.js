const puppeteer = require("puppeteer");

async function getProductPriceWithPuppeteer(productUrl) {
  const browser = await puppeteer.launch({ headless: true }); // Set to false to see browser action
  const page = await browser.newPage();

  // Go to the product URL
  await page.goto(productUrl, { waitUntil: "domcontentloaded" });

  // Extract product details using page.evaluate
  const productDetails = await page.evaluate(() => {
    const productName = document.querySelector('div[data-testid="description-box"] section h1')
      ? document.querySelector('div[data-testid="description-box"] section h1').innerText
      : null;
    const productPrice = document.querySelector('div[data-testid="description-box"] section h2')
      ? document.querySelector('div[data-testid="description-box"] section h2').innerText
      : null;

    return {
      name: productName,
      price: productPrice,
    };
  });

  console.log("Product:", productDetails.name);
  console.log("Price:", productDetails.price);

  await browser.close();
}

// Example product URL (replace with actual product URL)
const productUrl =
  "https://www.carrefouruae.com/mafuae/en/tomato/tomato-ep/p/1767482?list_name=previously_viewed_items&offer=offer_carrefour_";

getProductPriceWithPuppeteer(productUrl);
