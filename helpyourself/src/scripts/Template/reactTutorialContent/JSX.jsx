import React from 'react';

export default function JSX() {
  return (
    <div>
      <div>
        <h2>JSX(Syntax Extension to JavaScript)</h2>
        <div className="code">{ "const element = <h1>Hello, world!</h1>;" }</div>
          The above line is in jsx. You might think of it as a template language but it is blessed with almost full power of javascript.
          Although React can be used without JSX but it is recommended to use JSX with React for UI.
        </div>
      <div>
      <h2>JavaScript Expressions in jsx</h2>
        All valid javascript expression can be used with curly braces in JSX.
        <pre className="code">
          {`function getFullName(employee) {
  return employee.firstName + ' ' + employee.lastName;
}
const employee = {
  firstName: 'James',
  lastName: 'Goulding'
}
const language = 'Javascript';
const library = 'ReactJs'; 
const element = (
  <div>
    <p>
      {getFullName(employee)} told me that 
      <h5>
        {library} is {language} library for developing user interface
      </h5>
    </p>
    <p> 1 + 2 = { 1 + 2 } </p>
  </div> );
ReactDOM.render(
  element,
  document.getElementById('root')
);
  `}
        </pre>
        As in above example, any valid js expression can be used in jsx (getFullName(employee), 
        employee.firstName, 1 + 2 ), and also JSX tag are having children.
        Even JSX itself can be used as an expression like below. 
        <pre className="code">{
          `function employeeName(employee) {
  return <h1>hello {getFullName(employee)}!</h1>;
}`
          }
        </pre>
        <h2>Attributes with jsx</h2>
        Quotes are used to specify string literals as attributes and curly braces are used for 
        javascript expressions.
        <pre className="code">
        {`
  const elementWithString = <div className="abc"></div>;
  const elementWithCurlyBraces = <img src={employee.imgurl} />;
  `
    }
        </pre>
        If any tag is empty, it can be closed immidiately with /> as it is done above with img tag. 
        <br />
        As JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.
      </div>
    </div>
  );
}