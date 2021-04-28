import React, {useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route, useLocation } from "react-router-dom";

import { Toast, Badge } from "react-bootstrap";

import GlobalContextProvider, {GlobalContext} from "./context/GlobalContextProvider";

import NavigationBar from './components/NavBar';
import Programs from "./pages/ProgramsPage/Programs";
import Instructors from "./pages/InstructorsPage/Instructors";
import Sorter from "./pages/SorterPage/Sorter";
import InstructorOnboardingPage from "./pages/InstructorOnboardingPage";
import AppContextProvider from './pages/SorterPage/AppContextProvider';

function App() {
  let location = useLocation();
  const { toastShow, setToastShow, toastText } = useContext(GlobalContext);

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
          <AppContextProvider>
            <Sorter />
          </AppContextProvider>
        </Route>
        <Route path="/onboarding">
          <InstructorOnboardingPage />
        </Route>
      </Switch>

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
