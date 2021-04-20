import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route, useLocation } from "react-router-dom";

import NavigationBar from './design-system/navbar';
import Programs from "./pages/ProgramsPage/Programs";
import Instructors from "./pages/InstructorsPage/Instructors";
import Sorter from "./pages/SorterPage/Sorter";
import InstructorOnboardingPage from "./pages/InstructorOnboardingPage";

function App() {
  let location = useLocation();

  React.useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      {location.pathname !== '/onboarding' && <NavigationBar />}
      <Switch>
        <Route exact path="/">
          <Redirect to="/programs" />
        </Route>
        <Route path="/programs">
          <Programs />
        </Route>
        <Route path="/instructors">
          <Instructors />
        </Route>
        <Route path="/sorter">
          <Sorter />
        </Route>
        <Route path="/onboarding">
          <InstructorOnboardingPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
