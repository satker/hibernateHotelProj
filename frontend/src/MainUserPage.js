import React, {Component} from "react";
import {Button, Container, Table} from "reactstrap";
import LogoutButton from "./LogoutButton";

export default class MainUserPage extends Component {
    render() {
        let me = this.props.me();
        return (
            <Container>
                <b><h3>Welcome, {me.firstName}</h3></b>
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
                            <Button onClick={() => this.props.setScreen("personal_area", {user: me})}>Personal area</Button>
                        </td>
                        <td>
                            <Button onClick={() => this.props.setScreen("create_order", {user: me})}>Create request</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <br/>
            </Container>
        );
    }
};