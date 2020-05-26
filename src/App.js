import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';
import TemplatePage from './pages/TemplatePage';
import ResetPassword from './pages/ResetPassword'

import SchoolAddRosterForm from './pages/schoolPages/SchoolAddRosterForm'

import AppjamSortedRosterPage from './pages/sortingPages/appjam/AppjamSortedRosterPage';
import AppjamRosterPage from './pages/sortingPages/appjam/AppjamRosterPage';
import AppjamShirtPage from './pages/sortingPages/appjam/AppjamShirtPage';
import AppjamAddRosterForm from './pages/sortingPages/appjam/AppjamAddRosterForm';

import SpheroSortedRosterPage from './pages/sortingPages/sphero/SpheroSortedRosterPage';
import SpheroRosterPage from './pages/sortingPages/sphero/SpheroRosterPage';
import SpheroShirtPage from './pages/sortingPages/sphero/SpheroShirtPage';
import SpheroAddRosterForm from './pages/sortingPages/sphero/SpheroAddRosterForm';

import WebjamSortedRosterPage from './pages/sortingPages/webjam/WebjamSortedRosterPage';
import WebjamRosterPage from './pages/sortingPages/webjam/WebjamRosterPage';
import WebjamShirtPage from './pages/sortingPages/webjam/WebjamShirtPage';
import WebjamAddRosterForm from './pages/sortingPages/webjam/WebjamAddRosterForm';

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
            <Route path="/" exact component={LoginPage} />

            {/* ResetPassword Component */}
            <Route path="/resetpassword" exact component={ResetPassword} />
            

            {/* SchoolHomePage Component */}
            <Route path="/schoolhome" exact component={SchoolHomePage} />

            {/* SchoolAddRosterForm Component */}
            <Route path="/schoolhome/addrosterform" exact component={SchoolAddRosterForm} />


            {/* AppjamPage Component */}
            <Route path="/appjamhome" exact component={AppjamHomePage} />

            {/* AppjamSortedRosterPage Component */}
            <Route path="/appjamhome/sortedroster" exact component={AppjamSortedRosterPage} />

            {/* AppjamRosterPage Component */}
            <Route path="/appjamhome/roster" exact component={AppjamRosterPage} />

            {/* AppjamShirtPage Component */}
            <Route path="/appjamhome/shirtsummary" exact component={AppjamShirtPage} />

            {/* AppjamAddRosterForm Component */}
            <Route path="/appjamhome/addrosterform" exact component={AppjamAddRosterForm} />

            
            {/* SpheroHomePage Component */}
            <Route path="/spherohome" exact component={SpheroHomePage} />

            {/* SpheroSortedRosterPage Component */}
            <Route path="/spherohome/sortedroster" exact component={SpheroSortedRosterPage} />

            {/* SpheroRosterPage Component */}
            <Route path="/spherohome/roster" exact component={SpheroRosterPage} />

            {/* SpheroShirtPage Component */}
            <Route path="/spherohome/shirtsummary" exact component={SpheroShirtPage} />

            {/* SpheroAddRosterForm Component */}
            <Route path="/spherohome/addrosterform" exact component={SpheroAddRosterForm} />

            
            {/* WebjamHomePage Component */}
            <Route path="/webjamhome" exact component={WebjamHomePage} />

            {/* SpheroSortedRosterPage Component */}
            <Route path="/webjamhome/sortedroster" exact component={WebjamSortedRosterPage} />

            {/* SpheroRosterPage Component */}
            <Route path="/webjamhome/roster" exact component={WebjamRosterPage} />

            {/* SpheroShirtPage Component */}
            <Route path="/webjamhome/shirtsummary" exact component={WebjamShirtPage} />

            {/* WebjamAddRosterForm Component */}
            <Route path="/webjamhome/addrosterform" exact component={WebjamAddRosterForm} />
            

            {/* TemplatePage Component */}
            <Route path="/template" component={TemplatePage} />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
