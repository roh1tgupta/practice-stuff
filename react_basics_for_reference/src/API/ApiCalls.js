//import React  from 'react';
import axios from 'axios';

function getPaginatedItems(contentPerPage, pageNumber) {
  return axios.post(`http://localhost:3000/paginatedItems/${contentPerPage}/${pageNumber}`).then(res => {  //for this method...npm install axios --save
  console.log('responser from server',res);
  return res;
  });
}

function getAllItems() {
  return axios.post(`http://localhost:3000/paginatedItems/all`).then(res => {  //for this method...npm install axios --save
  console.log('responser from server',res);
  return res;
  });
}

export { getPaginatedItems, getAllItems };

