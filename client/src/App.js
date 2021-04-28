import React, {useContext, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Redirect, Route, useLocation} from "react-router-dom";

import {Toast, Badge} from "react-bootstrap";

import GlobalContextProvider, {GlobalContext} from "./context/GlobalContextProvider";

import NavigationBar from './components/NavBar';
import Programs from "./pages/ProgramsPage/Programs";
import Instructors from "./pages/InstructorsPage/Instructors";
import Sorter from "./pages/SorterPage/Sorter";
import InstructorOnboardingPage from "./pages/InstructorOnboardingPage";
import LoginPage from "./pages/LoginPage";
import AppContextProvider from './pages/SorterPage/AppContextProvider';
import fire from './fire.js';

function App() {
  let location = useLocation();
  const { toastShow, setToastShow, toastText } = useContext(GlobalContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  return (
    <>
      {!location.pathname.includes('/onboarding') && !location.pathname.includes('/login') && <NavigationBar />}
      {!isLoggedIn
        ? (
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/onboarding/:id/:name">
                    <InstructorOnboardingPage/>
                </Route>
                <Route path="/">
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        ) : (
            <Switch>
                <Route exact path="/">
                    <Redirect to="/programs"/>
                </Route>
                <Route path="/programs">
                    <Programs/>
                </Route>
                <Route path="/instructors">
                    <Instructors/>
                </Route>
                <Route path="/sorter">
                    <AppContextProvider>
                        <Sorter/>
                    </AppContextProvider>
                </Route>
                <Route path="/onboarding/:id/:name">
                    <InstructorOnboardingPage/>
                </Route>
                <Route path="/">
                    <Redirect to="/programs"/>
                </Route>
            </Switch>
        )}

      {/* Toast styling is in index.css */}
      <Toast onClose={() => setToastShow(false)} show={toastShow} delay={6000} autohide>
        <Toast.Header>
          {toastText.status === 'Success' && <Badge pill variant="success" className={"mr-auto"}>
            Success
          </Badge>}
          {toastText.status === 'Failed' && <Badge pill variant="danger" className={"mr-auto"}>
            Failed
          </Badge>}
        </Toast.Header>
        <Toast.Body>{toastText.message}</Toast.Body>
      </Toast>

    </>
  );
}

export default App;
