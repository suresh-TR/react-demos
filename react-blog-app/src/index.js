import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Details from './components/Details';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className='container-fluid'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/details/:id'>
          <Details />
        </Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
