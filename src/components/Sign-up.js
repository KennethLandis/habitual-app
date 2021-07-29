import React, { Component } from 'react';
import HabitContext from '../HabitContext';

class SignUp extends Component {
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
            re_pass: {
                value: '',
                touched: false
            }
        }
    }
    static contextType = HabitContext;

    updateName(client_name) {
        this.setState({ client_name: { value: client_name, touched: true}})
    }

    updatePassword(user_password) {
        this.setState({ user_password: { value: user_password, touched: true}})
    }

    updateRe_pass(re_pass) {
        this.setState({ re_pass: { value: re_pass, touched: true}})
    }

    addClient(newClient, addClient) {
        const api_url = process.env.REACT_APP_API_URL
        fetch(`${api_url}/clients`, {
            method: `POST`,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ 
                    client_name: newClient.client_name,
                    user_password: newClient.user_password
             })
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
            addClient(data)
        })
        .catch(error => {
            console.error(error)
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const newClient = {
            client_name: e.target['client_name'].value,
            user_password: e.target['password'].value
        }
        this.addClient(newClient, this.context.addClient)
        this.props.history.push('/');
        alert('User Created! Now you can sign in.')
    }

    validateName() {
        const name = this.state.client_name.value.trim();
        if (name.length === 0) {
            return "Name is required";
        }
    }

    validatePassword() {
        const pass = this.state.user_password.value.trim();
        const pass2 = this.state.re_pass.value.trim();
        if (pass.length === 0) {
            return "Password is required"
        }
        if (pass2.length === 0) {
            return "Re-type Password here"
        }
        if (pass2 !== pass) {
            return "Passwords must match"
        }
    }

    render() {
        //const nameError = this.validateName();
        //const passError = this.validatePassword();
        return (
            <form className = "sign-up" onSubmit={e => this.handleSubmit(e)}>
                <h2>Sign up</h2>
                <div className="form group">
                    <label htmlFor="client_name">Username: </label>
                    <input type="text" name="client_name" onChange={e => this.updateName(e.target.value)}></input><br></br>
                    {this.state.client_name.touched}
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" onChange={e => this.updatePassword(e.target.value)}></input><br></br>
                    {this.state.user_password.touched}
                    <label htmlFor="re_pass">Retype Password: </label>
                    <input type="text" name="re_pass" onChange={e => this.updateRe_pass(e.target.value)}></input><br></br>
                    {this.state.re_pass.touched}
                </div>
                <button type="submit" disabled={this.validateName() || this.validatePassword()}>Submit</button>
            </form>
        )
    }
}

export default SignUp;