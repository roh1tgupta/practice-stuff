import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommentSection = (props) => {
  const { record, item, state, deleteComment, editComment } = props;

  return (
    <>
    <div key={record.id}  style={{display:"flex", marginTop:"8px"}}>
      <div  style={{flex:"1", width:"10%"}}>
        <img style={{width:"24px", height:"24px", borderRadius:"12px"}}
          src={record.postedBy.pic}
        />
      </div>
      <div  style={{flex:"14", wordWrap:"break-word", width:"80%", position:"relative", left:"4px"}}>
        <span style={{fontWeight: 500, marginRight:"4px"}}>
          <Link to={record.postedBy._id === state._id ? '/profile': `/profile/${record.postedBy._id}`}>
            {record.postedBy.name}
          </Link>
        </span>
          {record.text}
      </div>
      <div  style={{flex:"1", position:"relative", left:"10px"}}>
        {/* { record.postedBy._id === state._id &&
           <i className="material-icons"
           style={{}}
           onClick={() => editComment(item._id, record._id)}>edit</i>
        } */}
        {(record.postedBy._id === state._id || item.postedBy._id === state._id) &&
          <i className="material-icons"
            style={{}}
            onClick={() => deleteComment(item._id, record._id)}>delete</i>
        }
      </div>
    </div>
    {/* <h6 key={record.id} style={{wordWrap:"break-word"}} className="comment-section">
      <img style={{height: "1rem", width:"1rem"}}
        src={record.postedBy.pic}
                        />
                        <span style={{fontWeight: 500}}>
                          {record.postedBy.name}
                        </span>
                        {record.text}

                        {(record.postedBy._id === state._id || item.postedBy._id === state._id) &&
                          <i className="material-icons"
                            style={{float:"right"}}
                            onClick={() => deleteComment(item._id, record._id)}>delete</i>
                        }  
                      </h6> */}
                      </>
  );
}

CommentSection.propTypes = {
  record: PropTypes.object,
  item: PropTypes.object,
  state: PropTypes.object,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func
};

CommentSection.defaultProps = {
  record: null,
  item: null,
  state: null,
  deleteComment: () => {},
  editComment: () => {}
};

export default CommentSection;