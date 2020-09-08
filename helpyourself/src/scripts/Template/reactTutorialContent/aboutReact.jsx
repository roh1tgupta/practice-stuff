import React from 'react';

export default function AboutReact() {
  return (
    <div>
      <h2>About React</h2>
      <p>
        React is a JavaScript library(not a framwork like angular) for building user interface specifically 
        for single page applicatons. It was open-sourced in may, 2013 now which is maintained by Facebook and 
        a community of individual developers and companies.
      </p>
        React was created by Jordan Walke, a software engineer at Facebook.
      <p>
        React is the view layer of an MVC application (Model View Controller).
        One of the most important aspects of React is the fact that you can create components, 
        which are like custom, reusable HTML elements, to quickly and efficiently build user interfaces. 
        React also streamlines how data is stored and handled, using state and props.
      </p>
      <h4>Notable feature</h4>
      <ul>
        <li>One-way data binding with props</li>
        <li>Stateful components</li>
        <li>Lifecycle methods</li>
        <li>Virtual DOM</li>
        <li>JSX</li>        
      </ul>
    </div>
  )
}