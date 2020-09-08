import React from 'react';

export default function Fragments () {
  return (
    <div>
      <h3>Fragments</h3>
      Fragments let you group a list of children without adding extra nodes to the DOM.
      <pre className="code">
        {
`render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// below is shorter syntax although but not supported by all browser yet
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}`
        }
      </pre>
      <h3>Where to use</h3>
      <pre className="code">
        {
`class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}`
        }
      </pre>
      &lt;Columns /&gt; would need to return multiple &lt;td /&gt; elements in order
         for the rendered HTML to be valid. If a parent div was used 
         inside the render() of &lt;Columns /&gt; , then the resulting HTML will be invalid
      <pre className="code">
        {
`class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}

//  results in a <Table /> output of: 
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>`
        }
      </pre>
      Here Fragment solves the issue:
        <pre className="code">
        {
`class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
// which results in a correct <Table /> output of:
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>`
        }
        </pre>
        <h3>Keys in Fragments</h3>
        Fragments declared with the explicit &lt;React.Fragment&gt; syntax may have keys.
        (Although shorter syntax doesnt support keys or attributes)
          A use case for this is mapping a collection to an array of fragments.
          For example, to create a description list:
          <pre className="code">
            {
`function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the 'key', React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
`
            }
          </pre>
          Upto React v16.7.0 key is the only attribute that can be passed to Fragment.
    </div>
  );
}