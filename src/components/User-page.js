import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clientHabits, findClient } from '../find-functions';
import HabitContext from '../HabitContext';
import Habit from './Habit';

class UserPage extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = HabitContext;
    
    signOut = () => {
        this.context.signOut();
        this.props.history.push('/')
    }

    render() {
        const client = this.props.match.params
        const clients = this.context.clients
        const habits = this.context.habits
        let target = parseInt(client.client_id)
        const displayHabits = clientHabits(habits, client.client_id)
        const targetClient = findClient(clients, target)
        return (
            <section className='userPage'>
                <h3>Welcome {targetClient.client_name}!  Manage your Habits below!</h3>
                <Link className="link" to="/add-habit">Add Habit</Link><br></br>
                <button className='sign-out' type='button' onClick={() => this.signOut()}>Sign Out</button>
                <ul className="habit-list">
                {displayHabits.map(habit =>
                    <li key={habit.id}>
                        <Habit
                            id={habit.id}
                            name={habit.habit_name}
                            daysCompleted={habit.days_completed}
                        />
                    </li>
                )}
                </ul>
            </section>
        )
    }
}

export default UserPage;