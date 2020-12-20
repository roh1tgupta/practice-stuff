const axios = require('axios');

const getHeaders = () => ({
  "accept": "application/json",
  "Accept-Language": "en-US"
});

/** product detail call
 * @param productName: string 'name_of_product'
 * */
module.exports.getProductDetail = (productName) => {
  const detailapi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/product/details?productName=${productName}`;
  
  return axios.get(detailapi, {
    headers: getHeaders()
  }).then((resp) => {
    return resp.data;
  }).catch(() => {
    console.log('errr in getproductdetail api');
  });
};

/** product price call
 * @param websiteName: string 'name_of_website_from which_price_needs_to_be_fetched'
 * @param productName: string 'name_of_product'
 * */
module.exports.getProductPrice = (websiteName, productName) => {
  const priceApi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/product/${websiteName}?productName=${productName}`;

  return axios.get(priceApi, {
    headers: getHeaders()
  }).then(resp => {
    if (resp.status === 200 && resp.data.price) {
      return resp.data.price;
    }
    return "price not available";
  }).catch(() => {
    console.log(`error in priceapi for ${websiteName} product ${productName}`);
  });
};

/** offers call
 * @param websiteName: string 'name_of_website_from which_offers_needs_to_be_fetched'
 * */
module.exports.getOffers = (websiteName) => {
  const offerApi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/offers/${websiteName}`;

  return axios.get(offerApi, {
    headers: getHeaders()
  }).then((resp) => {
    if (resp.status === 200 && resp.data.offers) {
      return resp.data.offers;
    }
    return "no offers available";
  }).catch((err) => {
    console.log('error in offer api', websiteName);
  });
}
