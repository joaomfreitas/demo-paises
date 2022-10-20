import React from 'react';
import './css/main.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainPage from "./components/MainPage";
import CountryPage from "./components/CountryPage";
require('dotenv').config();

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' component={MainPage}/>
              <Route name='country' path='/country/:name' component={CountryPage}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
