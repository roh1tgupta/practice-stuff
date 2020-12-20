const { getProductDetail, getProductPrice, getOffers } = require('./api');

const websites = ['amazon', 'flipkar', 'snapdeal'];

module.exports.getCompleteProductInfo = (productName) => {
  let productInfo;
  let availability = {};

  const apisArr = [getProductDetail(productName).then(res => { productInfo = res; })];

  // for each website pushing price and offer call in the array
  websites.forEach(website => {
    apisArr.push(getProductPrice(website, productName).then(res => {
      availability[`${website}`] = { ...availability[`${website}`], price: res }; }));

    apisArr.push(getOffers(website).then(resp => {
      availability[`${website}`] = { ...availability[`${website}`], offers: resp}; }));
  });

  return Promise.all(apisArr).then(() => {
    return { productInfo, availability };
  })
};