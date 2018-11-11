import React, {Component} from 'react';
import './Form.css'
import {Col, Container, Form, Row} from "reactstrap";

const URL = "http://localhost:8080/user";

const EMPTY_MAIL = 'Enter mail';
const EMPTY_LOGIN = 'Enter login';
const EMPTY_FIRST_NAME = 'Enter first name';
const EMPTY_LAST_NAME = 'Enter last name';
const EMPTY_PASSWORD = 'Enter password';
const GOOD_MAIL = 'Mail correct';
const GOOD_LOGIN = 'Login correct';
const GOOD_FIRST_NAME = 'First name correct';
const GOOD_LAST_NAME = 'Last name correct';
const GOOD_PASSWORD = 'Password correct';
const GOOD_CONFIRM_PASSWORD = '* Password correct';
const NOT_GOOD_MAIL = 'Mail is busy';
const NOT_GOOD_LOGIN = 'Login is busy';
const NOT_GOOD_FIRST_NAME = 'First name not correct';
const NOT_GOOD_LAST_NAME = 'Last name not correct';
const NOT_GOOD_CONFIRM_PASSWORD = '* Password not correct';
const NOT_GOOD_PASSWORD = 'Password not correct';
const PATTERN_TO_CHECK_MAIL = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
const PATTERN_TO_CHECK_NAME = '^[A-Za-z]*$';

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);

        this.state = {
            checkedUserName: null,
            isUserNameReadyForRegister: false,
            checkedMail: null,
            isMailReadyForRegister: false,
            checkedFirstName: null,
            isFirstNameReadyForRegister: false,
            checkedLastName: null,
            isLastNameReadyForRegister: false,
            checkedPassword: null,
            isPasswordReadyForRegister: false,
            checkedConfirmPassword: null,
            isConfirmPasswordReadyForRegister: false,
        };
    }

    static error(str) {
        alert(str);
    }

    componentDidMount() {
        this.props.setTitleScreen({titleName: 'Registration'});
        this.setState({checkedUserName: EMPTY_LOGIN});
        this.setState({checkedMail: EMPTY_MAIL});
        this.setState({checkedFirstName: EMPTY_FIRST_NAME});
        this.setState({checkedLastName: EMPTY_LAST_NAME});
        this.setState({checkedPassword: EMPTY_PASSWORD});
        this.setState({checkedConfirmPassword: ''});
    }

    render() {
        return (
            <Form className="wide-form" onSubmit={this.handleSubmit}>
                <Container>
                    <Row><Col><label for="login">Login:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handleUserName(evt);
                        }
                        } type="text" id="login" name="login"/>* {this.state.checkedUserName}</Col>
                    </Row>
                    <Row><Col><label for="mail">Mail:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handleMail(evt);
                        }} type="text" id="mail" name="mail"/>* {this.state.checkedMail}</Col></Row>

                    <Row><Col><label for="firstName">First name:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handleName(evt);
                        }} type="text" id="firstName" name="firstName"/>* {this.state.checkedFirstName}</Col></Row>

                    <Row><Col><label for="lastName">Last name:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handleName(evt);
                        }} type="text" id="lastName" name="lastName"/>* {this.state.checkedLastName}</Col>
                    </Row>

                    <Row><Col><label for="password">Password:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handlePassword(evt);
                        }} type="password" id="password"
                                    name="password"/>* {this.state.checkedPassword}</Col></Row>

                    <Row><Col><label for="confirmPassword">Confirm password:</label></Col>
                        <Col><input onChange={(evt) => {
                            this.handleChange(evt);
                            this.handleConfirmPassword(evt);
                        }} type="password" id="confirmPassword"
                                    name="confirmPassword"/>{this.state.checkedConfirmPassword}</Col></Row>
                </Container>
                <input className="btn btn-success" disabled={!(this.state.isUserNameReadyForRegister &&
                    this.state.isMailReadyForRegister
                    && this.state.isFirstNameReadyForRegister &&
                    this.state.isLastNameReadyForRegister &&
                    this.state.isPasswordReadyForRegister &&
                    this.state.isConfirmPasswordReadyForRegister)} type="submit" value="Register"/>
                <br/>
                <a href="" class="hint" onClick={this.onClickLogin}>Already registered?</a>
            </Form>
        );
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    onClickLogin(evt) {
        evt.preventDefault();
        this.props.setScreen("login");
    }

    async handleSubmit(evt) {
        evt.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            FormRegister.error("Passwords do not match");
            return;
        }

        let body = {};
        body.login = this.state.login;
        body.mail = this.state.mail;
        body.firstName = this.state.firstName;
        body.lastName = this.state.lastName;
        body.password = this.state.password;
        let resp = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (resp.status === 200 || resp.status === 201) {
            this.props.setScreen("login");
        } else {
            FormRegister.error("Failed to register. Check your data.");
        }
    }

    async handleUserName(evt) {
        let value = evt.target.value;
        if (value === '') {
            this.setState({checkedUserName: EMPTY_LOGIN});
            this.setState({isUserNameReadyForRegister: false});
            return;
        }
        const URLtoCheck = URL + '/username/check/';
        let resp = await fetch(URLtoCheck, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        let data = await resp.text();
        let response = JSON.parse(data);
        if (response === true) {
            this.setState({checkedUserName: NOT_GOOD_LOGIN});
            this.setState({isUserNameReadyForRegister: false});
        }
        else {
            this.setState({checkedUserName: GOOD_LOGIN});
            this.setState({isUserNameReadyForRegister: true});
        }
    }

    async handleMail(evt) {
        let value = evt.target.value;
        if (value === '') {
            this.setState({checkedMail: EMPTY_MAIL});
            this.setState({isMailReadyForRegister: false});
            return;
        }
        let regexChecker = new RegExp(PATTERN_TO_CHECK_MAIL);
        if (!regexChecker.test(value)) {
            this.setState({checkedMail: EMPTY_MAIL});
            this.setState({isMailReadyForRegister: false});
            return;
        }
        const URLtoCheck = URL + '/mail/check/';
        let resp = await fetch(URLtoCheck, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
        let data = await resp.text();
        let response = JSON.parse(data);
        if (response === true) {
            this.setState({checkedMail: NOT_GOOD_MAIL});
            this.setState({isMailReadyForRegister: false});
        }
        else {
            this.setState({checkedMail: GOOD_MAIL});
            this.setState({isMailReadyForRegister: true});
        }
    }

    handleName(evt) {
        let value = evt.target.value;
        let regexToCheckNonNumericValue = new RegExp(PATTERN_TO_CHECK_NAME);
        let isGood = regexToCheckNonNumericValue.test(value);
        if (evt.target.name === 'firstName') {
            isGood ? (evt.target.value === '' ?
                this.setState({checkedFirstName: EMPTY_FIRST_NAME}) :
                this.setState({checkedFirstName: GOOD_FIRST_NAME})) :
                this.setState({checkedFirstName: NOT_GOOD_FIRST_NAME});
            this.state.checkedFirstName === GOOD_FIRST_NAME ?
                this.setState({isFirstNameReadyForRegister: true}) :
                this.setState({isFirstNameReadyForRegister: false});
        } else {
            isGood ? (evt.target.value === '' ?
                this.setState({checkedLastName: EMPTY_LAST_NAME}) :
                this.setState({checkedLastName: GOOD_LAST_NAME})) :
                this.setState({checkedLastName: NOT_GOOD_LAST_NAME});
            this.state.checkedLastName === GOOD_LAST_NAME ?
                this.setState({isLastNameReadyForRegister: true}) :
                this.setState({isLastNameReadyForRegister: false});
        }
    }

    handlePassword(evt) {
        let value = evt.target.value;
        if (value === '') {
            this.setState({checkedPassword: EMPTY_PASSWORD});
            this.setState({isPasswordReadyForRegister: false});
        }
        if (value.length > 7) {
            this.setState({checkedPassword: GOOD_PASSWORD});
            this.setState({isPasswordReadyForRegister: true});
        } else {
            this.setState({checkedPassword: NOT_GOOD_PASSWORD});
            this.setState({isPasswordReadyForRegister: false});
        }
    }

    handleConfirmPassword(evt) {
        let value = evt.target.value;
        console.log(value === this.state.password);
        if (value === '') {
            this.setState({checkedConfirmPassword: EMPTY_PASSWORD});
            this.setState({isConfirmPasswordReadyForRegister: false});
        }
        if (value === this.state.password) {
            this.setState({checkedConfirmPassword: GOOD_CONFIRM_PASSWORD});
            this.setState({isConfirmPasswordReadyForRegister: true});
        } else {
            this.setState({checkedConfirmPassword: NOT_GOOD_CONFIRM_PASSWORD});
            this.setState({isConfirmPasswordReadyForRegister: false});
        }
    }
}

export default FormRegister
