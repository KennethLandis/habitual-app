import React, { Component }from 'react';

import { Link } from 'react-router-dom';
import HabitContext from '../HabitContext';
import { findClientByName } from '../find-functions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client_name: {
                value: '',
                touched: false
            },
            user_password: {
                value: '',
                touched: false
            },
        }
    }
    static contextType = HabitContext;

    updateName(client_name) {
        this.setState({ client_name: { value: client_name, touched: true}})
    }

    updatePassword(user_password) {
        this.setState({ user_password: { value: user_password, touched: true}})
    }

    validateName() {
        const name = this.state.client_name.value.trim();
        if (name.length === 0) {
            return "Name is required";
        } else if (name.length > 12) {
            return "Max length of username is 12 characters"
        }
    }

    validatePassword() {
        const passValidate = this.state.user_password.value.trim();
        if (passValidate.length === 0) {
            return "Password is required";
        } else if (passValidate.length > 20) {
            return "Max length of password is 20 characters"
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const client_name = this.state.client_name.value;
        const password = this.state.user_password.value;
        const clients = this.context.clients
        const targetClient = findClientByName(clients, client_name)
        if(targetClient === undefined) {
            alert('No User found')
            return;
        }
        if(targetClient.user_password === password) {
            this.context.setClient(targetClient)
            this.props.history.push(`/user/${targetClient.id}`)
        }
        if(targetClient.user_password !== password) {
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
                        onChange={e => this.updateName(e.target.value)}/><br></br>
                        {this.state.client_name.touched}
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        className="sign-in-control"
                        name="password"
                        id="password"
                        onChange={e => this.updatePassword(e.target.value)}/><br></br>
                        {this.state.user_password.touched}
                    <button className="sign-in-reset" type="reset"> Reset </button>
                    <button
                        type="submit"
                        className="sign-in-submit"
                        //disabled={this.validateName() && this.validatePassword()}
                    >Sign In</button>
                    <p>If you are a new user <Link className="link" to={'/signup'}>sign up</Link></p>
                </div>
            </form>
        )
    }
}

export default SignIn;