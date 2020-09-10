import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import SinglePost from './SinglePost';
import { callApiUnlikePost, callApiLikePost,
  callApiMakeComment, callApiDeletePost, callApiUpdatePostPic,
  callApiDeleteComment, callApiUploadPic, callApiEditComment } from '../../api';

import Spinner from './Spinner';
import './Posts.css';

const Posts = (props) => {
  const [data, setData] = useState(props.data);
  const {state } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const [ref, setRef] = useState();
  const [lastActiveVideo, setLastActiveVideo] = useState();

  useEffect(() => {
    setData(props.data)
  }, [props])

  useEffect(() => {
    if (postInfo) {
      callApiUploadPic(postInfo.image)
        .then(data => {
          updatePostPic(data.url)
        }).catch(err => console.log(err))
    }
  },[postInfo])

  const updatePostPic = (url) => {
    callApiUpdatePostPic(postInfo.postId, url)
    .then(result => {
      const newData = data.map(item => item._id === result._id ? result : item)
      setData(newData);
    })
  }

  const likePost = (id) => {
    callApiLikePost(id).then(result => {
      const newData = data.map(item => item._id === result._id ? result : item) 
      setData(newData);
    }).catch(err => console.log(err));
  }


  const unlikePost = (id) => {
    callApiUnlikePost(id).then(result => {
      const newData = data.map(item => item._id === result._id ? result : item);
      setData(newData);
    }).catch(err => console.log(err));
  }

  const makeComment = (text, postId) => {
    callApiMakeComment(text, postId).then(result => {
      const newData = data.map(item => item._id === result._id ? result : item) 
      setData(newData);
    }).catch(err => console.log(err))
  }

  const deletePost = (postId) => {
    callApiDeletePost(postId).then(result => {
      const newData = data.filter(item => item._id !== result._id)
      setData(newData);
    })
  }

  const deleteComment = (postId, commentId) => {
    callApiDeleteComment(postId, commentId).then(result => {
      const newData = data.map(item => item._id === result._id ? result : item)
      setData(newData);
    })
  }

  const editComment = (postId, commentId) => {
    callApiEditComment(postId, commentId).then(result => {
      const newData = data.map(item => item._id === result._id ? result : item)
      setData(newData);
    })
  }

  const handlePlay = (id) => {
    
      if (ref) ref.pause();
      setRef(document.getElementById(`${id}`));
      document.getElementById(`${id}`).play();
  };

  return (
    data.length > 0 && state &&
      data.map(item => {
        return(
          <SinglePost
            key={item._id}
            item={item}
            deletePost={(postId) => deletePost(postId)}
            setPostInfo={(obj) => setPostInfo(obj)}
            likePost={(id) => likePost(id)}
            handlePlay={handlePlay}
            unlikePost={(id) => unlikePost(id)}
            deleteComment={(postId, commentId) => deleteComment(postId, commentId)}
            editComment={(postId, commentId) => editComment(postId, commentId)}
            makeComment={(text, postId) => makeComment(text, postId)}
            isPostByUser={item.postedBy._id === state._id}
            lastActiveVideo={ref}
          />
        )
      })
      // : (
      //   <div className="spinner">
      //     <Spinner />
      //   </div>
      // )
  );
}

export default Posts;