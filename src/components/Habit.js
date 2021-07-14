import React, { Component } from 'react';

class Habit extends Component {

    render() {
        const { name, id, daysCompleted } = this.props
    
        return (
            
            <div className="habit">
                <h4>{id} {name}</h4>
                <p>{daysCompleted}</p>
                <button>Delete Habit</button>
                <button>Habit Complete</button>
            </div>
            
        )
    }
}

export default Habit;