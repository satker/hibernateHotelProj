import React from "react";
import {Container, Form, Input, Table} from "reactstrap";

const URL = "http://localhost:8080/user/_id_";

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
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
            this.props.goBack();
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
            </Container>
        );
    }
};
