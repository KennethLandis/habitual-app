import React, { Component } from 'react';
import { userHabits, findUser } from '../find-functions'
import HabitContext from '../HabitContext';
import Habit from './Habit'

class UserPage extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = HabitContext;
    

    render() {
        const user = this.props.match.params
        const users = this.context.users
        const habits = this.context.habits
        const displayHabits = userHabits(habits, user.userId)
        const targetUser = findUser(users, user.userId)
        console.log(targetUser)
        return (
            <section className='userPage'>
                <h3>Welcome {targetUser.user_name}!  Manage your Habits below!</h3>
                <ul>
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