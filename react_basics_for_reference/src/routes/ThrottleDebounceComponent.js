import React, { useState } from 'react';

const debounce = (func, time) => {
  let t;
  return (param) => {
    console.log('clicked');
    if (t) {clearTimeout(t);}
    t = setTimeout(() => func(param), time); 
  }
};

const throttle = (func, time) => {
  const getTime = () => new Date().getTime();
  let lastCalledtime;
  let t;
  let param;
  return (e) => {
    param = e.target.value;
    if(!lastCalledtime) {
      lastCalledtime = getTime();
      func(param);
    } else {
      if (t) {clearTimeout(t)};
      const timeDiff = getTime() - lastCalledtime;
      if (timeDiff >= time ) {
        lastCalledtime = getTime();
        func(param);
      } else {
        t = setTimeout(() => {
          lastCalledtime = getTime();
          func(param);
        }, time-timeDiff);
      }
    }
  };
};

export default function ThrottleDebounce() {
  const [name, setName] = useState('');
  const clickHandler = () => {
    fetch('https://a51fb412-b438-4bfa-b62e-d63b9b0836c1.mock.pstmn.io/').then(resp => {
      if (resp.name) {
        setName(resp.name);
      }
    });
  };

  const changeHandler = (value) => {
    console.log('hitapi with patam', value, 'time', new Date().getTime());
    fetch('https://a51fb412-b438-4bfa-b62e-d63b9b0836c1.mock.pstmn.io/');
  };

  const DebounceClickHandler = debounce(clickHandler, 2000);
  const ThrottleChangeHandler = throttle(changeHandler, 1000);
  return (
    <div>
      hello world!
      <button onClick={DebounceClickHandler}>click me</button>
      <input type="text" onChange={e => ThrottleChangeHandler(e)} />
      { name && (
        <li>name: {name}</li>
      )}
    </div>
  )
} 