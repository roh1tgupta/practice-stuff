import React from 'react';
import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

export default function() {
  console.log(this.props.location, 'history', this.props.history);
  return (
  <div>
    <div className="template">
      <div className="templateMainBody">
        <div className="templateSidebar"><Sidebar match={this.props.match}/></div>
        <div className="templateContent"><Content match={this.props.match}/></div>
      </div>
      <div className="templateFooter">
        { this.props.match.path === '/react-tutorial' && (<div>This tutorial gives reader a basic idea of concepts and patterns used in reactJs.
            The reference is taken from <a href="https://reactjs.org/docs" target="_blank" rel="noopener noreferrer">reactjs docs</a>.
          </div>)
        }
        { this.props.match.path === '/jest' && (<div>This tutorial gives reader a basic idea of using jest a testing framework.
          The reference is taken from <a href="https://jestjs.io/docs/en/getting-started" target="_blank" rel="noopener noreferrer">jest docs</a>.
          </div>)
        }
        { this.props.match.path === '/miscellaneous' && (<div>Here most of the concepts from javascript in mentioned. The reference is taken
          from MZN web docs and other blog platform like medium.</div>)
        }
      </div>
    </div>
  </div>
  );
}