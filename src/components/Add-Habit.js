import React, { Component } from 'react';
import HabitContext from '../HabitContext';

class AddHabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habit_name: {
                value: '',
                touched: false
            }
        }
    }
    static contextType = HabitContext;

    updateName(habit_name) {
        this.setState({ habit_name: { value: habit_name, touched: true}})
    }

    addHabit(newHabit, addHabit) {
        console.log(newHabit)
        //const api_url = process.env.REACT_APP_API_URL
        fetch(`http://localhost:8000/habits`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json' },
            body: JSON.stringify( newHabit )
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            addHabit(newHabit)
        })
        .catch(error => {
            console.error(error)
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const newHabit = {
            habit_name: e.target['habit_name'].value,
            days_completed: (1),
            client_id: (this.context.targetClient.id)
        }
        this.props.history.push(`/user/${this.context.targetClient.id}`)
        this.addHabit(newHabit, this.context.addHabit)
    }

    validateName() {
        const habit_name = this.state.habit_name.value.trim();
        if (habit_name.length === 0) {
            return "Habit name is required";
        }
    }

    render() {
        //const nameError = this.validateName();
        return(
            <form className="add-habit" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Habit</h2>
                <div className="form group">
                    <label htmlFor="habit_name">Habit Name: </label>
                    <input type="text" name="habit_name" onChange={e => this.updateName(e.target.value)}></input>
                    {this.state.habit_name.touched}
                </div>
                <button type="submit" disabled={this.validateName()}>Submit</button>
            </form>
        )
    }
}

export default AddHabit;