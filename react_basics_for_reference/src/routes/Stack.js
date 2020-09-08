import React  from 'react';
import Wrapper from './Wrapper';

function Stack () {
  return <div>
          <Wrapper elem="Home" name="active" children="home" />
          <Wrapper elem="div" name="active" children="div" />
          <Wrapper elem="span" name="active" children="span 1" />
          <Wrapper elem="span" name="active" children="span 2" />
          </div>
}
export default Stack;