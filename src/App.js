import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import AppjamHomePage from './pages/AppjamHomePage';
import SchoolHomePage from './pages/SchoolHomePage';
import SpheroHomePage from './pages/SpheroHomePage';
import WebjamHomePage from './pages/WebjamHomePage';
import TemplatePage from './pages/TemplatePage';
import ResetPassword from './pages/ResetPassword';
import UploadInstitutionPage from './pages/UploadInstitutionPage';
import ManualRosterPage from './pages/AddInstructorPage';

import SchoolAddRosterForm from './pages/schoolPages/SchoolAddRosterForm'
import SchoolRosterPage from './pages/schoolPages/SchoolRosterPage'

import AppjamSortedRosterPage from './pages/sortingPages/appjam/AppjamSortedRosterPage';
import AppjamRosterPage from './pages/sortingPages/appjam/AppjamRosterPage';
import AppjamShirtPage from './pages/sortingPages/appjam/AppjamShirtPage';
import AppjamUploadRosterPage from './pages/sortingPages/appjam/AppjamUploadRoster';
import AppjamUploadInstitutionPage from './pages/sortingPages/appjam/AppjamUploadInstitution';
import AppjamAddRosterForm from './pages/sortingPages/appjam/AppjamAddRosterForm';

import SpheroSortedRosterPage from './pages/sortingPages/sphero/SpheroSortedRosterPage';
import SpheroRosterPage from './pages/sortingPages/sphero/SpheroRosterPage';
import SpheroShirtPage from './pages/sortingPages/sphero/SpheroShirtPage';
import SpheroUploadRosterPage from './pages/sortingPages/sphero/SpheroUploadRoster';
import SpheroUploadInstitutionPage from './pages/sortingPages/sphero/SpheroUploadInstitution';
import SpheroAddRosterForm from './pages/sortingPages/sphero/SpheroAddRosterForm';

import WebjamSortedRosterPage from './pages/sortingPages/webjam/WebjamSortedRosterPage';
import WebjamRosterPage from './pages/sortingPages/webjam/WebjamRosterPage';
import WebjamShirtPage from './pages/sortingPages/webjam/WebjamShirtPage';
import WebjamUploadRosterPage from './pages/sortingPages/webjam/WebjamUploadRoster';
import WebjamUploadInstitutionPage from './pages/sortingPages/webjam/WebjamUploadInstitution';
import WebjamAddRosterForm from './pages/sortingPages/webjam/WebjamAddRosterForm';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import fire from './config/fire';

/*
  Contains all the routing links
*/
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

            {/* ResetPassword Component */}
            <Route path="/resetpassword" exact component={ResetPassword} />


            {/* SchoolHomePage Component */}
            <Route path="/schoolhome" exact component={SchoolHomePage} />

            {/* SchoolAddRosterForm Component */}
            <Route path="/schoolhome/addrosterform" exact component={SchoolAddRosterForm} />

            {/*UploadInstitutionPage Component */}
            <Route path="/schoolhome/uploadinstitution" exact component={UploadInstitutionPage} />

            {/*UploadInstitutionPage Component */}
            <Route path="/schoolhome/roster" exact component={SchoolRosterPage} />


            {/*ManualRosterPage Component */}
            <Route path="/manualaddinstructor" exact component={ManualRosterPage} />


            {/* AppjamPage Component */}
            <Route path="/appjamhome" exact component={AppjamHomePage} />

            {/* AppjamSortedRosterPage Component */}
            <Route path="/appjamhome/sortedroster" exact component={AppjamSortedRosterPage} />

            {/* AppjamRosterPage Component */}
            <Route path="/appjamhome/roster" exact component={AppjamRosterPage} />

            {/* AppjamShirtPage Component */}
            <Route path="/appjamhome/shirtsummary" exact component={AppjamShirtPage} />

            {/* AppjamUploadRosterPage Component */}
            <Route path="/appjamhome/uploadroster" exact component={AppjamUploadRosterPage} />

            {/* AppjamUploadInstitutionPage Component */}
            <Route path="/appjamhome/uploadinstitution" exact component={AppjamUploadInstitutionPage} />

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

            {/* SpheroUploadRosterPage Component */}
            <Route path="/spherohome/uploadroster" exact component={SpheroUploadRosterPage} />

            {/* SpheroUploadInstitutionPage Component */}
            <Route path="/spherohome/uploadinstitution" exact component={SpheroUploadInstitutionPage} />

            {/* SpheroAddRosterForm Component */}
            <Route path="/spherohome/addrosterform" exact component={SpheroAddRosterForm} />

            
            {/* WebjamHomePage Component */}
            <Route path="/webjamhome" exact component={WebjamHomePage} />

            {/* WebjamSortedRosterPage Component */}
            <Route path="/webjamhome/sortedroster" exact component={WebjamSortedRosterPage} />

            {/* WebjamRosterPage Component */}
            <Route path="/webjamhome/roster" exact component={WebjamRosterPage} />

            {/* WebjamShirtPage Component */}
            <Route path="/webjamhome/shirtsummary" exact component={WebjamShirtPage} />

            {/* WebjamUploadRosterPage Component */}
            <Route path="/webjamhome/uploadroster" exact component={WebjamUploadRosterPage} />

            {/* WebjamUploadInstitutionPage Component */}
            <Route path="/webjamhome/uploadinstitution" exact component={WebjamUploadInstitutionPage} />

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
