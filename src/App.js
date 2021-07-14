import React, { Component } from 'react';
import { Route } from 'react-router';
import Store from './store'
import './App.css';
import Home from './components/Home';
import SignUp from './components/Sign-up';
import UserPage from './components/User-page';
import HabitContext from './HabitContext';

class App extends Component {
  state = {
    users: [],
    habits: [],
    targetUser: []
  };

  addUser = newUser => {
    const newUsers = this.state.users
    newUsers.push(newUser)
    this.setState({
      users: newUsers
    })
  }

  addHabit = newHabit => {
    const newHabits = this.state.habits
    newHabits.push(newHabit)
    this.setState({
      habits: newHabits
    })
  }

  deleteHabit = habitId => {
    const newHabits = this.state.habits.filter(habit =>
      habit.habit_id !== habitId
      )
    this.setState({
      habits: newHabits
    })
  }

  habitComplete = (habitId) => {
    this.setState(prevState => ({
      habits: prevState.habits.map(
        habit => habit.habit_id === habitId ? {...habit, days_completed: (habit.days_completed + 1)}: habit
      )
    }))
  }

  setUser = newUser => {
    this.setState({
      targetUser: newUser
    })
  }
  
  componentDidMount() {
    this.setState({
      users: Store.users,
      habits: Store.habits
    })
  };

  render() {
    const contextValue = {
      users: this.state.users,
      habits: this.state.habits,
      targetUser: this.state.targetUser,
      setUser: this.setUser,
      addUser: this.addUser,
      addHabit: this.addHabit,
      deleteHabit: this.deleteHabit,
      habitComplete: this.habitComplete
    }
    console.log(this.state.users)
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
          key={'/user/:userId'}
          path={'/user/:userId'}
          component={UserPage}
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
