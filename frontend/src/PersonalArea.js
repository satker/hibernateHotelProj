import React from "react";
import {Button, Container, Form, Input, Table} from "reactstrap";

const URL = "http://localhost:8080/user/_id_";

export default class PersonalArea extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            isEdited: false,
            firstName: props.me().firstName,
            lastName: props.me().lastName,
        };
    }
    async onSubmit(evt) {
        evt.preventDefault();

        let body = {
            login: this.props.me().login,
            password: this.props.me().password,
        };
        for (let key of ["firstName", "lastName"]) {
            body[key] = this.state[key];
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
                                <td><input type="text" name="firstName" placeholder={me.firstName}
                                           onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td><input type="text" name="lastName" placeholder={me.lastName} onChange={this.onChange}/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <Input className="btn btn-success form-control" type="submit" value="Save changes"/>
                    </Form>
                    : null
                }
            </Container>
        );
    }
};
