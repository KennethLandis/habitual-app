import React, { Component } from 'react';
import HabitContext from '../HabitContext';
import { findHabit } from '../find-functions'

class Habit extends Component {

    static contextType = HabitContext

    deleteHabit(id) {
        const api_url = process.env.REACT_APP_API_URL
        fetch(`${api_url}/habits/${id}`, {
            method: `DELETE`
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response
        })
        .then(data => {
            this.context.deleteHabit(id)
        })
        .catch(error => {
            console.error(error)
        })
    }

    habitComplete(id) {
        const api_url= process.env.REACT_APP_API_URL
        const targetHabit = findHabit(this.context.habits, id);
        fetch(`${api_url}/habits/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({days_completed: (targetHabit.days_completed + 1)})
        })
        .then(responseData => {
            this.context.habitComplete(id)
        })
        .catch(error => console.log(error))
    }

    render() {
        const { habit_name, id, daysCompleted } = this.props
    
        return (
            
            <div className="habit">
                <h4>{habit_name}</h4>
                <p>Days Completed: {daysCompleted}</p>
                <button className='Habit-delete' type='button' onClick={() => {this.deleteHabit(id)}}>Delete Habit</button>
                <button className='Habit-complete' type='button' onClick={() => {this.habitComplete(id, this.context.deleteHabit())}}>Habit Complete</button>
            </div>
            
        )
    }
}

export default Habit;