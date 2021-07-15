import React, { Component } from 'react';
import HabitContext from '../HabitContext';

class Habit extends Component {

    static contextType = HabitContext

    deleteHabit(id) {
        this.context.deleteHabit(id)
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