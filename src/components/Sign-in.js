import React, { Component }from 'react';

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
            }
        }
    }

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
        console.log(user_name)
        console.log(password)
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
                    <p>If you are a new user sign up</p>
                </div>
            </form>
        )
    }
}

export default SignIn;