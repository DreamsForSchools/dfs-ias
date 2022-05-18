import React, {useContext} from 'react';
import './App.css';
import {Switch, Redirect, Route, useLocation} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import {GlobalContext} from "./context/GlobalContextProvider";

import NavigationBar from './components/NavBar';
import ClassesPartners from "./pages/ClassesPartnersPage";
import Instructors from "./pages/InstructorsPage/Instructors";
import Sorter from "./pages/SorterPage/Sorter";
import InstructorOnboardingPage from "./pages/InstructorOnboardingPage";
import LoginPage from "./pages/LoginPage";
import fire from './fire.js';

function App() {
  let location = useLocation();
  const { isLoggedIn } = useContext(GlobalContext);


  return (
    <>
      {
          !location.pathname.includes('/onboarding') &&
          !location.pathname.includes('/login') &&
            <NavigationBar />
      }

      {!isLoggedIn
        ? (
            <Switch>
                <Route path="/login">
                    <LoginPage authState={isLoggedIn}/>
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
                    <ClassesPartners/>
                </Route>
                <Route path="/instructors">
                    <Instructors/>
                </Route>
                <Route path="/sorter">
                    <Sorter/>
                </Route>
                <Route path="/onboarding/:id/:name">
                    <InstructorOnboardingPage/>
                </Route>
                <Route path="/">
                    <Redirect to="/programs"/>
                </Route>
            </Switch>
        )}


        <ToastContainer position="bottom-right"/>

    </>
  );
}

export default App;
