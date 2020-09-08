import React from 'react';
import $ from 'jquery';
//import paginatedComp from '../components/PaginationComp';
class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.getItems(),
      currentPage: 1,
      contentPerPage: 5,
      lowerPage: 1,
      upperPage: 4
    }
    this.total = -1;
    this.numberOfPages = -1;
    this.handleClick = this.handleClick.bind(this);
    this.getItems = this.getItems.bind(this);
    this.allItems = this.allItems.bind(this);
    this.handleClickFirst = this.handleClickFirst.bind(this);
    this.handleClickLast = this.handleClickLast.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickFrw = this.handleClickFrw.bind(this); 
    this.handlePrevBound = this.handlePrevBound.bind(this);
    this.handleFrwBound = this.handleFrwBound.bind(this);
    
  }
  
  componentWillMount() {
    this.total = this.allItems().length;
    this.numberOfPages = Math.ceil(this.total / this.state.contentPerPage);
    //alert(this.numberOfPages);
  }

  componentDidMount() {
    $('ul li#1').addClass('active'); //for default selected first item
  }
  
  componentDidUpdate() {
    $("ul li.active").removeClass('active');
    $('ul li#'+this.state.currentPage).addClass('active');
  }

  allItems() {
    return ['abc','def','fgh','rohit','john','tom','cruise','jolie','elly','clarke',
    'michel','bhalu','yogi','shubh','rock','dayne','johnson','diesel','rummy',
    'nassir', 'jordan', 'messi', 'ronaldo', 'bolt', 'ussain','federer', 'Amit', 'Anubhav'
    ,'Rahul', 'Shrish', 'Asif', 'Raj', 'Cruise','johnson','diesel','rummy',
    'nassir', 'jordan', 'messi', 'ronaldo', 'bolt' ];
  }
  getItems(pagenumber = 1, contentPerPage = 5) {
    return this.allItems().slice((pagenumber-1)*contentPerPage, 
        (pagenumber)*contentPerPage);
  }

  handleClick(event) {
    let pageNumber = Number(event.target.id);
   // paginatedComp(this.state.contentPerPage, pageNumber);
    this.setState({ 
      currentPage: pageNumber,
      items: this.getItems(pageNumber,this.state.contentPerPage) 
    });
  }

  handlePrevBound() {
    let lowerPage = this.state.lowerPage - 4;
    lowerPage = lowerPage > 1 ? lowerPage : 1;
    let currentPage = this.state.lowerPage - 1;
    this.setState({
      lowerPage: lowerPage,
      upperPage: lowerPage + 3,
      currentPage: currentPage,
      items: this.getItems(currentPage,this.state.contentPerPage)
    })
  }

  
  handleFrwBound() {
       let upperPage = this.state.upperPage + 4;
       upperPage = upperPage < this.numberOfPages ? upperPage : this.numberOfPages;
       let currentPage = this.state.upperPage + 1;
       this.setState({
         lowerPage: upperPage - 3,
         upperPage: upperPage,
         currentPage: currentPage,
         items: this.getItems(currentPage,this.state.contentPerPage)
       })
     }
   
  handleClickFirst() {
    this.setState({ 
      currentPage: 1,
      lowerPage: 1,
      upperPage: 1 + 3,
      items: this.getItems(1,this.state.contentPerPage) 
    });
  }
  
  handleClickLast() {
    let pageNumber = Math.ceil(this.total/this.state.contentPerPage);
    this.setState({ 
      currentPage: pageNumber,
      upperPage: this.numberOfPages,
      lowerPage: this.numberOfPages - 3,
      items: this.getItems(pageNumber,this.state.contentPerPage) 
    });
  }

  handleClickPrev() {
    if ( this.state.currentPage === 1) {
      return;
    }
    let pageNumber = this.state.currentPage - 1;
    let lowerPage = this.state.lowerPage;
    lowerPage = pageNumber < lowerPage ? (lowerPage - 1) : lowerPage;
    let upperPage = lowerPage + 3;
    this.setState({ 
      currentPage: pageNumber,
      lowerPage,
      upperPage,
      items: this.getItems(pageNumber,this.state.contentPerPage) 
    });
  }

  handleClickFrw() {
    if ( this.state.currentPage === this.numberOfPages) {
      return;
    }
    let pageNumber = this.state.currentPage + 1;
    let upperPage = this.state.upperPage;
    upperPage = pageNumber > upperPage ? (upperPage + 1) : upperPage;
    let lowerPage = upperPage - 3;
    this.setState({ 
      currentPage: pageNumber,
      upperPage,
      lowerPage,
      items: this.getItems(pageNumber,this.state.contentPerPage) 
    });
  }

  render() {
  let listStyle = {
    display: 'inline',
    padding : '0 2px' 
  };
  let itemsToRender = this.state.items.map( item => <li key={item}> {item} </li>);
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

export default Pagination;