import React  from 'react';
import Home from './Home';
/*
class Wrapper  extends React.Component {
  render() {
  	const CustomTag = (`${this.props.elem}` !== 'undefined')?`${this.props.elem}`: "div";
    const classIs = `os-${this.props.name}-wrapper`;
    return <CustomTag className={classIs}>{this.props.children}</CustomTag>
  }
}
*/
/*
const Wrapper = ({ elem = 'div', name, children }) => {
  const statement = `<${elem} className='oc-${name}-wrapper'>${children}</${elem}>`;
    return <div dangerouslySetInnerHTML={{ __html: statement  }} />;
};
*/

function Main(props) {
  return <div className={props.name}>{props.children} rohit</div>
}

function Wrapper (props) {
  let abc = `${props.elem}`;
  let statement;
  switch (abc) {
    case 'span':
      statement = <span className={props.name}>{props.children}</span>
      break;
    case 'Main':
      statement = <Main className={props.name}>{props.children}</Main>
      break;
    case 'Home':
      statement = <Home className={props.name}>{props.children}</Home>
      break;  
    default :
      statement = <div className={props.name}>{props.children}</div>

  }
  //const statement = <div className={props.name}>{props.children}</div> ;
  return  statement;
}

/*
const Wrapper = ({ elem = 'div', name, children }) => {
  let tagname = elem;
  let statement;
  switch (tagname) {
    case 'span':
      statement = <span className={name}>{children}</span>
      break;
    case 'Main':
      statement = <Main className={name}>{children}</Main>
      break;
    default :
      statement = <div className={name}>{children}</div>

  }
  //const statement = `<${elem} className='oc-${name}-wrapper'>{children}</${elem}>`;
  return statement;
};
*/
export default Wrapper;