const axios = require("axios");
const cheerio = require("cheerio");

async function getProductPrice(productUrl) {
  try {
    // Fetch HTML content of the product page
    axios
      .get(productUrl)
      .then(({ data }) => {
        // Load HTML into Cheerio
        
        const $ = cheerio.load(data);
        console.log($)
        // Extract product title and price (use correct selectors)
        const productName = $('div[data-testid="description-box"] section h1').text().trim(); // Example selector, adjust as needed
        const productPrice = $('div[data-testid="description-box"] section h2')
        .contents()
        .filter(function() {
          return this.type === 'text'; // Only text nodes
        })
        .text()
        .trim(); // Example selector, adjust as needed

        console.log(`Product: ${productName}`);
        console.log(`Price: ${productPrice}`);
      })
      .catch((err) => console.log(err, "...oine 17"));
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Example product URL (replace with actual product URL)
const productUrl =
  "https://www.carrefouruae.com/mafuae/en/tomato/tomato-ep/p/1767482?list_name=previously_viewed_items&offer=offer_carrefour_";
getProductPrice(productUrl);
