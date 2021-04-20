import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

import NavigationBar from './design-system/navbar';
import Programs from "./pages/ProgramsPage/Programs";
import Instructors from "./pages/InstructorsPage/Instructors";
import Sorter from "./pages/SorterPage/Sorter";
import AppContextProvider from './pages/SorterPage/AppContextProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/programs" />
          </Route>
        </Switch>
        <Switch>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
