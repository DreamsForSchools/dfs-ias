import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';
import TemplatePage from './pages/TemplatePage';
import RosterAppjam from './pages/RosterAppjam';
import RosterSphero from './pages/RosterSphero';
import RosterWebjam from './pages/RosterWebjam';
import RosterSchool from './pages/RosterSchool';





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
            <Route path="/appjamhome" component={AppjamHomePage} />

            {/* SpheroHomePage Component */}
            <Route path="/spherohome" component={SpheroHomePage} />

            {/* WebjamHomePage Component */}
            <Route path="/webjamhome" component={WebjamHomePage} />

            {/* TemplatePage Component */}
            <Route path="/template" component={TemplatePage} />

            {/* RosterAppjam Component */}
            <Route path="/appjamroster" component={RosterAppjam} />

            {/* RosterSphero Component */}
            <Route path="/spheroroster" component={RosterSphero} />

            {/* RosterWebjam Component */}
            <Route path="/webjamroster" component={RosterWebjam} />

            {/* RosterSchool Component */}
            <Route path="/schoolroster" component={RosterSchool} />

        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
