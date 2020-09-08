import React from 'react';

export default function HigherOrderComponents () {
  return (
    <div>
      <h2>Higher-order Components (HOC) </h2>
      <p>A Higher-order Component is a function that takes a component 
        and returns a new component. It is an advanced technique in React 
        for reusing component logic</p>

      <pre className="code">
      {
`const NewComponent = (WrappedComponent) => {
  // ... create new component from old one and add additional data or func
  return UpdatedComponent;
}
`        
      }</pre>
      <p>
        HOC transforms a component into another component and adds additional data or functionality
        as in above example. 
      </p>
      <p>
        Below one is a practical example taken from reactjs docs. <br />
        Suppose we have a CommentList component that subscribes to an external data source 
        to render a list of comments and also a BlogPost component with similar functionality:
      </p>
        <pre className="code">
        {
`
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}


// BlogPost component
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
`
        }
        </pre>
        <p>
        CommentList and BlogPost aren’t identical — they call different methods on
        DataSource, and they render different output. But much of their implementation
        (adding/removing listeners and setting state) is the same.
        </p>
        <p>In larger apps such kind of pattern will occur over and over again
          HOC provides abstraction that allows us to define this logic in a single place 
          and share it across many components. That's why higher-order components excel.
        </p>
        <pre className="code">
        {
`const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
`
        }</pre>
        <p>
          Above withSubscription(will be defined shortly) which 
          creates components, like CommentList and BlogPost, that subscribe to DataSource.
          The first parameter is the wrapped component. The second parameter retrieves 
          the data we’re interested in, given a DataSource and the current props. <br />
          When CommentListWithSubscription and BlogPostWithSubscription are rendered, 
          CommentList and BlogPost will be passed a data prop with the most current data 
          retrieved from DataSource.
        </p>
        <pre className="code">
          {
`
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
`
          }
        </pre>
        <p>
        Note that a HOC doesn’t modify the input component, nor does it use 
        inheritance to copy its behavior. Rather, a HOC composes the original 
        component by wrapping it in a container component. A HOC is a pure function
         with zero side-effects.
        </p>
    </div>
  );
}