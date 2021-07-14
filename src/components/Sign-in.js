import React, { Component }from 'react';

import { Link } from 'react-router-dom';
import HabitContext from '../HabitContext';
import { findUserByName } from '../find-functions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
        }
    }
    static contextType = HabitContext;

    updateName(user_name) {
        this.setState({ user_name: { value: user_name, touched: true}})
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true}})
    }

    validateName() {
        const name = this.state.user_name.value.trim();
        if (name.length === 0) {
            return "Name is required";
        } else if (name.length > 12) {
            return "Max length of username is 12 characters"
        }
    }

    validatePassword() {
        const passValidate = this.state.password.value.trim();
        if (passValidate.length === 0) {
            return "Password is required";
        } else if (passValidate.length > 20) {
            return "Max length of password is 20 characters"
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user_name = this.state.user_name.value;
        const password = this.state.password.value;
        const users = this.context.users
        const targetUser = findUserByName(users, user_name)
        if(targetUser === undefined) {
            alert('No User found')
            return;
        }
        if(targetUser.user_password === password) {
            this.context.setUser(targetUser)
            this.props.history.push(`/user/${targetUser.userId}`)
        }
        if(targetUser.user_password !== password) {
            alert('User Data does not match anyone in database!')
        }
        
    }

    render() {
        //const nameError = this.validateName();
        return(
            <form className="sign-in" onSubmit={e => this.handleSubmit(e)}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label htmlFor="user-name">User Name: </label>
                    <input
                        type="text"
                        className="sign-in-control"
                        name="user-name"
                        id="user-name"
                        onChange={e => this.updateName(e.target.value)}/>
                        {this.state.user_name.touched}
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        className="sign-in-control"
                        name="password"
                        id="password"
                        onChange={e => this.updatePassword(e.target.value)}/><br></br>
                        {this.state.password.touched}
                    <button className="sign-in-reset" type="reset"> Reset </button>
                    <button
                        type="submit"
                        className="sign-in-submit"
                        //disabled={this.validateName() && this.validatePassword()}
                    >Sign In</button>
                    <p>If you are a new user <Link to={'/signup'}>sign up</Link></p>
                </div>
            </form>
        )
    }
}

export default SignIn;