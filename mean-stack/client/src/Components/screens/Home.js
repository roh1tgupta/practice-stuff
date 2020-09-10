import React, { useState, useEffect } from 'react';
import Posts from '../Ui-Component/Posts';
import { callApiFetchAllPost } from '../../api';
import CreatePost from './CreatePost';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      callApiFetchAllPost().then(result => {
        setData(result.posts)
      })
  }, [])

  return (
    <div className="home">
      <CreatePost />
      <Posts data={data}/>    
    </div>
  );
}

export default Home;