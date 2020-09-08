import React  from 'react';

function Home (props) {
    return  (
      <div>
        <h2>Home</h2>
        {props.match && (
          <React.Fragment>
          <h1>first param : {props.match.params.id}</h1>
          <h1>Second param : {props.match.params.id2}</h1>
          </React.Fragment>
        )}
	
         { props.children && <div className={props.className}> {props.children }</div>
         }
      </div>
    ) 
  
}

export default Home;