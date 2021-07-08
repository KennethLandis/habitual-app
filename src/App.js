import React, { Component } from 'react';
import { Route } from 'react-router';
import Store from './store'
import './App.css';
import Home from './components/Home'

class App extends Component {
  state = {
    users: [],
    habits: []
  };

  componentDidMount() {
    this.setState({
      users: Store.users,
      habits: Store.habits
    })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Habitually Successful
          </h1>
        </header>
        <Route
          exact
          key={'/'}
          path={'/'}
          component={Home}
        />
        <footer className="footer">
          Kenneth Landis copyright thing
        </footer>
      </div>
    );
  };
}

export default App;
