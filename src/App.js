import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* LoginPage Component */}
            <Route path="/login" component={LoginPage} />

            {/* SchoolHomePage Component */}
            <Route path="/" exact component={SchoolHomePage} />

            {/* AppjamPage Component */}
            <Route path="/appjamhome" component={AppjamHomePage} />

            {/* SpheroHomePage Component */}
            <Route path="/spherohome" component={SpheroHomePage} />

            {/* WebjamHomePage Component */}
            <Route path="/webjamhome" component={WebjamHomePage} />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
