import React, { useState, useEffect } from 'react';
import Posts from '../Ui-Component/Posts';
import { callApiMypost } from '../../api'

const Myposts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!data.length) {
      callApiMypost().then(result => {
        setData(result.mypost)
      })
    }
  }, [])

  return (
    <div className="home">
      <Posts data={data}/>    
    </div>
  );
}

export default Myposts;