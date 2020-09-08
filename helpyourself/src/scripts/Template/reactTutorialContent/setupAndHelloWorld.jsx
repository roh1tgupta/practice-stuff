import React from 'react';

export default function SetupAndHelloWorld () {
  return (
    <div>
      <h2>SetUp</h2>
      <h4>Pre-requisite</h4>
      <p>You’ll need to have Node >= 6 and npm >= 5.2 on your machine. 
        And if u dont have then go to below link and install node.
        <br />
        <a className="link" href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">https://nodejs.org/en/</a>
      </p>
      <p>
        As here we are learning React, we will be creating a new single-page app using Create React App. 
        Create React App is a comfortable environment for learning React, and is the best way to start
        building a new single-page application.
        It creates a frontend build pipeline and under the hood, it uses Babel and webpack,
        about which we don’t need to know anything at this level.
      </p>
      <p>
        Open the command propmt and install Create React App anywhere you like (here it is done on desktop)
        using below command.</p>
      <pre className="code">C:\Users\XYZ\Desktop>npx create-react-app my-app</pre>
      
      <p>
        This will create a folder named my-app on the desktop and installs all the required files in it.
        Now go to my-app folder and execute npm-start (mentioned below)
      </p>
      <pre className="code">
        C:\Users\XYZ\Desktop>cd my-app <br />
        C:\Users\XYZ\Desktop\my-app>npm start
      </pre>
      <p>
        Now check https://localhost:3000 (default setting run this app on port no 3000).
        Here we go, our app is started successfully.
      </p>
      <h4>Hello World</h4>
      <p>
        Goto index.js and replace line no 7 with below line and save.
      </p>
        <pre className="code"> 
          {
            `ReactDOM.render(<h1>hello world!</h1>, document.getElementById('root'));
            `
          }
        </pre>  
      <p>  Here comes hello world.
        There are other code lines in the file, for the time being just ignore them.
      </p>
    </div>
  )
}