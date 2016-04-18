import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';

const App = ({children}) => {
  return (
    <div>
      <nav className="navbar-inverse navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand react" href="#">beerlocker react</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-8">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
