import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import './SinglePost.css';
import { reducer } from '../../reducers/useReducer';
import VideoComponent from './VideoComponent';


const SinglePost = (props) => {
  const {state } = useContext(UserContext);
  const [comment, updateComment] = useState('');
  const [ref, setRef] = useState();
  const { item, deletePost, setPostInfo, likePost,
    unlikePost, deleteComment, makeComment, isPostByUser, editComment } = props;

  const isLikedPost = item.likes.includes(state && state._id);

  const handlePlay = (id) => {
    if (ref && ref.id === id) {
       ref.play();
    } else {
      
      setRef(document.getElementById(`${id}`));
      document.getElementById(`${id}`).play();
    }
  };

  const handlePause = (id) => {
      document.getElementById(`${id}`).requestPictureInPicture();
  }
  return(
    <div className="card home-card" key={item.postedBy._id}>
                <div style={{padding: "5px 16px"}}>
                  <Link to={isPostByUser ? '/profile': `/profile/${item.postedBy._id}`}>
                    <img
                      style={{height: "24px",
                        width:"24px",
                        borderRadius:"12px",
                        position:"relative",
                        top:"3px"
                      }}
                      src={item.postedBy.pic}
                      alt="img"
                    />
                    <span
                      style={{paddingLeft:"4px",
                        fontFamily: "cursive",
                        fontSize:"24px"}}
                    >
                        {item.postedBy.name}
                    </span>
                  </Link>
                  {isPostByUser && (
                    <>
                      <i className="material-icons"
                        style={{float:"right", position:"relative", left:"5px"}}
                        onClick={() => deletePost(item._id)}>delete</i>
                    </>
                  )
                    
                  }
                  
                </div>
                <div className="card-image">
                  { item.photo.includes('video') ?
                    <VideoComponent item={item} handlePlay={props.handlePlay}
                      lastActiveVideo={props.lastActiveVideo} />
                    : <img src={item.photo} alt="img" />

                  }
                  
                </div>
                <div className="card-content" style={{paddingLeft:"16px", paddingRight:"16px"}}>
                  <i
                    className={`material-icons`}
                    onClick={() => !isLikedPost ? likePost(item._id) : unlikePost(item._id)}
                    style={{color:`${isLikedPost ? 'red' : 'black'}`}}>
                      
                      {isLikedPost ? 'favorite' : 'favorite_border'}
                      </i>
                  
                  <div>{item.likes.length} likes</div>
                  { (item.title || item.body) &&
                    <div style={{}}>
                      <span style={{fontWeight:"500", marginRight:"4px"}}>
                        {item.title}
                      </span>
                      <span>{item.body}
                      </span>
                    </div>
                  }
                  {
                    item.comments.length > 0 &&
                    item.comments.map(record =>{
                      return(
                        <CommentSection key={record._id} item={item} record={record} state={state}
                        deleteComment={(itemid, recordid) => deleteComment(itemid, recordid)}
                        editComment={(itemid, recordid) => editComment(itemid, recordid)}
                        />
                      )
                    })
                  }
                  <form onSubmit={e => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                    e.target[0].value='';
                  }}>
                    <input
                      type="text"
                      // value={comment}
                      placeholder="add comment"
                      // onChange={(e)=>updateComment(e.target.value)}
                      ></input>
                  </form>
                  
                </div>
              </div>
  );
}

SinglePost.propTypes = {
  item: PropTypes.object,
  deletePost: PropTypes.func,
  setPostInfo: PropTypes.func,
  likePost: PropTypes.func,
  unlikePost: PropTypes.func,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
  makeComment: PropTypes.func,
  isPostByUser: PropTypes.bool
};

SinglePost.defaultProps = {
  item: {},
  deletePost: () => {},
  setPostInfo: () => {},
  likePost: () => {},
  unlikePost: () => {},
  deleteComment: () => {},
  editComment: () => {},
  makeComment: () => {},
  isPostByUser: () => {}
};

export default SinglePost;