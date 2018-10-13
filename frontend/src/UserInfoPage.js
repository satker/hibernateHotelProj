import React from "react";
import {Button, Container, Table} from "reactstrap";

const URL = "http://localhost:8080/admin/users/_id_";

export default class UserInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    renderButton() {
        if(this.props.me().role === "ROLE_ADMIN" ) {
            return <Button className="btn-danger" onClick={this.deleteUser}>Delete user</Button>
        }
    }

    async deleteUser() {
        let resp = await fetch(URL.replace("_id_", this.props.user().id), {
            method: "delete",
            credentials: "include",
        });
        this.props.goBack();
    }

    render() {
        let user = this.props.user();
        return (
            <Container>
                <b><h1>Page user {user.firstName}</h1></b>
                <Table>
                    <tbody>
                    <tr>
                        <td>Login</td>
                        <td>{user.login}</td>
                    </tr>
                    <tr>
                        <td>First name</td>
                        <td>{user.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last name</td>
                        <td>{user.lastName}</td>
                    </tr>
                    <tr>
                        <td>{this.renderButton()}</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
};
