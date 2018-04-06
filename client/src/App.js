import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Today from './components/Today'
import Exchange from './components/Exchange'
// import HistoryDay from './components/HistoryDay'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <BrowserRouter>
            <div>
              <Link to={'/today'}>
                <button>TODAY</button>
              </Link>

              <Link to={'/exchange'}>
                <button>EXCHANGE</button>
              </Link>

              {/* <Link to={'/history'}>
                <button>HISTORY</button>
              </Link> */}

              <Route exact path='/today' component={Today} />

              <Route exact path='/exchange' component={Exchange} />

              {/* <Route exact path='/history' component={HistoryDay} /> */}
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
