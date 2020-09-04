import React from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import lodash from 'lodash';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default class Autocomplete extends React.Component {
  constructor([props]) {
    super(props);
    this.isDebounceTimerOn = false;
    this.state = { value: '', isBeingFetched: false, list: [] };
  }

  handleInput(e) {
    this.setState(value = e.target.value);
    fetchData();
  }

  fetchData() {
    if (!this.isDebounceTimerOn) {
      this.isDebounceTimerOn = true;
      this.setState({isBeingFetched: true});
      
      window.fetch(`${ITEMS_API_URL}?q=${this.state.value}`).then(data => {
       const resp = JSON.parse(resp);    
       this.setState({list: resp, isBeingFetched: false});
      });
      setTimeout(() => {
          this.isDebounceTimerOn = false;
      }, DEBOUNCE_DELAY)
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className={`control${this.state.isBeingFetched ? '' : ' is-loading'}`}>
          <input type="text" className="input" value={this.state.value} onChange={handleInput} />
        </div>
        <div className="list is-hoverable">
          { this.state.list && (
            this.state.list.map(item => (<a className='list-item' onClick={this.props.onSelectItem(item)} >{item}</a>))
            )
          }
        </div>
      </div>
    );
  }
}


function debounce(a,b,c){
  var d,e;
  return function(){
    function h(){
      d=null,c||(e=a.apply(f,g))
    }
    var f=this,g=arguments;
    return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e
  }
}