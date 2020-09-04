'use strict';

/* global $, jQuery */



const url = 'https://www.example.com/comments';

async function fetchData(count = 1) {
  const response = await Window.fetch(`${url}?count=${count}`);
  if (response.ok) {
    return await response.json();
  } else {
    return 'error';
  } 
};

function solution() {
  var x = document.getElementsByClassName('comment-list');
  for(let i = 0 ; i < x.length; i += 1) {
    x[i].innerHTML = 'Loading...';
    fetchData(x[i].getAttribute('data-count')).then(resp => {
      if (resp === 'error') {
        throw new Error();
      }
      const data = JSON.parse(resp);
      if (data && data.length) {
        const parentNode = document.createElement('div');
        const att = document.createAttribute('class');
        att.value = 'comment-item';
        parentNode.setAttributeNode(att);
        data.length.forEach((data) => {
          const childNode1 = document.createElement('div');
          const childAtt1 = document.createAttribute('class');
          childAtt1.value = 'comment-item__username';
          childNode1.setAttributeNode(childAtt1);
          childNode1.createTextNode(data.username);

          const childNode2 = document.createElement('div');
          const childAtt2 = document.createAttribute('class');
          childAtt2.value = 'comment-item__message';
          childNode2.setAttributeNode(childAtt2);
          childNode2.createTextNode(data.message);

          parentNode.appendChild(childNode1);
          parentNode.appendChild(childNode2);
          x[i].innerHTML  = '';
          x[i].appendChild(parentNode);
        });
      }
    }).catch(() => {
      // handling error
    });
  };
}

