import React from 'react';
import $ from 'jquery';
import { getAllItems } from '../API/ApiCalls';
import paginatedComp from '../components/PaginationComp';

import { connect } from 'react-redux';
import axios from 'axios';
import { paginatedInfo } from '../actions/action';

class PaginationWithServer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      currentPage: 1,
      contentPerPage: 3,
      lowerPage: 1,
      upperPage: 4
    }
    this.total = -1;
    this.numberOfPages = -1;
    this.handleClick = this.handleClick.bind(this);
    this.getItems = this.getItems.bind(this);
    this.allItems = null;
    this.handleClickFirst = this.handleClickFirst.bind(this);
    this.handleClickLast = this.handleClickLast.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickFrw = this.handleClickFrw.bind(this); 
    this.handlePrevBound = this.handlePrevBound.bind(this);
    this.handleFrwBound = this.handleFrwBound.bind(this);
    
  }
  
  componentWillMount() {
    
    //alert(this.numberOfPages);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    axios.post(`http://localhost:3000/paginatedItems/3/0`).then(res => {
        console.log(res);
        dispatch(paginatedInfo(res.data));
        this.setState({items: res.data.data,total: res.data.total[0].total}, () => {
          this.numberOfPages = Math.ceil(this.state.total / this.state.contentPerPage);
        })
  });

    $('ul li#1').addClass('active'); //for default selected first item
  }
  
  componentDidUpdate() {
    $("ul li.active").removeClass('active');
    $('ul li#'+this.state.currentPage).addClass('active');
  }

  getItems(pageNumber = 1, contentPerPage = 3, lowerPage = 1, upperPage = 4, currentPage = 1) {
    const { info, dispatch } = this.props;
   // if ( info.data.length >= this.state.total ) {
    if ( pageNumber * contentPerPage <= info.data.length ) {
      this.setState({ 
        items: info.data.slice(contentPerPage * (pageNumber - 1),(pageNumber) * contentPerPage),
        lowerPage,
        upperPage,
        currentPage
      });
    } else {
        axios.post(`http://localhost:3000/paginatedItems/${contentPerPage}/${pageNumber}`).then(res => {
          console.log(res);
          dispatch(paginatedInfo(res.data));
          this.setState({ 
            items: res.data,
            lowerPage,
            upperPage,
            currentPage 
          });
        })
    }

  }

  handleClick(event) {
    let pageNumber = Number(event.target.id);
    if (pageNumber === this.state.currentPage) {
      return;
    }
   // paginatedComp(this.state.contentPerPage, pageNumber);
    this.getItems(pageNumber,this.state.contentPerPage, this.state.lowerPage, this.state.upperPage, pageNumber) 
    
  }

  handlePrevBound() {
    let lowerPage = this.state.lowerPage - 4;
    lowerPage = lowerPage > 1 ? lowerPage : 1;
    let currentPage = this.state.lowerPage - 1;
    this.getItems(currentPage,this.state.contentPerPage, lowerPage, lowerPage + 3, currentPage);
  }

  
  handleFrwBound() {
       let upperPage = this.state.upperPage + 4;
       upperPage = upperPage < this.numberOfPages ? upperPage : this.numberOfPages;
       let currentPage = this.state.upperPage + 1;
       this.getItems(currentPage,this.state.contentPerPage, upperPage - 3, upperPage, currentPage);
     }
   
  handleClickFirst() {
    this.getItems(1,this.state.contentPerPage, 1, 1 + 3, 1);
  }
  
  handleClickLast() {
    this.getItems(this.numberOfPages,this.state.contentPerPage, this.numberOfPages - 3, this.numberOfPages, this.numberOfPages); 
  }

  handleClickPrev() {
    if ( this.state.currentPage === 1) {
      return;
    }
    let pageNumber = this.state.currentPage - 1;
    let lowerPage = this.state.lowerPage;
    lowerPage = pageNumber < lowerPage ? (lowerPage - 1) : lowerPage;
    let upperPage = lowerPage + 3;
    this.getItems(pageNumber,this.state.contentPerPage, lowerPage, upperPage, pageNumber);  
  }

  handleClickFrw() {
    if ( this.state.currentPage === this.numberOfPages) {
      return;
    }
    let pageNumber = this.state.currentPage + 1;
    let upperPage = this.state.upperPage;
    upperPage = pageNumber > upperPage ? (upperPage + 1) : upperPage;
    let lowerPage = upperPage - 3;
    this.getItems(pageNumber,this.state.contentPerPage, lowerPage, upperPage,pageNumber); 
  }

  render() {
  let listStyle = {
    display: 'inline',
    padding : '0 2px' 
  };
  
  if (this.state.items === null)
	return (<div>no items to display</div>);

  let itemsToRender = this.state.items.map( (item,index) => <li key={item+''+index}> {item.name} </li>);
  let lowerPage = this.state.lowerPage;
  let upperPage = this.state.upperPage;
  let indexToRender = [];
  for(let i = lowerPage; i <= upperPage; i++) {
    if (i === lowerPage && i > 1) {
      indexToRender.push(<li key={i-1} style={listStyle} id={i-1} onClick={this.handlePrevBound}> &hellip; </li>);
    }
    indexToRender.push(<li key={i} style={listStyle} id={i} onClick={this.handleClick}>{i}</li>);
    if (i === upperPage && i < this.numberOfPages) {
      indexToRender.push(<li key={i+1} style={listStyle} id={i+1} onClick={this.handleFrwBound}> &hellip; </li>);
    }
  }

  /*let indexToRender = pageindex.map(index => {
    <li key={index} style={listStyle} id={index} onClick={this.handleClick}>{index}</li>
  }) ;
  */
    return (
      <div>
        <ul>
          {itemsToRender}
        </ul>
        <ul>
        <li style={listStyle} onClick={this.handleClickFirst}>First</li>
          <li style={listStyle} onClick={this.handleClickPrev}>{"<<"}</li>
          {indexToRender}
          <li style={listStyle} onClick={this.handleClickFrw}>{">>"}</li>
          <li style={listStyle} onClick={this.handleClickLast}>Last</li>
        </ul>
      </div>
    );
  }

}

function stateInfo(state) {
  return {
    info : state.pagination
  }
}

export default connect(stateInfo)(PaginationWithServer);
