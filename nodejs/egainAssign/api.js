const axios = require('axios');

const getHeaders = () => ({
  "accept": "application/json",
  "Accept-Language": "en-US"
});

module.exports.getProductDetail = (productName) => {
  const detailapi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/product/details?productName=${productName}`;
  
  return axios.get(detailapi, {
    headers: getHeaders()
  }).then((resp) => {
    // console.log(resp.status, resp.data);
    return resp.data;
  }).catch((err) => {
    console.log('errr in getproductdetail api');
  });
};

module.exports.getProductPrice = (websiteName, productName) => {
  const priceApi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/product/${websiteName}?productName=${productName}`;

  return axios.get(priceApi, {
    headers: getHeaders()
  }).then(resp => {
    // console.log(resp.status, res.data.price);
    if (resp.status === 200 && resp.data.price) {
      return resp.data.price;
    }
    return "price not available";
  }).catch(err => {
    // console.log('error occurred', err.data);
    console.log(`error in priceapi for ${websiteName} product ${productName}`);
  });
};

module.exports.getOffers = (websiteName) => {
  const offerApi = `https://aspmsnp3w1.execute-api.ap-south-1.amazonaws.com/Stage/ws/offers/${websiteName}`;

  return axios.get(offerApi, {
    headers: getHeaders()
  }).then((resp) => {
    // console.log(resp.status, resp.data.offers);
    if (resp.status === 200 && resp.data.offers) {
      return resp.data.offers;
    }
    return "no offers available";
  }).catch((err) => {
    console.log('error in offer api', websiteName);
  });
}