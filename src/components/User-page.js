import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userHabits, findUser } from '../find-functions';
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
        const user = this.props.match.params
        const users = this.context.users
        const habits = this.context.habits
        const displayHabits = userHabits(habits, user.userId)
        const targetUser = findUser(users, user.userId)
        return (
            <section className='userPage'>
                <h3>Welcome {targetUser.user_name}!  Manage your Habits below!</h3>
                <Link className="link" to="/add-habit">Add Habit</Link><br></br>
                <button className='sign-out' type='button' onClick={() => this.signOut()}>Sign Out</button>
                <ul className="habit-list">
                {displayHabits.map(habit =>
                    <li key={habit.habit_id}>
                        <Habit
                            id={habit.habit_id}
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