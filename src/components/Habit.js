import React, { Component } from 'react';
import HabitContext from '../HabitContext';
import { findHabit } from '../find-functions'

class Habit extends Component {

    static contextType = HabitContext

    deleteHabit(id) {
        console.log(id)
        //const api_url = process.env.REACT_APP_API_URL
        fetch(`http://localhost:8000/habits/${id}`, {
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
        const targetHabit = findHabit(this.context.habits, id);
        console.log(targetHabit)
        fetch(`http://localhost:8000/habits/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(targetHabit)
        })
        .then(responseData => {
            this.context.habitComplete(id)
        })
        .catch(error => console.log(error))
    }

    render() {
        const { name, id, daysCompleted } = this.props
    
        return (
            
            <div className="habit">
                <h4>{name}</h4>
                <p>{daysCompleted}</p>
                <button className='Habit-delete' type='button' onClick={() => {this.deleteHabit(id)}}>Delete Habit</button>
                <button className='Habit-complete' type='button' onClick={() => {this.habitComplete(id)}}>Habit Complete</button>
            </div>
            
        )
    }
}

export default Habit;