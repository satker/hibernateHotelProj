import React, {Component} from "react";
import {Button, Container, Table} from "reactstrap";
import LogoutButton from "./LogoutButton";

export default class MainUserPage extends Component {
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
                <LogoutButton setScreen={this.props.setScreen}/>
                <br/>
                <br/>
                <b><h3>Actions with requests:</h3></b>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                            <Button onClick={() => this.props.setScreen("list_of_orders", {user: me})}>View
                                Requests</Button>
                        </td>
                        <td>
                            <Button onClick={() => this.props.setScreen("list_of_confirmed", {user: me})}>View
                                Confirmed</Button>
                        </td>
                        <td>
                            <Button onClick={() => this.props.setScreen("create_request")}>Create request</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <br/>
                <Button className="btn-danger" onClick={() => this.props.setScreen("edit_profile")}>Edit
                    profile</Button>
            </Container>
        );
    }
};