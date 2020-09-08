import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { paginatedInfo } from '../actions/action';

function paginatedComp(props, contentPerPage, pageNumber) {
  const { info, dispatch } = props;
  if ( info.data.length >= (pageNumber+1) * contentPerPage ) {
    return { data: info.data.slice(contentPerPage * pageNumber + 1,(pageNumber + 1) * contentPerPage + 1), total: info.total };
  } else {
      axios.post(`http://localhost:3000/paginatedItems/${contentPerPage}/${pageNumber}`).then(res => {
        console.log(res);
        dispatch(paginatedInfo(res.data));
        if(!res.data.total) 
          return res.data;
        return { data: res.data.data, total: res.data.total};

      })
  }
}


function stateInfo(state) {
  return {
    info : state.pagination
  }
}

export default connect(stateInfo)(paginatedComp);