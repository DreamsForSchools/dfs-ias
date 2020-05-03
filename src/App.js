import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';
import TemplatePage from './pages/TemplatePage';

import AppjamSortedRosterPage from './pages/sortingPages/appjam/AppjamSortedRosterPage';
import AppjamRosterPage from './pages/sortingPages/appjam/AppjamRosterPage';
import AppjamShirtPage from './pages/sortingPages/appjam/AppjamShirtPage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import fire from './config/fire';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if (user){
        this.setState({user})
      }else{
        this.setState({})
      }
    })
  }

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
            <Route path="/appjamhome" exact component={AppjamHomePage} />

            {/* AppjamSortedRosterPage Component */}
            <Route path="/appjamhome/sortedroster" exact component={AppjamSortedRosterPage} />

            {/* AppjamRosterPage Component */}
            <Route path="/appjamhome/roster" exact component={AppjamRosterPage} />

            {/* AppjamShirtPage Component */}
            <Route path="/appjamhome/shirtsummary" exact component={AppjamShirtPage} />
            
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
