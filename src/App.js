import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';
import TemplatePage from './pages/TemplatePage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* LoginPage Component */}
            {/* email: temp
              pass: 123abc */}
            <Route path="/" exact component={LoginPage} />

            {/* SchoolHomePage Component */}
            <Route path="/schoolhome" component={SchoolHomePage} />

            {/* AppjamPage Component */}
            <Route path="/appjamhome" component={AppjamHomePage} />

            {/* SpheroHomePage Component */}
            <Route path="/spherohome" component={SpheroHomePage} />

            {/* WebjamHomePage Component */}
            <Route path="/webjamhome" component={WebjamHomePage} />

            {/* TemplatePage Component */}
            <Route path="/template" component={TemplatePage} />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
