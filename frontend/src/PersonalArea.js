import React from "react";
import {Button, Container, Form, Input, Table} from "reactstrap";
import './Form.css'

const URL = "http://localhost:8080/user/_id_";
const PATTERN_TO_CHECK_MAIL = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
const PATTERN_TO_CHECK_NAME = '^[A-Za-z]*$';

export default class PersonalArea extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            isEdited: false,
            firstName: props.me().firstName,
            lastName: props.me().lastName,
            mail: props.me().mail,
            isMailReadyForRegister: true,
            isFirstNameReadyForRegister: true,
            isLastNameReadyForRegister: true,
        };
    }

    async onSubmit(evt) {
        let error = 'Check your new';
        if (!this.state.isMailReadyForRegister) {
            error = error + ' mail ';
        }
        if (!this.state.isFirstNameReadyForRegister) {
            error = error + ' first name ';
        }
        if (!this.state.isLastNameReadyForRegister) {
            error = error + ' last name';
        }
        if (error !== 'Check your new') {
            alert(error);
            return;
        }
        evt.preventDefault();

        let body = {
            login: this.props.me().login,
            password: this.props.me().password,
        };
        for (let key of ["firstName", "lastName", "mail"]) {
            if (this.state[key] === '') {
                body[key] = this.props.me()[key];
            } else {
                body[key] = this.state[key];
            }
        }

        let resp = await fetch(URL.replace("_id_", this.props.me().id), {
            method: "put",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (resp.status === 200) {
            this.props.me().mail = body.mail;
            this.props.me().firstName = body.firstName;
            this.props.me().lastName = body.lastName;
            this.setState({isEdited: false});
        } else {
            alert("Failed to update profile");
        }
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    render() {
        let me = this.props.me();
        return (
            <Container>
                <b><h3>Welcome, {me.firstName}</h3></b>
                <Table>
                    <tbody>
                    <tr>
                        <th scope="row">Login</th>
                        <td>{me.login}</td>
                    </tr>
                    <tr>
                        <th scope="row">Mail</th>
                        <td>{me.mail}</td>
                    </tr>
                    <tr>
                        <th scope="row">First name</th>
                        <td>{me.firstName}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last name</th>
                        <td>{me.lastName}</td>
                    </tr>
                    </tbody>
                </Table>
                <br/>
                <br/>
                <Button className="btn-danger" onClick={() => this.setState({isEdited: true})}>Edit profile</Button>
                {this.state.isEdited ?
                    <Form className="wide-form" onSubmit={this.onSubmit}>
                        <p><b>Edit your profile</b></p>
                        <Table>
                            <tbody>
                            <tr>
                                <td>First name</td>
                                <td><input
                                    className={!this.state.isFirstNameReadyForRegister ? "error" : "good"}
                                    type="text" name="firstName" placeholder={me.firstName}
                                           onChange={(evt) => {
                                               this.onChange(evt);
                                               this.handleName(evt);
                                           }}/></td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td><input
                                    className={!this.state.isLastNameReadyForRegister ? "error" : "good"}
                                    type="text" name="lastName" placeholder={me.lastName}
                                           onChange={(evt) => {
                                               this.onChange(evt);
                                               this.handleName(evt);
                                           }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Mail address</td>
                                <td><input
                                    className={!this.state.isMailReadyForRegister ? "error" : "good"}
                                    type="text" name="mail" placeholder={me.mail}
                                           onChange={(evt) => {
                                               this.onChange(evt);
                                               this.handleMail(evt);
                                           }}/></td>
                            </tr>
                            </tbody>
                        </Table>
                        <Input className="btn btn-success form-control" disabled={!(this.state.isMailReadyForRegister &&
                            this.state.isFirstNameReadyForRegister &&
                            this.state.isLastNameReadyForRegister)} type="submit" value="Save changes"/>
                    </Form>
                    : null
                }
            </Container>
        );
    }

    async handleMail(evt) {
        let value = evt.target.value;
        if (value === '') {
            this.setState({isMailReadyForRegister: true});
            return;
        }
        let regexChecker = new RegExp(PATTERN_TO_CHECK_MAIL);
        if (!regexChecker.test(value)) {
            this.setState({isMailReadyForRegister: false});
            return;
        }
        const URLtoCheck = URL + '/mail/check/_mail_';
        let resp = await fetch(URLtoCheck.replace("_mail_", value).replace('_id_', this.props.me().id));
        let data = await resp.text();
        let response = JSON.parse(data);
        if (response !== true) {
            this.setState({isMailReadyForRegister: true});
        }
    }

    handleName(evt) {
        let value = evt.target.value;
        if (evt.target.value === '') {
            if (evt.target.name === 'firstName') {
                this.setState({isFirstNameReadyForRegister: true});
                return;
            } else {
                this.setState({isLastNameReadyForRegister: true});
                return;
            }
        }
        let regexToCheckNonNumericValue = new RegExp(PATTERN_TO_CHECK_NAME);
        let isGood = regexToCheckNonNumericValue.test(value);
        if (evt.target.name === 'firstName') {
            isGood ? this.setState({isFirstNameReadyForRegister: true}) :
                this.setState({isFirstNameReadyForRegister: false});
        } else {
            isGood ? this.setState({isLastNameReadyForRegister: true}) :
                this.setState({isLastNameReadyForRegister: false});
        }
    }
};
