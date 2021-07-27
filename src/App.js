import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import SignUp from './components/Sign-up';
import UserPage from './components/User-page';
import HabitContext from './HabitContext';
import AddHabit from './components/Add-Habit';

class App extends Component {
  state = {
    clients: [],
    habits: [],
    targetClient: []
  };

  componentDidMount() {
    const api_url = process.env.REACT_APP_API_URL
    console.log(api_url)
    Promise.all([
      fetch(`${api_url}/clients`),
      fetch(`${api_url}/habits`)
    ])
      .then(([Res1, Res2]) => {
        if (!Res1.ok)
          return Res1.json().then(e => Promise.reject(e))
        if (!Res2.ok)
          return Res2.json().then(e => Promise.reject(e))
        return Promise.all([Res1.json(), Res2.json()]);
      })
      .then(([clients1, habits1]) => this.setState({
        clients: clients1,
        habits: habits1}))
    
  };

  addClient = newClient => {
    const newClients = this.state.clients
    newClients.push(newClient)
    this.setState({
      clients: newClients
    })
  }

  addHabit = newHabit => {
    const newHabits = this.state.habits
    newHabits.push(newHabit)
    this.setState({
      habits: newHabits
    })
  }

  signOut = () => {
    this.setState({
      targetClient: []
    })
  }

  deleteHabit = habitId => {
    const newHabits = this.state.habits.filter(habit =>
      habit.id !== habitId
      )
    this.setState({
      habits: newHabits
    })
  }

  habitComplete = (habitId) => {
    
    this.setState(prevState => ({
      habits: prevState.habits.map(
        habit => habit.id === habitId ? {...habit, days_completed: (habit.days_completed + 1)}: habit
      )
    }))
  }

  setClient = newClient => {
    this.setState({
      targetClient: newClient
    })
    
  }

  render() {
    const contextValue = {
      clients: this.state.clients,
      habits: this.state.habits,
      targetClient: this.state.targetClient,
      setClient: this.setClient,
      addClient: this.addClient,
      addHabit: this.addHabit,
      deleteHabit: this.deleteHabit,
      habitComplete: this.habitComplete,
      signOut: this.signOut
    }

    return (
      <HabitContext.Provider value={contextValue}>
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
        <Route
          exact
          key={'/signup'}
          path={'/signup'}
          component={SignUp}
        />
        <Route
          exact
          key={'/user/:client_id'}
          path={'/user/:client_id'}
          component={UserPage}
        />
        <Route
          exact
          key={'/add-habit'}
          path ={'/add-habit'}
          component={AddHabit}
        />
        <footer className="footer">
          Kenneth Landis copyright thing
        </footer>
      </div>
      </HabitContext.Provider>
    );
  };
}

export default App;
