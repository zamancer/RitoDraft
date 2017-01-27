import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//@Components
import DashboardView from './routes/dashboardView/dashboardView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="AppColumn">
          <div className="App-header">
            <div className="App-centered-header">
              <div className="col-md-2">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <div className="col-md-4">
                <h3>LoLs Stats Powered by React</h3>
              </div>
            </div>
          </div>
          <DashboardView />
        </div>
      </div>
    );
  }
}

export default App;
