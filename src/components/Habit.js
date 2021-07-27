import React, { Component } from 'react';
import HabitContext from '../HabitContext';

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
        this.context.habitComplete(id)
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