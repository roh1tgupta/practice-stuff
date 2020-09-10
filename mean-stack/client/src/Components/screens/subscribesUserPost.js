import React, { useState, useEffect, useContext } from 'react';
import { callApiGetFollowingsPost } from '../../api'
import Posts from '../../Components/Ui-Component/Posts';

const SubscribeUserPost = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!data.length) {
      callApiGetFollowingsPost().then(result => {
        setData(result.posts)
      })
    }
    
  }, [])

  return (
    <div className="home">
      <Posts data={data}/>    
    </div>
  )
}

export default SubscribeUserPost;