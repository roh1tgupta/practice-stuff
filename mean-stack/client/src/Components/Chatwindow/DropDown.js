import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';

const DropDown = ({onClick, text}) => {
  const reftodropdown = useRef(null);
  
  useEffect(() => {
    const elem = document.getElementsByClassName('tooltipped');
    M.Dropdown.init(elem[0]);
  }, [])

  return (
    <>
  <a class='dropdown-trigger' href='#' data-target='dropdown1'>{text}</a>

  <ul id='dropdown1' class='dropdown-content'>
    <li><a href="#!">one</a></li>
    <li><a href="#!">two</a></li>
    <li class="divider" tabindex="-1"></li>
    <li><a href="#!">three</a></li>
    <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
    <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
  </ul>
  </>
  );
}

export default DropDown;