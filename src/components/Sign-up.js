import React, { Component } from 'react';

class SignUp extends Component {
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
            re_pass: {
                value: '',
                touched: false
            }
        }
    }

    updateName(user_name) {
        this.setState({ user_name: { value: user_name, touched: true}})
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true}})
    }

    updateRe_pass(re_pass) {
        this.setState({ re_pass: { value: re_pass, touched: true}})
    }

    handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            user_name: e.target['user_name'].value,
            password: e.target['password'].value
        }
        console.log(newUser)
        this.props.history.push('/');
        alert('User Created! Now you can sign in.')
    }

    validateName() {
        const name = this.state.user_name.value.trim();
        if (name.length === 0) {
            return "Name is required";
        }
    }

    validatePassword() {
        const pass = this.state.password.value.trim();
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
        const nameError = this.validateName();
        const passError = this.validatePassword();
        return (
            <form className = "sign-up" onSubmit={e => this.handleSubmit(e)}>
                <h2>Sign up</h2>
                <div className="form group">
                    <label htmlFor="user_name">Username: </label>
                    <input type="text" name="user_name" onChange={e => this.updateName(e.target.value)}></input><br></br>
                    {this.state.user_name.touched}
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" onChange={e => this.updatePassword(e.target.value)}></input><br></br>
                    {this.state.password.touched}
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