import React from 'react';

export default function ErrorBoundary () {
  return (
    <div>
      <h3>Error Boundary</h3>
      Error boundaries are React components that catch JavaScript errors
      anywhere in their child component tree, during rendering, in lifecycle methods, and
      in constructors of the whole tree below them.
      A class component becomes an error boundary if it defines either (or both) of 
      the lifecycle methods static getDerivedStateFromError()(to render a fallback UI after an error)
       or componentDidCatch()(to log error information).
       <pre className="code">
        {
`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}`
        }
       </pre>
       error boundaries only catch errors in the components below them in the
        tree. An error boundary can’t catch an error within itself
        <pre className="code">
          {
`<ErrorBoundary>
<Sidebar /> // child component
</ErrorBoundary>
`
          }
        </pre>
        If an error boundary fails trying to render the error
         message, the error will propagate to the closest error boundary above it
         similar to catch block in JavaScript.
    </div>
  );
}