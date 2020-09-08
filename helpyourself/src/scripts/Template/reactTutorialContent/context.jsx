import React from 'react';

export default function Context () {
  return (
    <div>
      <h3>Context</h3>
      In React apps, for passing data from top to down (parent to child component), we use props.
      But sometime it is required to pass the data many level down and also that is consumed by 
      many component, in such cases using props is very cumbersome.Here Context comes into picture.
      Context gives a way to share the data between components without having explicitly mentioninig
      through every level of tree.
      <pre className="code">
        {
`// Context let us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}`
        }
      </pre>
      Above example is for understanding purpose.
      Context is primarily used when some data needs to be 
      accessible by many components at different nesting levels.
      <br /> <br />
      const MyContext = React.createContext(defaultValue);
      <br/>
      Above line Creates a Context object. When React renders a 
      component that subscribes to this Context object it will 
      read the current context value from the closest matching Provider above it in the tree.
      The defaultValue argument is only used when a component does not 
      have a matching Provider above it in the tree.
      <br /><br />
      <pre className="code">
      {
`<MyContext.Consumer>
  { value => /* render something based on the context value */  }
</MyContext.Consumer>`
      }
      </pre>
      Context.Consumer is A React component that subscribes to context changes.
       This lets you subscribe to a context within a function component.
       Requires a function as a child. The function receives the current context
      value and returns a React node. The value argument passed to the 
       function will be equal to the value prop of the closest Provider 
       for this context above in the tree. If there is no Provider for this 
       context above, the value argument will be equal to the defaultValue 
       that was passed to createContext().
       <br />
       below example shows how to use context.
      <pre className="code">
        {
`const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext(
  themes.dark // default value
);

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}

ThemedButton.contextType = ThemeContext;

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
`

        }
        </pre>
        Consuming multiple Contexts
        <pre className="code">
          {
`// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

`
          }
        </pre>
    </div>

  );
}