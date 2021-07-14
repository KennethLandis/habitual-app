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

    handleSubmit(e) {
        e.preventDefault();
        const newHabit = {
            habit_id: (this.context.habits.length + 1).toString(),
            habit_name: e.target['habit_name'].value,
            days_completed: 0,
            userId: (this.context.targetUser.userId)
        }
        this.props.history.push(`/user/${this.context.targetUser.userId}`)
        this.context.addHabit(newHabit)
    }

    validateName() {
        const name = this.state.habit_name.value.trim();
        if (name.length === 0) {
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