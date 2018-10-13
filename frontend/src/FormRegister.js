import React, {Component} from 'react';
import './Form.css'

const URL = "http://localhost:8080/user";

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="login">Login</label>
                <input onChange={this.handleChange} type="text" id="login" name="login"/>

                <label for="firstName">First name</label>
                <input onChange={this.handleChange} type="text" id="firstName" name="firstName"/>

                <label for="lastName">Last name</label>
                <input onChange={this.handleChange} type="text" id="lastName" name="lastName"/>

                <label for="password">Password</label>
                <input onChange={this.handleChange} type="password" id="password" name="password"/>

                <label for="confirmPassword">Confirm password</label>
                <input onChange={this.handleChange} type="password" id="confirmPassword" name="confirmPassword"/>

                <input className="btn btn-success" type="submit" value="Register"/>
                <br/>
                <a href="" class="hint" onClick={this.onClickLogin}>Already registered?</a>
            </form>
        );
    }

    async handleSubmit(evt) {
        evt.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.error("Passwords do not match");
            return;
        }

        let resp = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        });

        if (resp.status === 200 || resp.status === 201) {
            this.props.setScreen("login");
        } else {
            this.error("Failed to register. Check your data.");
        }
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    onClickLogin(evt) {
        evt.preventDefault();
        this.props.setScreen("login");
    }

    error(str) {
        alert(str);
    }
}

export default FormRegister
