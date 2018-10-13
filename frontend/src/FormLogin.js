import React, {Component} from 'react';
import './Form.css'

const URL_LOGIN = "http://localhost:8080/app-login";

export default class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="login">Login</label>
                <input type="text" id="login" name="login" onChange={this.handleChange}/>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" onChange={this.handleChange}/>
                <input className="btn btn-success" type="submit" value="Login"/>
                <br/>
                <a href="" class="hint" onClick={this.onClickRegister}>Do not have an account?</a>
            </form>
        );
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        let resp = await fetch(URL_LOGIN, {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: "app_username=" + this.state.login + "&app_password=" + this.state.password,
        });

        let text = await resp.text();
        console.log(text);

        if( resp.status === 200 ) {
            try {
                let user = JSON.parse(text);
                user.truePassword = this.state.password;
                if (user.role === "ROLE_ADMIN") {
                    this.props.setScreen("admin_home", {me: user});
                } else {
                    this.props.setScreen("user_home", {me: user});
                }
            } catch(e) {
                this.error("Failed to login");
            }
        } else {
            this.error("Failed to login");
        }
    }

    onClickRegister(evt) {
        evt.preventDefault();
        this.props.setScreen("register");
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }
  
    error(str) {
        alert(str);
    }
};

